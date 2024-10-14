---
title: "CI/CD Is Easier Than You Think"
excerpt: "Using Cypress and Github Actions to Build an Automation Platform. Its easier than you think."
coverImage: "/assets/blog/easyCiCd/easyCiCd.jpg"
date: "2024-03-07T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/ciCd/quality.jpeg"
---

I decided to expand my other post [QA and CI/CD with Vercel and GitHub Actions](https://www.capocaccia.dev/posts/CiCdWithVercelAndGitHubActions). The goal is I want a true CI/CD workflow.

## Deliverable:

1.  When a pull request is submitted to master, run automated tests against a preview environment.
2.  Use Cypress for automated tests.
3.  Automated tests should record results to the Cypress dashboard.
4.  Automated tests need to prevent deployment if tests fail.
5.  Automatically deploy to production if all automated tests pass.

This post is going to focus mostly on how I configured my GitHub Actions workflow to accomplish to deliverable stated above. So lets start by discussing what GitHub Actions is.

[GitHub Actions](https://github.com/features/actions)

GitHub Actions is a free (or cheap if you need this for a large project) way to set up an automation workflow for your app. It uses YAML for configuration and is very similar to other workflow In their words:

> GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Make code reviews, branch management, and issue triaging work the way you want.

GitHub also offers some fantastic [educational material to get started](https://docs.github.com/en/actions/learn-github-actions)!

TL:DR - Using GitHub Actions we can combine steps together to accomplish automated tasks.

### When a pull request is submitted to master

Lets configure our workflow to only execute when a pull request is submitted to master. Why master? Because that is the branch that is deployed to production and the one we need to guard the quality of.

    on:
        pull_request:
        branches: master

As you can see, YAML is pretty easy to ready! On a pull request towards the branch of master, continue on down the file. Cool, lets move to the next piece.

### Run automated tests against a preview environment

This goal is really two parts. The first being, we need a preview environment. The second being that we need to execute our tests against that environment. Vercel comes to the rescue here by providing preview environments. It generates these environments when a PR is submitted towards master. That logic is configured in Vercel so were going to focus on how to capture the URL and execute the tests.

[Patrick Edqvist](https://github.com/patrickedqvist) provides a fantastic solution for this in the form of an action titled "[Wait for Vercel preview](https://github.com/patrickedqvist/wait-for-vercel-preview)". This action captures the preview URL provided by Vercel and waits for it to respond with a 200 response code before the workflow continues.

    steps:
        - name: Capture Vercel preview URL
          id: waitFor200
          uses: patrickedqvist/wait-for-vercel-preview@v1.2.0
          with:
    	    token: ${{ secrets.GITHUB_TOKEN }}
    	    max_timeout: 60

Awesome! We are now waiting for Vercel to deploy and active preview URL before continuing. We add the ID attribute to this step because need the output of it in a later job.

### Use Cypress for automated tests.

Onwards towards automated testing. First, our app contains Cypress and not the container the workflow is running against. So we need to check out our app. Using the [Checkout action](https://github.com/actions/checkout), we can check-out our app.

    - name: Checkout
      uses: actions/checkout@v4

Our app is checked out and it has Cypress as a dependency. Lets run some tests. [Cypress provides a ready to use action as well](https://github.com/cypress-io/github-action)!

Remember that ID attribute on the Capture Vercel Preview URL step? We need to use that now to access the output of that job and tell Cypress to run against the preview URL.

    - name: Run Cypress
      uses: cypress-io/github-action@v2
      id: runCypress
      with:
        record: true
        parallel: true
        ci-build-id: '${{ github.sha }}-${{ github.workflow }}-${{ github.event_name }}'
        config: baseUrl=${{steps.waitFor200.outputs.url}}
      env:
        CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

We provide the preview URL via the config property. It access the output of the prior job by using the jobs ID property. So now we are running Cypress and recording results to our dashboard! Onto the next goal!

### Automated tests need to prevent deployment if tests fail.

Vercel automatically deploys code that is merged into Master. So we need to prevent that merge if tests are failing. In order to discuss this, we also need to discuss the logic behind automatically merging and deploying.

- If the tests pass, add a label to the MR, then use an action to read the label and complete the merge. Vercel will then auto-deploy the branch completing the CI/CD cycle.

If a label is what triggers the merge, lets prevent the label from being added if a test fails. Were using a great action titled "[Action Add Labels](https://github.com/actions-ecosystem/action-add-labels)" to add a label to our PR.

    - name: Add Label
      uses: actions-ecosystem/action-add-labels@v1
      with:
        labels: automerge
      if: ${{ steps.runCypress.outcome == 'success' }}

The "if" statement in this job is called an expression. Again, we use the ID property to access the outcome of a preview job. If the outcome of the runCypress job is not "success" we will not add the label and therefore stop the merge. Onto the next!

### Automatically deploy to production if all automated tests pass.

The last piece! For the sake of this discussion, we are assuming all tests have passed and the "automerge" label has been added. Now we need to read that label and merge the code to Master allowing Vercel to take care of deploying. We are using another great action called [Automerge Action](https://github.com/pascalgn/automerge-action) created by [Pascalgn](https://github.com/pascalgn).

    automerge:
      runs-on: ubuntu-latest
      needs: runTestsAgainstPreview
      steps:
        - id: automerge
        name: automerge
        uses: "pascalgn/automerge-action@v0.15.3"
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
          MERGE_RETRIES: 10
          MERGE_RETRY_SLEEP: 10000

In this configuration we look for the label of "automerge". If the label is found, this action merges the PR. Since we are using Vercel here, the code is automatically deployed to prod!

### Wrapping up

By using free and open source tooling, we are able to configure a custom CI/CD pipeline that executes automated tests and records results to a dashboard. How cool is that?! Want to see what my workflow configuration looks like? Check it out on my GitHub page [here](https://github.com/Capocaccia/carterCapo/blob/master/.github/workflows/deploy.yml)!

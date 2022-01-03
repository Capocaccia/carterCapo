---
title: "My QA Workflow"
excerpt: "Want to see the QA tools and workflows I use for this site? Check it out here."
coverImage: "/assets/blog/qaWorkflow/qaWorkflow.jpeg"
date: "2022-01-04T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/qaWorkflow/qaWorkflow.jpeg"
---


I want to expose how I set up my QA process for this site. I considered that this is a simple site. I don't need to go overkill. I just need to know my change did not break core functionality. Even though it's simple, I approached this as a great learning opportunity. I wanted to set up hooks in the development cycle, automated UI test execution, and have preview environments.

So in an effort to “not go overkill” I leveraged existing tooling. To scaffold out this site, I used [Create Next App](https://nextjs.org/docs/api-reference/create-next-app). Then I added some additional tooling.

## Tooling

- [**Jest**](https://jestjs.io/) - Jest is a fantastic unit testing library that I encourage every web dev to explore and use.

- [**Testing Library**](https://testing-library.com/) -  use Testing Library to enforce the use of accessibility first selectors when interacting with my UI in a test.

- [**Cypress**](https://www.cypress.io/) - Cypress is, to me, the best UI testing product on the market.

- [**Cypress Dashboard**](https://www.cypress.io/dashboard) - This allows me to have a place to view test reports, recordings  and screenshots.

- [**GitHub Actions**](https://github.com/features/actions) - Automating my test run. I use events to trigger my tests to run. For example, when a pull request is sent to the Master branch my Cypress tests are automatically executed.
- [**Vercel**](https://vercel.com/) - Vercel deploys and caches my site for me. It also allows me to preview PRs before I merge them.
- [**Husky**](https://typicode.github.io/husky/#/) - Husky is my "go to" tool when I want to utilize Git Hooks. In this app, I run all unit tests when a commit is attempted.

## Workflows

- **Working locally**
  
  When working locally, I attempt to commit my code and Husky initiates my pre-commit hook which is executing all unit tests. If these tests pass, I am allowed to push to my remote branch.

    ![Dev Workflow](/assets/capoDevWork.svg)

- **Upon Pull Request**

  Once I have finished my work, I submit my pull request to my trunk branch commonly referred to as Main or Master. At the time I submit this request, Cypress is automatically executed against the incoming branch via GitHub Actions. I can view these results on the Cypress Dashboard.

    ![Dev Workflow](/assets/capoPR.svg)

- **Ready to deploy**

  When I am ready to deploy, I have passed my unit tests, passed my Cypress tests, and finally I do a quick click through of my preview environment provided by Vercel. After I validate there, I merge my branch into my trunk branch and it is automatically deployed to production.

    ![Dev Workflow](/assets/capoDeploy.svg)

Thats it! So in short, I test early, often, and without manual intervention where possible. I am unit testing, UI testing, in a CI pipeline on a small an effective scale.

My next iteration (and potential blog post?) is turning this into a true CI/CD pipeline by using the results of my cypress test to auto merge and deploy pull requests.


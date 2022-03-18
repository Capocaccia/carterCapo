---
title: "Data driven test generation - Parallelizing large data sets."
excerpt: "A problem arises in test automation when repetitive tasks needs to be performed on large data sets. In this post, I discuss how we can level up from a forEach loop and use Node to unlock parallelization."
coverImage: "/assets/blog/parallelizingDataSets/cover.jpeg"
date: "2022-03-18T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/parallelizingDataSets/cover.jpeg"
---

## The ask

I was asked to solve a problem at work that initially seemed simple.  The request from the business unit was to leverage automation to remove the need for a manual process.  The manual process was consuming an estimated 10 minutes per item with a total of 335 items.  This represented a total time to complete of around 55 hours.  A manual and repetitive task with a large time commitment is a great candidate for automation!

## Initial implementation

```javascript
//testFile.js
cy.fixture('dataSet.json').forEach((item) => {
  cy.intercept(/^https:\/\/analyticsURL.com\/.*/).as('metricsCall')
  cy.wait('@metricsCall', {timeout: 5000}).then((item) => {
    expect([200, 302]).to.include(item.response.statusCode)
  })
})
```

Looking at the code above, I retrieve the data set as a Cypress Fixture and loop over each item in the data set. With a callback function, I am using cy.intercept and regular expression to identify the XHR request I want to intercept. Then I am using a wait command to wait for this XHR request to fire. After the XHR request is sent, I am checking that the responses status code is either a 200 or a 302. Using this pattern, if the XHR request does not fire, the test times out after 5 seconds and fails. Additionally, the test fails if the response code is not 200 or 302.

## The problem

Even thought I am using forEach, this still takes a long time! If each test from start to finish takes 10 seconds, the execution of 335 items will take about 55 minutes! I think we can do better than that. The problem is that since we are using forEach instead of unique test files for each item, we cannot parallelize test execution. Each item will be checked sequentially in a forEach.

## Leveling up

So we know the problem is that forEach doesnt allow for parallelization. In order to parallelize, I need unique test files for each item I have to check. I guess I could copy and paste one base template test file 335 times and replace each unique item manually but that seems like a maintenance nightmare. What makes more sense is creating test files using node. Here's what I came up with.

```javascript
//buildTestFiles.js
const itemsToCheck = JSON.parse(fs.readFileSync('./dataSet.json'))
itemsToCheck.forEach((url, idx) => {
  fs.writeFileSync(`./cypress/analytics/analyticsTest_${idx}.js`, 
  `it('Validats Metrics calls return 200 or 302', () => {
    cy.intercept(/^https:\/\/analyticsURL.com\/.*/).as('metricsCall')
    cy.visit('${url}')
    cy.wait('@metricsCall', {timeout: 5000}).then((item) => {
      expect([200, 302]).to.include(item.response.statusCode)
    })
  })`)
})
```

Using the code above, I can create a unique test file for each item in my data set. This unlocks the ability to parallelize our test execution. I am using Node to parse a JSON file containing my data and then looping over that data. Inside the loop, I write a file containing the test code and I swap out the unique URL I need to check in each test. The result of this code is a unique test file for every single item in our data set. Now we can parallelize!

## Adding parallelization

Now that I have solved the problem of test file creation, lets figure out how to parallelize the test execution. I am going to use the [Cypress-Parallel](https://www.npmjs.com/package/cypress-parallel) package which uses unique Node threads to execute your tests in parallel. This is a great package that assigns "weights" to each of your test files in order to intelligently split up files into the appropriate node threads. This will reduce your test execution time as much as it can. Its still not as great as a true CI parallelization tool but its implementation is still effective.

```javascript
//package.json
"cypress:run": "npx cypress run --headless",
"cy:parallel": "node buildFiles.js && cypress-parallel -s cypress:run -t 5"
```

Using the script above, I execute the buildFile script to generate my test files and then execute Cypress-Parallel using 5 Node threads.

## Wrapping up

By using test parallelization, we have reduced the time to complete a manual task by over 95%! The business unit is happy and so are we!
___

## Uses:
- [Cypress-Parallel](https://www.npmjs.com/package/cypress-parallel)
- [Cypress](https://www.cypress.io/)

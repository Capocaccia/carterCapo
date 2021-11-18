---
title: "Easy mocking of API Requests in Cypress with Mock Service Worker."
excerpt: "Mock Service Worker is a single tool we can use to mock API requests in unit tests, end-to-end tests, and our application. In this example, Cypress starts the worker on its own."
coverImage: "/assets/blog/cypressMsw/cypressMsw.jpeg"
date: "2021-11-18T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/cypressMsw/cypressMsw.jpeg"
---

[Example Repo](https://github.com/Capocaccia/cypressMswExample)
___

## Why I chose MSW over cy.intercept

The [cy.intercept](https://docs.cypress.io/api/commands/intercept) API is fantastic.  However, it is an API that is specific to Cypress. When using MSW, we do lose some functionality of cy.intercept. However, we gain the ability to use a single library in Unit tests, End-to-End tests, and our applications UI. See, MSW is not only a testing tool. It is a standalone network request mocking library. That means we can develop an entire UI and scaffold out a backend API using mock data.

## Why is Cypress starting up the mock server important?

It is common practice to utilize an environmental variable to start MSW. Typically this is utilized in the following style:
```javascript
//if we are in develoment mode, use mocks
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser')
  worker.start()
}
```

This pattern requires additional configuration and is another configuration item you can forget when running your tests locally or in CI. If the application is not initialized with this ENV var in place it will cause unexpected behavior in your tests. A way to avoid this problem is for your tests to start MSW itself.

## Using Cypress Events

By leveraging the Cypress events API, we can start MSW using an async method. Using Async/Await here ensures MSW is running before our tests execute.

```javascript
//cypress/support/index.js

import { worker } from '../../src/mocks/browser';
Cypress.on('test:before:run:async', async () => {
   await worker.start();
});
```

## End Result

Using this pattern, when our tests execute, Cypress will take ownership of starting MSW and does not rely upon external configuration. We have reduced dependency on our applications configuration and thats always a good thing, right?!

## Things to watch out for

This pattern does expose a new problem. If my application has already started MSW, how do I avoid starting it again in Cypress? When starting MSW from the application, we should attach the worker and mocking API to the browser window. We can use this to conditionally start MSW in Cypress.

[MSW Docs](https://mswjs.io/docs/api/setup-worker/use#examples)


```javascript
// Make the `worker` and `rest` references available globally,
// so they can be accessed in both runtime and test suites.
window.msw = {
  worker,
  rest,
}
```
 
```javascript
//cypress/supports/index.js
Cypress.on('test:before:run:async', async () => {

   if(window.msw) {
      console.log('MSW is already running.')
   }

   //if MSW wasnt started by the app, Cypress needs to start it
   if(!window.msw){ 
      console.log('MSW has not been started. Starting now.')
      await worker.start();
   }

});
```

## Voilà!

We have now intelligently started MSW when and where we need it.  We can now use a single tool for mocking API requests in our application, our unit tests, and our end-to-end tests!

___

## Uses:
- [Mock Service Worker](https://mswjs.io/)
- [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
- [Cypress](https://www.cypress.io/)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)
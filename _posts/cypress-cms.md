---
title: "Cypress testing CMS driven layouts."
excerpt: "When testing CMS driven layouts, you have an edge. In this post I discuss a technique to effectively test layouts by gathering the expected layout via the API and then dynamically generating a test."
coverImage: "/assets/blog/cypress-cms/cover.jpg"
date: "2021-11-11T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/cypress-cms/cover.jpg"
---

## CMS driven layouts offer new challenges and new opportunities

End to end tests are tightly coupled with an applications UI. With this coupling, the tests are constantly having to be updated to stay up to date with a shifting UI. What if our tests could be generated based on the UI? What would this look like? In this example I explore generating a test based on a CMS driven layout provided to the application via an API.

### Data Gathering

By utilizing the CMS API via the [cy.request method](https://docs.cypress.io/api/commands/request), we can retrieve the page layout. With this knowledge, we now know what is components are expect to be rendered on the page.

// Example request:

```javascript
cy.request({
  url: "https://myfakeapi.com/graphql/layout",
  method: "POST",
  headers: {
    // if you need an auth header
    // or other header, put that here
  },
  body: {
    // this query shape is just an example
    // of writing a generic query to retrieve
    // the components for a page
    query: `
      query layout(page) {
        components: {
          type
        }
      }
    `,
  },
});
```

// Example response:

```javascript
{
"data": {
  "page": {
    "components": [
        {
        "type": "carousel"
        },
        {
        "type": "gridSection"
        },
        {
        "type": "alert"
        }
      ]
    }
  }
}
```

### Data Actioning

Success! Now we know what is components are expected to be on the page. Lets start thinking about how we can retrieve the appropriate Cypress tests for these components. If we write our Cypress tests as functions, Cypress will queue up the tests appropriately. Heres a simple example of a test for the Alert component. Since we can never be 100% sure as to how many times a component appears on a page, lets be smart about how we write our test.

```javascript
// ./cypress/partials/alert.js

export const alertText = () => {
  //get all of the alert containers and loop over them
  cy.findAllByTestId("alertContainer").each(($alertItem) => {
    // in each individual item do the following
    cy.wrap($alertItem)
      .srollIntoView()
      .within(() => {
        //lets get the h3 inside of the alert item
        //make sure its not empty
        //and make sure its visible
        //
        //by asserting that its not empty
        //we validate the CMS has had content loaded
        //and the app is displaying it correctly
        cy.findByRole("heading", { level: 3 })
          .should("not.be.empty")
          .should("be.visible");
      });
  });
};
```

### Putting it together

Now that we have a test written for our component, we need to allow it to be pulled into our Cypress run. In our test spec file (lets call this one test.spec.js) we need to import our test. After we import our test function file into our spec file, we will have the ability to execute the function on command.

```javascript
// ./cypress/integration/test.spec.js
import { alert } from "cypress/partials/alert";

const componentMap = {
  //my key : function test
  alert: alert,
};

it("Generates a layout based test from CMS data", () => {
  cy.request({
    url: "https://myfakeapi.com/graphql/layout",
    method: "POST",
    body: {
      query: `
      query layout(page) {
        components: {
          type
        }
      }
    `,
    },
  }).then((result) => {
    cy.visit("/").then(() => {
      //get the component names from the API response
      const componentNames = result?.body?.data?.page?.components.map(
        (comp) => comp.type
      );
      // strip out the duplicates. Our tests look for all components of a type.
      const components = [...new Set(componentNames)];
      // for each component name, run the test!
      components.forEach((comp) => {
        cy.log(`running test for ${comp}`);
        //the "comp" in this loop is a string so we can't call it directly.
        //This is why we use the component map to call it as an objects value
        componentMap[comp]();
      });
    });
  });
});
```

## Wrapping up

Now our test builds itself! Based on the layout information returned from the CMS, we retrieve the appropriate tests and execute them. Our tests take care of scenarios where any quantity of an individual component is rendered on the page. Since our page can change at any time due to the CMS changing layout or content, our tests can respond to these changes without being updated constantyl to remain in sync. The only setup required here is to write tests for each component in the application.

## What was used here?

- [Cypress](https://www.cypress.io/)
- [Cypress Request](https://docs.cypress.io/api/commands/request)
- [Cypress Then](https://docs.cypress.io/api/commands/then)
- [Cypress Wrap](https://docs.cypress.io/api/commands/wrap)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)

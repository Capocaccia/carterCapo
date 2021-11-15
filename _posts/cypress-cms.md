---
title: "Cypress testing CMS configured layouts."
excerpt: "When testing CMS configured layouts, you have an edge. In this post, I discuss how I create tests for CMS configured layouts."
coverImage: "/assets/blog/cypress-cms/cover.jpg"
date: "2021-11-11T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/cypress-cms/cover.jpg"
---

## CMS driven layouts offer new challenges and new opportunities

End-to-end tests are dependent upon an applications' UI. With this dependency, the tests have to stay up to date with a shifting UI. What if we generated tests based on the UI? What would this look like? In this example, I explore test generation based on a CMS configured layout provided to the application via an API.

### Data Gathering

We can use the [Cypress Request API](https://docs.cypress.io/api/commands/request) to retrieve the page layout. In this step, we gather the page layout from the CMS via the API. Now we know which components we can expect to be on the page.

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

Success! Now we know which components we can expect to be on the page. Lets' start thinking about how we can retrieve the appropriate Cypress tests for these components. Lets' write our Cypress tests as functions. [Cypress will queue](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#The-Cypress-Command-Queue) up the tests appropriately. Here's a simple example of a test for the Alert component. Since we can never be 100% sure of how many times this component appears on a page, we can use Cypress to handle any quantity of this component.

```javascript
// ./cypress/partials/alert.js

export const alertText = () => {
  // Find all of the elements with a matching test id and loop over them
  cy.findAllByTestId("alertContainer").each(($alertItem) => {
    // in each individual item do the following
    cy.wrap($alertItem)
      .srollIntoView()
      .within(() => {
        // lets get the h3 inside of the alert item
        // make sure its not empty
        // and make sure its visible
        //
        // by asserting that its not empty
        // we validate the CMS has had content loaded
        // and the app is displaying it correctly
        cy.findByRole("heading", { level: 3 })
          .should("not.be.empty")
          .should("be.visible");
      });
  });
};
```

### Putting it together

Great! We wrote a test function. The next step is to allow our test file to consume this function when needed. In our test spec file, we need to import our test function. After we import our test function file into our spec file, we will have the ability to execute our test function on command.

```javascript
// ./cypress/integration/test.spec.js
import { alert } from "cypress/partials/alert";

const componentMap = {
  // myKey : testFunction
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
      // get the component names from the API response
      const componentNames = result?.body?.data?.page?.components.map(
        (comp) => comp.type
      );
      // strip out the duplicates. Our tests look for all components of a type.
      const components = [...new Set(componentNames)];
      // for each component name, run the test!
      components.forEach((component) => {
        cy.log(`running test for ${component}`);
        // the "component" in this loop is a string so we can't call it directly.
        // This is why we use the component map to call it as an objects value
        componentMap[component]();
      });
    });
  });
});
```

## Wrapping up

Now our test builds itself! Based on the layout information returned from the CMS, we retrieve the appropriate tests and execute them. Our tests take care of scenarios where any quantity of an individual component is on the page. Since our page can change due to the CMS changing layout or content, our tests can respond to these changes without being updated to remain in sync. The only setup required here is to write tests for each component in the application.

## Thanks

If you learned anything from this, or want to share it yourself, go ahead! I ask that you include a link to my website when you share. If you wish to contact me, my information is in the footer!

## Uses

- [Cypress](https://www.cypress.io/)
- [Cypress Request](https://docs.cypress.io/api/commands/request)
- [Cypress Then](https://docs.cypress.io/api/commands/then)
- [Cypress Wrap](https://docs.cypress.io/api/commands/wrap)
- [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)

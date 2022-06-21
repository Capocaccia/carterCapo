---
title: "Quick Snippets - Validate all page links"
excerpt: "Broken links can lead to an exteremely frustrating user experience and checking each link manually is a time consuming process. Using Cypress, we can automate this entire process and ensure all of our links perfom as expected."
coverImage: "/assets/blog/quickSnippets/link.jpeg"
date: "2022-06-21T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/quickSnippets/link.jpeg"
---

Broken links can lead to an extremely frustrating user experience and are one of the harder things to check. Third parties may change their URL structure and clicking on every link manually is a time consuming process. Heres how I decided to tackle this problem using Cypress.

- [GitHub Link](https://github.com/Capocaccia/carterCapo/blob/master/cypress/support/commands.js)

```javascript
  cy.get("a").each((link) => {
    cy.wrap(link)
      .invoke("attr", "href")
      .then((href) => {
        cy.request(href).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      });
  });
```

## Walkthrough

Lets walk through the code above, line by line.

- First step is to gather all of the `a` tags on the page. We do that with the [cy.get('a') selector](https://docs.cypress.io/api/commands/get).
- Now that we have all of the `a` tags we need to loop over each one of them. Cypress provides a really nice [each](https://docs.cypress.io/api/commands/each) method just for this case.
- In the next line, we use [cy.wrap](https://docs.cypress.io/api/commands/wrap#Arguments). We do this because the link that is yielded from the .each command [is a DOM node](https://docs.cypress.io/api/commands/get#Yields) so we need to turn it back into a Cypress object in order to use Cypress methods.
- Now that we have a cypress object that we know is an `a` tag, lets get the HREF from it using the [invoke command](https://docs.cypress.io/api/commands/invoke).
- We have the HREF! Great! Our next goal is to make a request to this HREF. To do that, I use the [then method](https://docs.cypress.io/api/commands/then). This allows us to work with the subject yielded from the previous method which is the HREF string.
- We are now ready to use the [request method](https://docs.cypress.io/api/commands/request) to make sure our HREF is working as expected.
- We need to assert upon the result of our request so we use the [then method](https://docs.cypress.io/api/commands/then) again to pass the result of the request into another function where we can write our assertion to make sure our response status has a 200 response code. We have access to the entire response object here so if we wanted to perform additional assertions upon the response body, that is also accomplishable.
- Were done! In less than 10 lines of code, you learned about 6 cypress commands and a pattern to validate every HREF on a page!

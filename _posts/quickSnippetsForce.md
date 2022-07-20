---
title: "Quick snippets - Stop forcing it!"
excerpt: "Forcing user behavior in automated tests can garner false negative results. A test will pass when in reality, it shouldnt! In this example I review how a Cypress test can fail even when the applicaiton is not functional."
coverImage: "/assets/blog/quickSnippets/force.jpeg"
date: "2022-07-20T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/quickSnippets/force.jpeg"
---
  Its all too easy when using an automated testing tool to force a user behavior like clicking on an element. If you run the Cypress tests for this repo, they will all pass but they shouldnt! They pass because we are forcing user behavior which bypasses all of the checks Cypress provides.

### Example of a forced click

  ```javascript
    //when this command runs
    //do you know your user can also click the button?
    cy.get('button').click({force: true});
  ```

  The answer is no! The button that Cypress clicks in the example above could be hidden, off the screen entirely, have a hight and width of 0 pixels, or is otherwise completely inaccessible by a user!

### What's the difference between using force and not using force?

#### When you force an event to happen Cypress will

- Continue to perform all default actions
- Forcibly fire the event at the element

#### Cypress will **NOT** perform these

- Scroll the element into view
- Ensure it is visible
- Ensure it is not disabled
- Ensure it is not detached
- Ensure it is not readonly
- Ensure it is not animating
- Ensure it is not covered
- Fire the event at a descendent

Check out my example page here: [https://capocaccia.github.io/stopForcingIt/](https://capocaccia.github.io/stopForcingIt/)

And the corresponding repository which contains the Cypress example here: [https://github.com/Capocaccia/stopForcingIt](https://github.com/Capocaccia/stopForcingIt)

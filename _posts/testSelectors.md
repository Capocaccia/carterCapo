---
title: "Effective DOM selector patterns. Interact like a user."
excerpt: "There are many ways now to retrieve a DOM node during a test. In this article I rank a few of the more popular methods and provide my opinion as to which ones are viable solutions."
coverImage: "/assets/blog/testSelectors/cover.jpeg"
date: "2021-12-30T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/testSelectors/cover.jpeg"
---
  When writing tests that interact with your UI, you will likely utilize DOM nodes to isolate elements of your application and perform actions or assertions upon those elements or contents thereof. In this post, I rank DOM node selectors styles into three "tiers" and discuss why I favor some over others. Using poor selectors is akin to building your house upon sand. You can build a mansion of a test suite using poor selectors, but the test suite will crumble violently and require constant maintenance.

  I hope your take away from this post is that your selectors should be:
  
    1. Reliable
    2. Easily maintained
    3. Interacting with your DOM like your user does

## **Top Tier:**
________________

### React Testing Library

- #### Link: [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro/)

- #### Why use this?
  
    A guiding testing principle championed by [Kent Dodds](https://kentcdodds.com/) is your test should interact with your application like a user does. Using this library forces you to query for DOM nodes the same way your user finds them. This makes your test act more like a user and provides you with more confidence and maintainability when refactors occur. Additionally, this library enforces accessibility rules and therefore enforces accessible UI code.

### Test Attribute

- #### Link: [Cypress Selecting Elements](https://docs.cypress.io/guides/references/best-practices)

- #### Why use this?

     Targeting DOM nodes by utilizing stable attributes will allow you to get straight to the node you want to interact with. I use these when I need to isolate a DOM node that is not able to be accessed via better means. I disagree with the Cypress docs here. The naming convention of "data-cy" is for Cypress and if you change this to be data-testid you can now use this attribute with Jest and Cypress via the [React Testing Library ByTestId](https://testing-library.com/docs/queries/bytestid) command.

## **Mid Tier:**
________________

### Content

- #### Link: [Contains](https://docs.cypress.io/api/commands/contains#Syntax)
  
- #### Why use this?
  
     Accessing the DOM via unique static text is another way your users interact with your app. Think about any ecommerce site. Does a user know that when they click on the “Add to Cart” button they are clicking on a button with a test-id attribute set to “addToCartBtn” or do they know that when they click a button that contains text “Add to Cart” they expect the item to be in their cart? I argue it is the latter.

### Element with modifier

- #### Link: [Get](https://docs.cypress.io/api/commands/get#Command-Log)

- #### Why use this?

    If you can’t use a more specific selector like the ones mentioned above, you can couple more than one together to create more specificity. In the example I linked above, the selector is utilizing a DOM element that has an attribute with a specified value. While this does not access the DOM like a user does, it at least attempts to avoid test flake and add maintainability via specificity.

## **Bottom Tier:**
________________

### XPath

- #### Link: [Cypress X-Path](https://www.npmjs.com/package/cypress-xpath)

- #### Why shouldn’t you use this?

    XPath selectors rely on traversing DOM nodes via the node tree. Any time your DOM is updated or modified, the selector is now out of date. XPath patterns are very cumbersome to maintain and flaky by nature due to their reliance upon DOM structure. There is no valid reason for using XPaths with Cypress or any testing library anymore. If you are using Webdriver.io, Jest, Cypress or whatever, **XPath selectors should be avoided at all costs. XPath selectors are key ingredients to brittle tests**.

### Class

- #### Link: [Get](https://docs.cypress.io/api/commands/get#Syntax)

- #### Why shouldn’t you use this?
  
   With Cypress, we can select DOM nodes via their class name. I recommend avoiding this pattern. Class names, by design and use for styling, are meant to be repeated throughout the DOM since. This removes the idea that classes are going to easily access a unique or specific DOM node. Additionally, a user has no idea what class name is attached to the button they want to click and therefore by utilizing class names your test is not behaving like a user.

### Element

- ####  Link: [Best Practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements)

- #### Why shouldn’t you use this?

    On any web page there are hundreds, if not thousands, of DOM nodes. They will be repeated, they will not be unique. Selecting the DOM node type you want typically leads you down the path of having to pluck the particular node you want from the yield of your selector. For example, `cy.get(‘button’).eq(5)`. The initial `cy.get('button')` command yields all the buttons on the page which is a pretty heavy handed selector. Then we access the fifth element the `cy.get` command yielded. This means that every command that comes after it, and the selector itself, is tied to the structure of the DOM and reliant upon the DOM position of that button. Again, your user does not care that the button is the 5th one on the page and therefore you are not testing as a user behaves.

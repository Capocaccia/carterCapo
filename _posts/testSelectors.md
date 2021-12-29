---
title: "How should I access dom nodes when testing? A guide."
excerpt: "There are so many ways now to retrieve a dom node during a test. In this article I rank a few of the more popular methods and provide my opinion as to which ones are viable solutions."
coverImage: "/assets/blog/testSelectors/cover.jpeg"
date: "2021-12-30T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/testSelectors/cover.jpeg"
---

## **Top Tier:**
________________

### React Testing Library

- #### Link: [Cypress Testing Library]([https://testing-library.com/docs/cypress-testing-library/intro/](https://testing-library.com/docs/cypress-testing-library/intro/))

- #### Why use this?
  
    A fantastic testing principle championed by Kent Dodds is that you should test the way your software is used. Using this library forces you to query for dom nodes the same way your user finds them. This makes your test act more like a user and provides you with more confidence and maintainability when refactors occur. Additionally, this library enforces accessibility rules and makes you write accessible code.

### Test Attribute

- #### Link: [Cypress Selecting Elements]([https://docs.cypress.io/guides/references/best-practices#Selecting-Elements](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements))

- #### Why use this?

     Targeting dom nodes by utilizing stable attributes will allow you to get straight to the node you want to interact with. I use these when I need to isolate a dom node that is not unique enough to be accessed via better means. I disagree with the Cypress docs here though. The naming convention of data-cy is for Cypress and if you change this to be data-testid you can now use this attribute with Jest and Cypress via the [React Testing Library ByTestId](https://testing-library.com/docs/queries/bytestid) command.

## **Mid Tier:**
________________

### Content

- #### Link: [Contains]([https://docs.cypress.io/api/commands/contains#Syntax](https://docs.cypress.io/api/commands/contains#Syntax))
  
- #### Why use this?
  
     Accessing the dom via unique static text is how your users interact with your app. Think about any ecommerce site. Does a user know that when they click on the “Add to Cart” button they are clicking on a button with a testid attribute set to “addToCartBtn” or do they know that when they click a button that contains text “Add to Cart” they expect the item to be in their cart?

### Element with modifier

- #### Link: [Get]([https://docs.cypress.io/api/commands/get#Command-Log](https://docs.cypress.io/api/commands/get#Command-Log))

- #### Why use this?

    If you can’t use a more specific selector like the ones mentioned above, you can couple more than one together to create more specificity. In the example I linked above, the selector is utilizing a dom element that has an attribute with a specified value. While this does not access the dom like a user does, it at least attempts to avoid test flake and add maintainability via specificity.

## **Bottom Tier:**
________________

### XPath

- #### Link: [Cypress X-Path]([https://www.npmjs.com/package/cypress-xpath](https://www.npmjs.com/package/cypress-xpath))

- #### Why shouldn’t you use this?

    XPath selectors rely on traversing dom nodes via the node tree so any time your dom is updated or modified, the selector is now out of date. XPaths are very cumbersome to maintain and flaky by nature due to their reliance upon dom structure. There is no excuse for using XPaths with Cypress or really any testing library anymore. If you are using Webdriver.io, Jest, Cypress or whatever, **XPath selectors should be avoided at all costs. XPath selectors are key ingredients to brittle tests**.

### Class

- #### Link: [Get](https://docs.cypress.io/api/commands/get#Syntax)

- #### Why shouldn’t you use this?
  
   With Cypress, we can select dom nodes via their class name. However, I recommend avoiding this pattern. Class names, by design and use for styling, are meant to be repeated throughout the dom since. This removes the idea that classes are going to be a specific way to access a dom node. Additionally, a user has no idea what class name is attached to the button they want to click and therefore by utilizing class names your test is not behaving like a user.

### Element

- ####  Link: [Best Practices]([https://docs.cypress.io/guides/references/best-practices#Selecting-Elements](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements))

- #### Why shouldn’t you use this?

    On any web page there are hundreds, if not thousands, of dom nodes. They will be repeated, they will not be unique. Selecting the dom node you want typically leads you down the path of specifying which dom node you want. For example, cy.get(‘button’).eq(5). This command yields the fifth button found in the dom which means that every command that comes after it and the selector itself is tied to the structure of the dom and reliant upon the dom position of that button. Again, your user does not care that the button is the 5th one on the page and therefore you are not testing like a user behaves.

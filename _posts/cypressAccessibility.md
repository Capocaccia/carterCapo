---
title: "Accessibility driven test flows using Cypress Testing Library."
excerpt: "Accessibility concerns are often overlooked on web apps. As QE Engineers, what can we do to make sure that our tests interact with the application similarly to how users would?"
coverImage: "/assets/blog/accessibilitySelectors/accessibilitySelectors.jpeg"
date: "2022-01-24T05:35:07.322Z"
author:
  name: Carter Capocaccia
  picture: "/assets/blog/authors/cc.svg"
ogImage:
  url: "/assets/blog/accessibilitySelectors/accessibilitySelectors.jpeg"
---

Accessibility concerns are often overlooked on web apps. As QE Engineers, what can we do to make sure that our tests interact with the application similarly to how users would? As Kent C Dodds said, [“The more your tests resemble the way your software is used, the more confidence they can give you.“](https://twitter.com/kentcdodds/status/977018512689455106?s=20). Lets' examine [Testing Library](https://testing-library.com/) and how it encourages testing like a user with accessibility in mind.

Using the markup below, you will see how I interact with the form using native Cypress methods and alternatively by using accessibility first methods that force you to interact with your application like a user does. The markup is a simple form containing some text inputs and a button. Think of this as a pseudo login screen. I will be using Cypress as my testing tool. Keep in mind that [Testing Library](https://testing-library.com/) can be used with a number of different testing frameworks.

```html
<section class="container">
    <label for="username">Username</label>
    <input type="text" id="username"/>

    <label for="password">Password</label>
    <input type="password" id="password"/>

    <button type="submit">Login</button>
</section>
```

I can use a native Cypress methods to populate and submit the login form. Here is an example:

```javascript
it('Completes login flow', () => {
  cy.get('input[name="username"]').type('Carter')
  cy.get('input[name="password"]').type('abc123')
  cy.get('button[type="submit"]').click()
})
```

In the example above, I type into the input fields and then click the submit button to submit the form. While the flow is functional, it interacts with the app by searching for DOM nodes. I would bet that a user of your app has no idea these nodes exist. I could use Chai to add an assertion that ensures there is a related Label element for this input to assert accessibility is present or I could also use a library that does this for me. In this case, I opt for using [Testing Library](https://testing-library.com/). More specifically, [Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)

Testing Library offers a curated list of selectors which rely upon accessibility standards. Why accessibility standards? That's how users interact with your application. Simply put, if your test interacts with your app like a user does then you will have confidence in your functionality. So let's write the user flow again using selectors that rely upon accessibility first.

```javascript
it('Completes login flow', () => {
  cy.findByLabelText('Username').type('Carter')
  cy.findByLabelText(/Password/i).type('abc123')
  cy.findByRole('button', {name: /login/i}).click()
})
```

The result of the user flow is the same as before but now we are accessing our applications input fields by using selectors that rely upon accessible markup.  As a result, we now know that our functionality is valid for all users including accessible users. I highly encourage you to include [Testing Library](https://testing-library.com/) and its accessibility first practices in your tests!

Keep in mind, this is just an example and is not a “good" test for a number of reasons.  I am just using the login flow for an easy example of [Testing Library](https://testing-library.com/) implementation.

As always, if you want to chat about any of my posts, use the footer to find my contact information!

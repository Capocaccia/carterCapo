/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    checkAllHrefFor200(): void;
  }
}

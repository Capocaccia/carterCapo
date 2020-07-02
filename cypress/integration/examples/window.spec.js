/// <reference types="cypress" />

context('Window', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('cy.title() - get the title', () => {
    cy.title().should('equal', 'Carter Capocaccia | Web Developer')
  })
})

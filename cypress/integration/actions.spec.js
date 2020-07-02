/// <reference types="cypress" />

context('Actions', () => {

  // https://on.cypress.io/interacting-with-elements

  it('Opens and closes a qa item', () => {
    cy.visit('http://localhost:3000/about')

    cy.get('.content-item')
      .first()
      .click()
      .children('.content-item--question')
      .should('have.class', 'js_arrow_rotate')
      .siblings('.content-item--answer')
      .should('be.visible')
      .and('have.class', 'open')
      .click()
      .should('not.have.class', 'open')
      .and('not.be.visible')
  })

  it('Filters projects', () => {
    cy.visit('http://localhost:3000/projects')

    cy.get('.project--item').then(($pjs) => {
      cy.get('.filters-group__filter')
      .first()
      .click()
      .should('have.class', 'active')
      .click()
      .should('not.have.class', 'active')
      .click()

      cy.get('.project--item')
      .should('have.length.lessThan', $pjs.length)
    })
  })
})

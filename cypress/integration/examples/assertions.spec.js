/// <reference types="cypress" />

context('Assertions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  describe('Implicit Assertions', () => {
    it('Homepage should display h2 text', () => {
      cy.get('h2')
      .should('be.visible')
      .and('have.text', 'Carter Capocaccia')

    })

    it('Homepage tagline text should be displayed and be visible', () => {
      cy.get('.tagline')
        .should('be.visible')
        .and('have.text', 'Welcome! I am Carter Capocaccia, a passionate web developer learning more every day. Technology gives me the inspiration to improve the world around me.')
    })

    it('Every page should contain the nav component', () => {
      const pages = ['', 'about', 'connect', 'projects']
      pages.forEach((page) => {
        cy.visit(`http://localhost:3000/${page}`)
          .get('.header')
          .should('be.visible')
          .get('.section')
          .should('have.length', 4)
          .and('have.attr', 'href')
          .get('.title')
          .should('have.length', 4)
          .and('not.be.empty')
      })
    })

    it('About page should have header and tagline', () => {
      cy.visit('http://localhost:3000/about')

      cy.get('h2')
        .should('be.visible')
        .and('have.text', 'About')
      cy.get('.tagline')
        .should('be.visible')
        .and('have.text', 'Allow me to re-introduce myself.')
    })

    it('About page should contain about items', () => {
      cy.visit('http://localhost:3000/about')

      const questionLength = cy.get('.content-item--question').length
      const answerlength = cy.get('.content-item--answer').length
      expect(questionLength).to.equal(answerlength)

      cy.get('.content-item--question')
        .should('have.length.greaterThan', 0)
      cy.get('.content-item--answer')
        .should('have.length.greaterThan', 0)
    })

    it('Projects page should contain header and tagline', () => {
      cy.visit('http://localhost:3000/projects')

      cy.get('h2')
        .should('be.visible')
        .and('have.text', 'Projects')
      cy.get('.tagline')
        .should('be.visible')
        .and('have.text', 'Here is some of my work:')
    })

    it('Projects page should contain project items', () => {
      cy.visit('http://localhost:3000/projects')

      cy.get('.project--item')
        .should('have.length.greaterThan', 0)
        .and('be.visible')

      cy.get('.project--item__link')
        .should('have.attr', 'href')

      cy.get('.project--item__description')
        .should('not.be.empty')
      
        cy.get('.project--item__title')
        .should('not.be.empty')
    })
  })
})

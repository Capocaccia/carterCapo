Cypress.Commands.add('checkAllHrefFor200', () => {
  cy.get('a').each((link) => {
    cy.request({
      url: link.prop('href'),
      failOnStatusCode: false
    }).then((response) => {
      expect([200, 403, 429]).to.include(response.status);
    });
  });
});
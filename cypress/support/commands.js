// Custom command to check external link status codes
Cypress.Commands.add('checkExternalLinkStatus', (url) => {
    cy.request({
        url: url,
        failOnStatusCode: false // Prevent Cypress from failing the test on non-200 status codes
    }).then((response) => {
        const allowedStatusCodes = [200, 403, 429];
        expect(allowedStatusCodes).to.include(response.status);
    });
});

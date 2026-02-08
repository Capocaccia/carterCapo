// cypress/support/commands.js

// Import the necessary Cypress commands
import '@cypress/some-module';

/**
 * Command to check all href for specified status codes.
 *
 * @param {Array<number>} acceptableStatusCodes - An array of acceptable status codes.
 */
Cypress.Commands.add('checkAllHrefFor200', (acceptableStatusCodes = [200, 403, 429]) => {
    const links = [...document.querySelectorAll('a[href]')];
    const requests = links.map(link => fetch(link.href).then(response => {
        const status = response.status;
        if (acceptableStatusCodes.includes(status)) {
            cy.log(`Link ${link.href} returned status ${status}`);
        } else {
            cy.log(`Link ${link.href} returned unexpected status ${status}`);
        }
    }));
    return Promise.all(requests);
});

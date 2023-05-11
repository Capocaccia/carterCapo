context("Capocaccia.dev", () => {
  describe("Tests the landing page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("Clicks on hero post", () => {
      cy.findByTestId("hero-post").within(($container) => {
        cy.findByRole("heading", {
          level: 3,
        })
          .invoke("text")
          .then((headerText) => {
            cy.wrap($container).get("a").first().click();
            cy.location("pathname").should("not.eq", "/");
            cy.get("404").should("not.exist");
            cy.contains(headerText);
          });
      });
      cy.checkAllHrefFor200();
      cy.findByTestId("home-link").click();
      cy.location("pathname").should("eq", "/");
    });

    it("Clicks on more stories post", () => {
      cy.get("[data-testid='post-preview']").first().as('firstPost')
      cy.get('@firstPost').should('be.visible')
      cy.get('@firstPost').within(() => {
        cy.get('h3').children('a').then(($a) => {
          let href = $a.attr('href')
          cy.wrap($a).click()
          cy.location('pathname').should('eq', href)
        })
      })
    });

    it("Clicks on the Contact link", () => {
      cy.findByText("Contact").click();
      cy.location("href").should("include", "footer");
    });
    it("All links should have HREF that returns a 200", () => {
      cy.checkAllHrefFor200();
    });
  });
  describe("Tests the Uses page", () => {
    beforeEach(() => {
      cy.visit("/posts/uses");
    });

    it("All links should have HREF that returns a 200", () => {
      cy.checkAllHrefFor200();
    });
  });
});

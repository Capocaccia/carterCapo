context("Capocaccia.dev", () => {
  describe("a basic test", () => {
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
      cy.findAllByTestId("post-preview").should("have.length.greaterThan", 0);
      cy.findAllByTestId("post-preview")
        .first()
        .within(($container) => {
          cy.wrap($container).get("a").first().click();
          cy.location("pathname").should("not.eq", "/");
          cy.get("404").should("not.exist");
        });
    });

    it("Clicks on the Contact link", () => {
      cy.findByText("Contact").click();
      cy.location("href").should("include", "footer");
    });

    it("All links should have HREF that returns a 200", () => {
      cy.checkAllHrefFor200();
    });
  });
});

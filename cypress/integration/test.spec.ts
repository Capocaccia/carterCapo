context("basic one", () => {
  describe("a basic test", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("Clicks on hero post", () => {
      cy.findByTestId("hero-post").within(($container) => {
        cy.wrap($container).get("a").first().click();
        cy.location("pathname").should("not.eq", "/");
        cy.get("404").should("not.exist");
      });
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
      cy.location("href").should("include", "#footer");
    });

    it.only("All links should have HREF populated", () => {
      cy.get("a").each((link) => {
        cy.wrap(link).invoke("attr", "href").should("not.be.empty");
      });
    });
  });
});

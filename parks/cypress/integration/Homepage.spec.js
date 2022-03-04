/* eslint-disable no-undef */
describe("renders the home page",() => {
    it("renders correctly", () => {
        cy.visit("/")
        cy.get("#container").should("exist")
    });

    it("checking with cypress", () => {
        cy.visit("/");
    });
});
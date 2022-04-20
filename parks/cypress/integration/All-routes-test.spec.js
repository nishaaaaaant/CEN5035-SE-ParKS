/* eslint-disable no-undef */
describe("Renders the home page and all its routes",() => {
    it("renders homepage correctly", () => {
        cy.visit("/")
        cy.get("#homePageDiv").should("exist")
    });

    it("renders aboutpage correctly",() => {
        cy.visit("/about")
        cy.get("#aboutPageDiv").should("exist")
    });

    it("renders loginpage correctly",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
    });

    it("renders registerpage correctly", () => {
        cy.visit("/registration")
        cy.get("#registrationPageDiv").should("exist")
    });
});
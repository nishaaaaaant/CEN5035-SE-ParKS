/* eslint-disable no-undef */
describe("renders the home page and routes",() => {
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

    it("renders renterpage correctly", () => {
        cy.visit("/renter")
        cy.get("#renterPageDiv").should("exist")
    });

    it("renders buyerpage correctly", () =>{
        cy.visit("/buyer")
        cy.get("#buyerPageDiv").should("exist")
    });
});
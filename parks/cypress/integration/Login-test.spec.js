/* eslint-disable no-undef */
describe("Checking the functionality of the login for all users",() => {
    it("checking the loginpage login functionality",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        cy.get('#formBasicEmail').type('aakanshtogani@gmail.com');
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-hKwDye').click();
        /* ==== Generated with Cypress Studio ==== */
        /* ==== End Cypress Studio ==== */
    });
});
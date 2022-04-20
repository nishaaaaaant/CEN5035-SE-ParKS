/* eslint-disable no-undef */
describe("check the functionality of the pages",() => {
    it("checking the loginpage login functionality",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#formBasicEmail').clear();
        cy.get('#formBasicEmail').type('testing@test.com');
        cy.get('#formBasicPassword').clear();
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-dkPtRN').click();
        /* ==== End Cypress Studio ==== */
    });
});
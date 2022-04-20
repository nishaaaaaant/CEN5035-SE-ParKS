/* eslint-disable no-undef */
describe("Test for User details edit",() => {
    it("checking the loginpage login functionality",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        cy.get('#formBasicEmail').type('aakanshtogani@gmail.com');
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-hKwDye').click();
        cy.get('#dropdown-split-basic').click();
        cy.get('.dropdown-menu > :nth-child(2)').click();
        cy.get('.sc-iCfMLu > button').click();
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('aakansh11');
        cy.get('[style="color: green;"]').click();
        cy.get('[style="color: red;"]').click();
        /* ==== Generated with Cypress Studio ==== */
        /* ==== End Cypress Studio ==== */
    });
});
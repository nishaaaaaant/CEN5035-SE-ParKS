/* eslint-disable no-undef */
describe("Checking all the booking of users",() => {
    it("Booking history of user",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        cy.get('#formBasicEmail').type('aakanshtogani@gmail.com');
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-hKwDye').click();
        /* ==== Generated with Cypress Studio ==== */
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#dropdown-split-basic').click();
        cy.get('.dropdown-menu > :nth-child(1)').click();
        /* ==== End Cypress Studio ==== */
    });
});
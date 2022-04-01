/* eslint-disable no-undef */
describe("check the location functionality of the maps integrated",() => {
    it("checking the location on maps",() => {
        cy.visit("/buyer")
        cy.get("#buyerPageDiv").should("exist")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.sc-dkPtRN > :nth-child(1) > button').click();
        cy.get('.sc-furwcr').click();
        /* ==== End Cypress Studio ==== */
    });
});
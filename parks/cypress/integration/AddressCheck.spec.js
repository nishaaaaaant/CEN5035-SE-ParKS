/* eslint-disable no-undef */
describe("check the location functionality of the maps integrated",() => {
    it("checking the location on maps",() => {
        cy.visit("/buyer")
        cy.get("#buyerPageDiv").should("exist")
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .sc-crHmcD > .sc-iqseJM').click();
        cy.get('.tsc-month__action-element--right').click();
        cy.get('.tsc-month__action-element--right').click();
        cy.get('.tsc-month__action-element--right').click();
        cy.get('.tsc-month__action-element--right').click();
        cy.get('.sc-furwcr').click();
        cy.get('.me-auto > :nth-child(4)').click();
        cy.get('.sc-dJjYzT').click();
        cy.get('#UserId').clear();
        cy.get('#UserId').type('Home');
        cy.get('#Address1').clear();
        cy.get('#Address1').type('4000 SW 37 BLVD');
        cy.get('#Address2').clear();
        cy.get('#Address2').type('1018, 10A');
        cy.get('#City').clear();
        cy.get('#City').type('Gainesville');
        cy.get('#State').clear();
        cy.get('#State').type('FL');
        cy.get('#Zip').clear();
        cy.get('#Zip').type('32608');
        cy.get('#Mobile').clear();
        cy.get('#Mobile').type('3528889039');
        cy.get('.sc-fotOHu').click();
        cy.get('.navbar-brand').click();
        /* ==== End Cypress Studio ==== */
    });
});
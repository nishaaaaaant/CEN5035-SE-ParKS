/* eslint-disable no-undef */
describe("Renter functionality test checking",() => {
    it("checking the address add functionality",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        cy.get('#formBasicEmail').type('aakanshtogani@gmail.com');
        cy.get('#formBasicPassword').type('test@123');
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.sc-hKwDye').click();
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.sc-gKclnd > :nth-child(1)').click();
        cy.get('.sc-egiyK').click();
        cy.get('.mapboxgl-ctrl-geocoder--input').clear();
        cy.get('.mapboxgl-ctrl-geocoder--input').type('300');
        cy.get('[style="display: flex;"] > :nth-child(1)').click();
        cy.get('#PropertyName').clear();
        cy.get('#PropertyName').type('3000 Southwest 12th Street');
        cy.get('#Address1').clear();
        cy.get('#Address1').type('Test');
        cy.get('#Address2').clear();
        cy.get('#Address2').type('Test');
        cy.get('#City').clear();
        cy.get('#City').type('Gainesville');
        cy.get('#State').clear();
        cy.get('#State').type('FL');
        cy.get('#Zip').clear();
        cy.get('#Zip').type('32608');
        cy.get('#Mobile').clear();
        cy.get('#Mobile').type('3528889039');
        cy.get('#Rate').clear();
        cy.get('#Rate').type('13');
        cy.get('#NoOfSpace').clear();
        cy.get('#NoOfSpace').type('13');
        cy.get('.sc-pVTFL').click();
        /* ==== End Cypress Studio ==== */
    });
});
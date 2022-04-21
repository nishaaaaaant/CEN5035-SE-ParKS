/* eslint-disable no-undef */
describe("Buyer functionality test checking maps",() => {
    it("checking the map search functionality",() => {
        cy.visit("/login")
        cy.get("#loginPageDiv").should("exist")
        cy.get('#formBasicEmail').type('aakanshtogani@gmail.com');
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-hKwDye').click();
        /* ==== Generated with Cypress Studio ==== */
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.sc-gKclnd > :nth-child(2)').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.mapboxgl-ctrl-geocoder--input').clear();
        cy.get('.mapboxgl-ctrl-geocoder--input').type('4000');
        cy.get('.mapboxgl-ctrl-geocoder--input').click();
        cy.get('.mapboxgl-ctrl-geocoder--input').click();
        cy.get('.mapboxgl-ctrl-geocoder--input').clear();
        cy.get('.mapboxgl-ctrl-geocoder--input').type('5000 sw');
        /* ==== End Cypress Studio ==== */
    });
});
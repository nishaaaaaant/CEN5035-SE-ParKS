/* eslint-disable no-undef */
describe("check the location functionality of the maps integrated",() => {
    it("checking the location on maps",() => {
        cy.visit("/buyer")
        cy.get("#buyerPageDiv").should("exist")
    });
});
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

    it("checking registerpage register functionality", () => {
        cy.visit("/registration")
        cy.get("#registrationPageDiv").should("exist")
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(2) > .form-control').clear();
        cy.get(':nth-child(2) > .form-control').type('test');
        cy.get(':nth-child(3) > .form-control').clear();
        cy.get(':nth-child(3) > .form-control').type('test');
        cy.get(':nth-child(4) > .form-control').clear();
        cy.get(':nth-child(4) > .form-control').type('test@gmail.com');
        cy.get(':nth-child(5) > .form-control').clear();
        cy.get(':nth-child(5) > .form-control').type('test@123');
        cy.get('.sc-gsDKAQ > .btn').click();
        cy.get('#formBasicEmail').clear();
        cy.get('#formBasicEmail').type('test@gmail.com');
        cy.get('#formBasicPassword').clear();
        cy.get('#formBasicPassword').type('test@123');
        cy.get('.sc-jRQBWg').click();
        /* ==== End Cypress Studio ==== */
    });

    it("checking buyerpage map functionality", () =>{
        cy.visit("/buyer")
        cy.get("#buyerPageDiv").should("exist")
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.leaflet-control-zoom-out').click();
        cy.get('.leaflet-control-zoom-out').click();
        cy.get('.leaflet-control-zoom-out').click();
        cy.get('.leaflet-control-zoom-out').click();
        /* ==== End Cypress Studio ==== */
    });
});
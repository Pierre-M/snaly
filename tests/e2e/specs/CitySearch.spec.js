"use strict";

describe("City Search Feature", () => {
    it("should be able to display temperature for searched city", () => {
        console.log("baseUrl", Cypress.env("baseUrl"));
        cy.visit("/");
        cy.get("#openCitySearch").click();
        cy.get("#citySearchQueryInput").type("Lyon");
        cy.get("#citySearchResults li:first-child").click();

        cy.get("#appTitle").should("contains.text", "Lyon");
    });
});

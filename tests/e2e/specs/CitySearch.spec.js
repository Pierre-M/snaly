"use strict";

describe("City Search Feature", () => {
    it("should be able to display temperature for searched city", () => {
        cy.visit("/");
        cy.get("#openCitySearch").click();
        cy.get("#citySearchQueryInput").type("Lyon");
        cy.get("#citySearchResults li:first-child").click();

        cy.get("#appTitle").should("contains.text", "Lyon");
    });

    it("should to reload page on the same searched location", () => {
        cy.visit("/");
        cy.get("#openCitySearch").click();
        cy.get("#citySearchQueryInput").type("Lyon");
        cy.get("#citySearchResults li:first-child").click();

        cy.reload();

        cy.get("#appTitle").should("contains.text", "Lyon");
    });
});

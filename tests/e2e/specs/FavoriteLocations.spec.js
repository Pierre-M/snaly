"use strict";

describe("Favorite locations Feature", () => {
    it("should be able to add, save and remove current location to favorite from app header", () => {
        cy.visit("/");
        cy.get("[data-favorite-location-toggle]").click();
        cy.get("#openCitySearch").click();
        cy.get("#favoriteLocationsList li").should("have.length", 1);

        cy.reload();

        cy.get("#openCitySearch").click();
        cy.get("#favoriteLocationsList li").should("have.length", 1);

        cy.get("#favoriteLocationsList li:first-child [data-favorite-location-toggle]").click();

        cy.reload();

        cy.get("#openCitySearch").click();
        cy.get("#favoriteLocationsList li").should("have.length", 0);
    });

    it("should be able to add and save current location to favorite from search results", () => {
        cy.visit("/");
        cy.get("#openCitySearch").click();
        cy.get("#citySearchQueryInput").type("Lyon");
        cy.get("#citySearchResults > li > [data-favorite-location-toggle]").click();

        cy.reload();

        cy.get("#openCitySearch").click();
        cy.get("#favoriteLocationsList li").should("have.length", 1);
        cy.get("#favoriteLocationsList li").should("contains.text", "Lyon");

        cy.get("#citySearchQueryInput").type("Lyon");
        cy.get("#citySearchResults > li > [data-favorite-location-toggle]").click();

        cy.reload();

        cy.get("#openCitySearch").click();
        cy.get("#favoriteLocationsList li").should("have.length", 0);
    });
});

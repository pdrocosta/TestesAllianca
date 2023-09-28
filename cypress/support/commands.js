Cypress.Commands.add("enviarFormulario", () => {
  cy.get("form").submit();
});

Cypress.Commands.add("confirmarUrl", (param) => {
  {
    cy.url().should("eq", `https://www.CartaoAlianca.com.br/${param}`);
  }
});

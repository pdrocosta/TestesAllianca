Cypress.Commands.add("enviarFormulario", () => {
  cy.get("form").submit();
});

Cypress.Commands.add("confirmarUrl", (param) => {
  {
    cy.url().should("eq", `https://www.CartaoAlianca.com.br/${param}`);
  }
});

Cypress.Commands.add("clicarBotao", (text) => {
  cy.get("button").contains(text).click();
});

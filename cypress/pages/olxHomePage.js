class OlxHomePage {
  navigate() {
    cy.visit("https://www.olx.com.br");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("#oraculo-4-input").type(text);
    cy.get("form").submit();
    return this;
  }
}

export default OlxHomePage;

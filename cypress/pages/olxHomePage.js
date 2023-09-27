class OlxHomePage {
  procurarTextoNaSearchBox(text) {
    cy.get("#oraculo-4-input").type(text);
    cy.get("form").submit();
    return this;
  }
}

export default OlxHomePage;

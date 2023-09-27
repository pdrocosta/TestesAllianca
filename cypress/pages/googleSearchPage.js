class GoogleSearchPage {
  navigate() {
    cy.visit("https://www.google.com");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("textarea[name='q']").type(text);
    cy.get("form").submit();
    return this;
  }
}

export default GoogleSearchPage;

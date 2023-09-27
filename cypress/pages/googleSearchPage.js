class GoogleSearchPage {
  navigate() {
    cy.visit("https://www.google.com");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("textarea[name='q']").type(text);
    cy.get("form").submit();
    return this;
  }
  encontrarPesquisa(pesquisa) {
    cy.get("body").should("contain", `${pesquisa}`);
  }
  encontrarErroDePesquisa() {
    cy.get("div").should(
      "contain",
      "Sua pesquisa não encontrou nenhum documento correspondente"
    );
  }
}

export default GoogleSearchPage;

class GoogleSearchPage {
  navigate() {
    return cy.visit("https://www.google.com");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("textarea[name='q']").type(text);
    cy.enviarFormulario()
    return this;
  }
  encontrarPesquisa(pesquisa) {
    return cy.get("body").should("contain", `${pesquisa}`);
  }
  encontrarErroDePesquisa() {
    return cy.get("div").should(
      "contain",
      "Sua pesquisa não encontrou nenhum documento correspondente"
    );
  }
}

export default GoogleSearchPage;

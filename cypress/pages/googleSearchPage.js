class GoogleSearchPage {
  srchBox = "textarea[name='q']";
  urlG = "https://www.google.com";
  txtErr = "Sua pesquisa não encontrou nenhum documento correspondente";

  navigate() {
    return cy.visit(urlG);
  }

  procurarTextoNaSearchBox(text) {
    cy.get(srchBox).type(text);
    cy.enviarFormulario();
  }
  encontrarPesquisa(pesquisa) {
    cy.get("body").should("contain", `${pesquisa}`);
  }
  encontrarErroDePesquisa() {
    cy.get("div").should("contain", txtErr);
  }
}

export default GoogleSearchPage;

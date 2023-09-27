class OlxHomePage {
  navigate() {
    cy.visit("https://www.olx.com.br");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("#oraculo-4-input").type(text);
    cy.get("form").submit();
    return this;
  }

  aceitarCookies() {
    cy.get("#cookie-notice-ok-button").click();
  }

  encontrarPesquisaValida(pesquisa) {
    cy.get('a[data-ds-component="DS-NewAdCard-Link"]')
      .should("have.attr", "href")
      .and("include", `${pesquisa}`);
  }

  encontrarErroDePesquisa() {
    cy.get("span").contains("Ops! Nenhum anúncio foi encontrado.");
  }
}

export default OlxHomePage;

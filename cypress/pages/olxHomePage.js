class OlxHomePage {
  navigate() {
    return cy.visit("https://www.olx.com.br");
  }

  procurarTextoNaSearchBox(text) {
    cy.get("#oraculo-4-input").type(text);
    cy.get("form").submit();
    return this;
  }

  aceitarCookies() {
    return cy.get("#cookie-notice-ok-button").click();
    
  }

  encontrarPesquisaValida(pesquisa) {
   return cy.get('a[data-ds-component="DS-NewAdCard-Link"]')
      .should("have.attr", "href")
      .and("include", `${pesquisa}`);
  }

  encontrarErroDePesquisa() {
    return cy.get("span").contains("Ops! Nenhum anúncio foi encontrado.");
  }
}

export default OlxHomePage;

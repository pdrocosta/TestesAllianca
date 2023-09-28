class OlxHomePage {
  urlOlx = "https://www.olx.com.br";
  srchBox = "#oraculo-4-input";
  cookieBtn = "#cookie-notice-ok-button";
  cardResult = 'a[data-ds-component="DS-NewAdCard-Link"]';
  txtInvalid = "Ops! Nenhum anúncio foi encontrado.";

  navigate() {
    cy.visit(urlOlx);
  }

  procurarTextoNaSearchBox(text) {
    cy.get(srchBox).type(text);
    cy.enviarFormulario();
  }

  aceitarCookies() {
    cy.get(cookieBtn).click();
  }

  encontrarPesquisaValida(pesquisa) {
    cy.get(cardResult)
      .should("have.attr", "href")
      .and("include", `${pesquisa}`);
  }

  encontrarErroDePesquisa() {
    cy.get("span").contains(txtInvalid);
  }
}

export default OlxHomePage;

class CartaoAlliancaRegisterPage {
  urlAllianca = "https://www.CartaoAlianca.com.br/Cadastro";
  inptConfSenha = "#confirmarSenha";
  divAlertSucc = "#alerta-sucesso";
  txtSucc = "Cadastro realizado!";
  userJson = "userInfos.json";

  navigate() {
    cy.visit(urlAllianca);
  }
  preencherFormulario() {
    cy.fixture(userJson).then((user) => {
      Object.keys(user).forEach((key) => {
        cy.get(`#${key}`).type(user[key]);
      });

      cy.get(inptConfSenha).type(user.senha);
    });
  }

  encontrarAlertaDeCadastroRealizado() {
    cy.get(divAlertSucc).should("be.visible").should("contain.text", txtSucc);
  }

  checarRegistroBackEnd() {
    cy.request("GET", "/api/users").then((response) => {
      const users = response.body;
      cy.fixture(userJson).then((userInfos) => {
        const user = users.find((u) => u.cpf === userInfos.cpf);

        expect(user.nascimento).to.equal(userInfos.nascimento);
        expect(user.telefone).to.equal(userInfos.telefone);
        expect(user.email).to.equal(userInfos.nome);
        expect(user.senha).to.equal(userInfos.senha);
      });
    });
  }
  clicarBotaoDeRedirecionamento(text) {
    cy.get("button").contains(text).click();
  }

  checarUrlRedirecionada(text) {
    const urlText = text.replace(/\s+/g, "");
    cy.confirmarUrl(urlText);
  }
}

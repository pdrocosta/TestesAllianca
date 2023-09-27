class CartaoAlliancaRegisterPage {
  navigate() {
    cy.visit("https://www.CartaoAlianca.com.br/Cadastro");
  }
  preencherFormulario() {
    cy.fixture("userInfos.json").then((userInfos) => {
      Object.keys(userInfos).forEach((key) => {
        cy.get(`#${key}`).type(userInfos[key]);
      });

      cy.get("#confirmarSenha").type(userInfos.senha);
    });
    return this;
  }

  submitForm() {
    return cy.get('button[type="submit"]').click();
  }
  encontrarAlertaDeCadastroRealizado() {
    return cy
      .get("#alerta-sucesso")
      .should("be.visible")
      .should("contain.text", "Cadastro realizado!");
  }
  confirmarUrl(param) {
    return cy.url().should("eq", `https://www.CartaoAlianca.com.br/${param}`);
  }

  checarRegistroBackEnd() {
    return cy.request("GET", "/api/users").then((response) => {
      const users = response.body;
      cy.fixture("userInfos.json").then((userInfos) => {
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
        cy.url().should("eq", `https://www.CartaoAlianca.com.br/${urlText}`);  
    }
}

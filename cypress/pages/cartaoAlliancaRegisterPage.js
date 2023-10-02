class CartaoAlliancaRegisterPage {
  /// Constantes utilizadas
  urlAlliancaCadastro = "https://www.CartaoAlianca.com.br/";
  inptConfSenha = "#confirmarSenha";
  divAlertSucc = "#alerta-sucesso";
  txtSucc = "Cadastro realizado!";
  userJson = "userInfos.json";

  /// Visit para url fixa
  navigate() {
    cy.visit(`${this.urlAlliancaCadastro}Cadastro`);
  }

  /// Funcao para buscar os dados de mock em fixture, percorre-los, encontrar as keys, percorre-las, encontrando os inputs correspondentes, e escrever
  preencherFormulario() {
    cy.fixture(this.userJson).then((user) => {
      Object.keys(user).forEach((key) => {
        cy.get(`#${key}`).type(user[key]);
      });

      cy.get(this.inptConfSenha).type(user.senha);
    });
  }

  /// Funcao para confirmar visibilidade do alerta de sucesso.
  encontrarAlertaDeCadastroRealizado() {
    cy.get(this.divAlertSucc)
      .should("be.visible")
      .should("contain.text", this.txtSucc);
  }

  /// Funcao mock, para simular uma busca no backend, confirmando as informacoes cadastradas no banco de dados
  checarRegistroBackEnd() {
    cy.request("GET", "/api/users").should((response) => {
      expect(response.status).to.eq(200);
      const users = response.body;
      cy.fixture(this.userJson).then((userInfos) => {
        const user = users.find((u) => u.cpf === userInfos.cpf);

        expect(user.nascimento).to.equal(userInfos.nascimento);
        expect(user.telefone).to.equal(userInfos.telefone);
        expect(user.email).to.equal(userInfos.nome);
        expect(user.senha).to.equal(userInfos.senha);
      });
    });
  }

  /// Funcao que retira os espacos do texto, e busca eles na url para confirmar se esta presente
  checarUrlRedirecionada(text) {
    const urlText = text.replace(/\s+/g, ""); /// /s para identificar o espaco, e o g para aplicar em todos, substituindo pela proxima variavel, que seria uma string vazia
    cy.confirmarUrl(urlAlliancaCadastro + urlText);
  }
}

export default CartaoAlliancaRegisterPage;

describe("Teste 1", () => {
  it("Faz uma pesquisa valida, e tira print da tela", () => {
    cy.visit("https://www.olx.com.br/"); /// visita url
    
    cy.get(".olx-logo-olx").should("be.visible"); /// busca logo para verificar se pagina esta correta
    cy.get("#oraculo-4-input").type("Audi", { enter: true }); /// acha input e escreve procura
    cy.get('button[data-ds-component="Oraculo-Button"]').click(); /// acha botao de pesquisa e clica

    cy.wait(10000);

    cy.get('a[data-ds-component="DS-NewAdCard-Link"]') //// busca card de produto com link contendo audi
      .should("have.attr", "href")
      .and("include", "audi");
    cy.screenshot();
  });
});
describe("Teste 2", () => {
  it("Faz uma pesquisa invalida, e tira print da tela", () => {
    cy.visit("https://www.olx.com.br/"); /// visita url
    
    cy.get(".olx-logo-olx").should("be.visible"); /// busca logo para verificar se pagina esta correta
    cy.get("#oraculo-4-input").type("!!!!##&*&%", { enter: true }); /// acha input e escreve procura
    cy.get('button[data-ds-component="Oraculo-Button"]').click(); /// acha botao de pesquisa e clica
    
    cy.wait(10000);

    cy.get("span").contains("Ops! Nenhum anúncio foi encontrado."); /// checa para confirmar que nao houveram resultados
    cy.screenshot();
  });
});

describe("Teste 3", () => {

  const userInfos = {
    nome: "Pedro",
    cpf: "12345678900",
    nascimento: "12345678",
    telefone: "44934567890",
    email: "pedro@mail.com",
    senha: "123456789",
  };

  it.skip("Preencher formulario, cadastrar, ir para pagina de login e conferir se usuario foi criado corretamente na API", () => {
    cy.visit("https://www.CartaoAlianca.com.br/Cadastro");
    
    cy.get("#nome").type(userInfos.nome); /// busca todos campos do formulario e escreve infomacoes do usuario
    cy.get("#cpf").type(userInfos.cpf);
    cy.get("#nascimento").type(userInfos.nascimento);
    cy.get("#telefone").type(userInfos.telefone);
    cy.get("#email").type(userInfos.email);
    cy.get("#senha").type(userInfos.senha);
    cy.get("#confirmarSenha").type(userInfos.senha);
    
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "https://www.CartaoAlianca.com.br/login"); // checa se foi redirecionado a pagina de login

    cy.request("GET", "/api/users").then((response) => {
      /// checa no banco de dados se usuario foi criado corretamente
      const users = response.body;

      const user = users.find((u) => u.cpf === userInfos.cpf);

      expect(user.nascimento).to.equal(userInfos.nascimento);
      expect(user.telefone).to.equal(userInfos.telefone);
      expect(user.email).to.equal(userInfos.nome);
      expect(user.senha).to.equal(userInfos.senha);
    });
  });
});

describe("Teste 4", () => {
  const buttons = [
    "Logo",
    "Início",
    "Rede de Parceiros",
    "Fale Conosco",
    "Quero ser Parceiro",
    "Nossos Produtos",
    "Entrar",
    "Quero meu Cartão",
    "Trocar Plano",
    "Endereco",
    "Pagamento",
    "Acesso ao Plano",
  ];

  it.skip("Testar funcionalidade dos botões", () => {
    cy.visit("https://www.CartaoAlianca.com.br/Cadastro");
    buttons.forEach((buttonText) => {
      /// atraves da lista dos botoes, busca cada um, clica, tira print e retorna para o proximo teste.
      cy.get("button").contains(buttonText).click();
      cy.screenshot();
      cy.go("back");
    });
  });
});
/// anotar possiveis testes

/// 1-> testar se formulario pode ser cadastrado com informacoes a menos
/// 2 -> testar se informacoes se mantem quando pagina eh recarregada
/// 3 -> testar se senha eh mantida ou nao quando pagina eh recarregada
/// 4-> testar responsividade do frontend com diferentes dispositivos
/// 5 -> 

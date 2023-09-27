import GoogleSearchPage from "../pages/googleSearchPage";
import OlxHomePage from "../pages/olxHomePage";

/// Caso 1 e 2 ->

describe("Verificar funcionalidade de pesquisa da OLX", () => {
  beforeEach(() => {
    cy.visit("https://www.olx.com.br");
    cy.get("#cookie-notice-ok-button").click();
  });

  it("Faz uma pesquisa valida, e tira print da tela", () => {
    const olx = new OlxHomePage();

    olx.procurarTextoNaSearchBox("teclado gamer");

    cy.get('a[data-ds-component="DS-NewAdCard-Link"]')
      .should("have.attr", "href")
      .and("include", "teclado");

    cy.screenshot();
  });

  it("Faz uma pesquisa invalida, e tira print da tela", () => {
    const olx = new OlxHomePage();

    olx.procurarTextoNaSearchBox("!!!!##&*&%");

    cy.get("span").contains("Ops! Nenhum anúncio foi encontrado.");

    cy.screenshot();
  });
});

/// Caso 3 ->

/// lista de outros exemplos de teste para este caso estao no txt desta pasta -> ./e2e/caso3.txt
describe("Verifica funcionalidades da pagina de cadastro da Cartao Allianca", () => {

  beforeEach(() => {
    cy.visit("https://www.CartaoAlianca.com.br/Cadastro");
  });
  
  const userInfos = {
    nome: "Pedro",
    cpf: "12345678900",
    nascimento: "12345678",
    telefone: "44934567890",
    email: "pedro@mail.com",
    senha: "123456789",
  };

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

  it.skip("Preenche formulario, cadastra, vai para pagina de login e confere se usuario foi criado corretamente na API", () => {
    

    cy.get("#nome").type(userInfos.nome);
    cy.get("#cpf").type(userInfos.cpf);
    cy.get("#nascimento").type(userInfos.nascimento);
    cy.get("#telefone").type(userInfos.telefone);
    cy.get("#email").type(userInfos.email);
    cy.get("#senha").type(userInfos.senha);
    cy.get("#confirmarSenha").type(userInfos.senha);

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "https://www.CartaoAlianca.com.br/login");

    cy.request("GET", "/api/users").then((response) => {
      const users = response.body;
      const user = users.find((u) => u.cpf === userInfos.cpf);

      expect(user.nascimento).to.equal(userInfos.nascimento);
      expect(user.telefone).to.equal(userInfos.telefone);
      expect(user.email).to.equal(userInfos.nome);
      expect(user.senha).to.equal(userInfos.senha);
    });
  });


  it.skip("Testar funcionalidade dos botões", () => {

    buttons.forEach((buttonText) => {
      cy.get("button").contains(buttonText).click();
      cy.screenshot();
      cy.go("back");
    });
  });
});

/// Caso 1 e 2 v2 ->

describe("Teste 1 e 2 v2", () => {
  beforeEach(() => {
    cy.visit("https://www.google.com");
  });

  it("Faz uma pesquisa valida, e tira print da tela", () => {
    const google = new GoogleSearchPage();

    google.procurarTextoNaSearchBox("teclado");

    cy.get("body").should("contain", "teclado");

    cy.screenshot();
  });

  it("Faz uma pesquisa invalida, e tira print da tela", () => {
    const google = new GoogleSearchPage();

    google.procurarTextoNaSearchBox("@%&^&*#@51fgsdfg");

    cy.get("div").should(
      "contain",
      "Sua pesquisa não encontrou nenhum documento correspondente"
    );

    cy.screenshot();
  });
});

import GoogleSearchPage from "../pages/googleSearchPage";
import OlxHomePage from "../pages/olxHomePage";

/// Caso 1 e 2 ->

describe("Verificar funcionalidade de pesquisa da OLX", () => {
  const olx = new OlxHomePage();

  beforeEach(() => {
    olx.navigate();
    cy.get("#cookie-notice-ok-button").click();
  });

  it("Faz uma pesquisa valida, e tira print da tela", () => {
    olx.procurarTextoNaSearchBox("teclado gamer");

    cy.get('a[data-ds-component="DS-NewAdCard-Link"]').should(
      "have.attr",
      "href"
    );
    //.and("include", "teclado");

    cy.screenshot();
  });

  it("Faz uma pesquisa invalida, e tira print da tela", () => {
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

  const buttons = [
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
    cy.fixture("userInfos.json").then((userInfos) => {
      Object.keys(userInfos).forEach((key) => {
        cy.get(`#${key}`).type(userInfos[key]);
      });

      cy.get("#confirmarSenha").type(userInfos.senha);
    });

    cy.get('button[type="submit"]').click();

    cy.get("#alerta-sucesso")
      .should("be.visible")
      .should("contain.text", "Cadastro realizado!");

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
      const urlText = buttonText.replace(/\s+/g, "");
      cy.url().should("eq", `https://www.CartaoAlianca.com.br/${urlText}`);
      cy.go("back");
    });
  });
});

/// Caso 1 e 2 v2 ->

describe("Teste 1 e 2 v2", () => {
  const google = new GoogleSearchPage();

  beforeEach(() => {
    google.navigate();
  });

  it.skip("Faz uma pesquisa valida, e tira print da tela", () => {
    google.procurarTextoNaSearchBox("teclado");

    cy.get("body").should("contain", "teclado");

    cy.screenshot();
  });

  it.skip("Faz uma pesquisa invalida, e tira print da tela", () => {
    google.procurarTextoNaSearchBox("@%&^&*#@51fgsdfg");

    cy.get("div").should(
      "contain",
      "Sua pesquisa não encontrou nenhum documento correspondente"
    );

    cy.screenshot();
  });
});

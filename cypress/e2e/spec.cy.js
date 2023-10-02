import CartaoAlliancaRegisterPage from "../pages/cartaoAlliancaRegisterPage";
import GoogleSearchPage from "../pages/googleSearchPage";
import OlxHomePage from "../pages/olxHomePage";

/// Caso 1 e 2 ->

describe("Verificar funcionalidade de pesquisa da OLX", () => {
  const olx = new OlxHomePage();

  beforeEach(() => {
    olx.navigate();
    olx.aceitarCookies();
  });

  it.skip("Faz uma pesquisa valida, e tira print da tela", () => {
    olx.procurarTextoNaSearchBox("teclado gamer");
    olx.encontrarPesquisaValida("teclado gamer");
    cy.screenshot();
  });

  it.skip("Faz uma pesquisa invalida, e tira print da tela", () => {
    olx.procurarTextoNaSearchBox("!!!!##&*&%");
    olx.encontrarErroDePesquisa();
    cy.screenshot();
  });
});

/// Caso 3 ->

/// lista de outros exemplos de teste para este caso estao no txt desta pasta -> ./e2e/caso3.txt
describe("Verifica funcionalidades da pagina de cadastro da Cartao Allianca", () => {
  const registerPage = new CartaoAlliancaRegisterPage();

  beforeEach(() => {
    registerPage.navigate();
  });

  /// botoes encontrados no screenshot na pagina
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
    registerPage.preencherFormulario();
    cy.submitForm();
    cy.confirmarUrl("login");
    registerPage.checarRegistroBackEnd();
  });

  it.skip("Testar funcionalidade dos botões", () => {
    buttons.forEach((buttonText) => {
      cy.clicarBotao(buttonText);
      registerPage.checarUrlRedirecionada(buttonText);
      cy.go("back");
    });
  });
});

/// Caso 1 e 2 v2 ->

describe("Teste 1 e 2 v2", () => {
  const g = new GoogleSearchPage();

  beforeEach(() => {
    g.navigate();
  });

  it("Faz uma pesquisa valida, e tira print da tela", () => {
    g.procurarTextoNaSearchBox("teclado");
    g.encontrarPesquisa("teclado");
    cy.screenshot();
  });

  it("Faz uma pesquisa invalida, e tira print da tela", () => {
    g.procurarTextoNaSearchBox("@%&^&*#@51fgsdfg");
    g.encontrarErroDePesquisa();

    cy.screenshot();
  });
});

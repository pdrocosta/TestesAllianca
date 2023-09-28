import GoogleSearchPage from "../pages/googleSearchPage";
import OlxHomePage from "../pages/olxHomePage";

/// Caso 1 e 2 ->

describe("Verificar funcionalidade de pesquisa da OLX", () => {
  const olx = new OlxHomePage();

  beforeEach(() => {
    olx.navigate();
    olx.aceitarCookies();
  });

  it("Faz uma pesquisa valida, e tira print da tela", () => {
    olx.procurarTextoNaSearchBox("teclado gamer");
    olx.encontrarPesquisaValida("teclado gamer");
    cy.screenshot();
  });

  it("Faz uma pesquisa invalida, e tira print da tela", () => {
    olx.procurarTextoNaSearchBox("!!!!##&*&%");
    olx.encontrarErroDePesquisa();
    cy.screenshot();
  });
});

/// Caso 3 ->

/// lista de outros exemplos de teste para este caso estao no txt desta pasta -> ./e2e/caso3.txt
describe("Verifica funcionalidades da pagina de cadastro da Cartao Allianca", () => {
  const cartaoAlliancaRegisterPage = new CartaoAlliancaRegisterPage();

  beforeEach(() => {
    cartaoAlliancaRegisterPage.navigate();
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
    cartaoAlliancaRegisterPage.preencherFormulario();
    cy.submitForm();
    cy.confirmarUrl("login");
    cartaoAlliancaRegisterPage.checarRegistroBackEnd();
  });

  it.skip("Testar funcionalidade dos botões", () => {
    buttons.forEach((buttonText) => {
      cartaoAlliancaRegisterPage.clicarBotaoDeRedirecionamento(buttonText);
      cartaoAlliancaRegisterPage.checarUrlRedirecionada(buttonText);
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
    google.encontrarPesquisa("teclado");
    cy.screenshot();
  });

  it.skip("Faz uma pesquisa invalida, e tira print da tela", () => {
    google.procurarTextoNaSearchBox("@%&^&*#@51fgsdfg");
    google.encontrarErroDePesquisa();

    cy.screenshot();
  });
});

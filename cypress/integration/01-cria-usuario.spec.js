describe('Cria um usuário', () => {
  it('Acessa o site', () => {
    cy.visit('http://agapito-server.herokuapp.com/');
  });
  it('Entra no menu de usuário', () => {
    cy.get("#users").should('be.visible');
    cy.get("#users").click();

    cy.url()
      .should('include', '/users');
  });
  it('Entra na pagina de criação de usuário', () => {
    cy.get("#btn-new").click();
    cy.url()
      .should('include', '/users/new');
  });
  it('Preenche o formulário', () => {
    cy.fixture('usuario/novoUsuario')
      .then(novoUsuario => {
        cy.get("#user_login") 
          .type(novoUsuario.login);
        cy.get("#user_full_name") 
          .type(novoUsuario.full_name);
        cy.get("#user_email")
          .type(novoUsuario.email);
        // TODO perguntar o pq da erro ao tentar inserir a idade? 
        // ele informa que já existe um elemento algo do tipo, n lembro, mas n existe.
        cy.get("#user_age")
          .type(novoUsuario.age);
      });
  });
  it('Clica no botão para salvar o usuário', () => {
    cy.get("#btn-save").click();
  });
});

describe('Recupera as informações do usuário cadastrado', () => {
  it('Pega as informações que foram cadastradas na tela', () => {
    const user = {
      codigo: null,
      login: null,
      full_name: null,
      email: null,
      age: null,
    };
    cy.get('#codigo').should('not.be.null');
    cy.get('#codigo').then(function($el) {
      user.codigo = $el.text();
      cy.log(user.codigo);
    });
    cy.get('#login').then(($el) => {
      user.login = $el.text();
    });
    cy.get('#full_name').then(($el) => {
      user.full_name = $el.text();
    });
    cy.get('#email').then(($el) => {
      user.email = $el.text();
    });
    cy.get('#age').then(($el) => {
      user.age = $el.text();
    });
    cy.log(user.codigo);
    cy.log(user.login);
    cy.log(user.full_name);
    cy.log(user.email);
    cy.log(user.age);
  });
});
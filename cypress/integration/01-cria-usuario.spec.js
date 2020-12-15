describe('Criar um usuário', () => {
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
    cy.get("#btn-new").should('be.visible');
    cy.get("#btn-new").click();
    cy.url()
      .should('include', '/users/new');
  });
  it('Preenche o formulário', () => {
    cy.fixture('user/newUser')
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
    cy.get('#codigo').should('not.be.null');
    cy.get('#codigo').then(($el) => {
      cy.log($el.text());
      cy.readFile('cypress/fixtures/user/newUser.json').then(user => {
        const { age, email, full_name, login } = user;
        cy.writeFile('cypress/fixtures/user/getUser.json', { codigo: $el.text(), age, email, full_name, login}).then(() => {});
      });
    });
  });
});
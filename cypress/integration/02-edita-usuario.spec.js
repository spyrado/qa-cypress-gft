describe('Editar um usuário', () => {
  it('Entra no menu de usuário', () => {
    cy.get(".ls-ico-users").should('be.visible');
    cy.get(".ls-ico-users").click();
    cy.url()
    .should('include', '/users');
  });
  it('Clica no botão editar de um usuário com ID específico.', () => {
    cy.readFile('cypress/fixtures/user/getUser.json').then(user => {
      cy.get(`#btn-edit_${user.codigo}`).click();
    });
  });
  it('Altera os campos desse usuário', () => {
    cy.get("#user_login")
      .clear()
      .type('LOGIN EDITADO COM SUCESSO');
  });
  it('Clica no botão para salvar o usuário que foi editado.', () => {
    cy.get("#btn-save").click();
  });
  it('Recupera os campos gravados, e adiciona no arquivo updateUser.json', () => {
    cy.get('#login').then(($el) => {
      cy.log($el.text())
      cy.readFile('cypress/fixtures/user/getUser.json').then(user => {
        const { age, email, full_name, login, codigo } = user;
        cy.writeFile('cypress/fixtures/user/updateUser.json', { codigo, age, email, full_name, login: $el.text()}).then(() => {});
      });
    });
  });
});
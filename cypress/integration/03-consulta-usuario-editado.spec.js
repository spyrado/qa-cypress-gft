describe('Consultar um usuário', () => {
  it('Entra no menu de usuário', () => {
    cy.get(".ls-ico-users").should('be.visible');
    cy.get(".ls-ico-users").click();
    cy.url()
    .should('include', '/users');
  });
  it('Clica no botão mostrar de um usuário com ID específico.', () => {
    cy.readFile('cypress/fixtures/user/updateUser.json').then(usuario => {
      cy.get(`#btn-show_${usuario.codigo}`).click();
    });
  });
  it('Verifica se o campo alterado anteriormente refletiu na tela de consulta.', () => {
    cy.get("#login").then($el => {
      cy.readFile('cypress/fixtures/user/updateUser.json').then(user => {
        expect(user.login).to.equal($el.text());
      })
    });
  });
});
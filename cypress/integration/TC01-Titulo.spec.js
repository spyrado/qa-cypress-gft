describe('Acessar site e validar texto de apresentação', () => {
  it('Acessar site', () => {
    cy.visit('http://agapito-server.herokuapp.com/');
  });
  it('validar texto', () => {
    cy.contains('Este é o sitef do Prof');
  });
});
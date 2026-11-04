describe('Protección contra vulnerabilidad XSS', () => {

  it('No debe interpretar HTML y debe mostrarlo como texto plano', () => {

    cy.visit('http://localhost:3000');

    // Login
    cy.get('#email').type('admin@test.com');
    cy.get('#password').type('123');
    cy.contains('button', 'Ingresar').click();

    // Crear tarea con HTML
    cy.get('#taskTitle').type('<h1>TAREA MALICIOSA</h1>');
    cy.contains('button', 'Crear tarea').click();

    // Verificar que NO se renderizó como etiqueta H1
    cy.get('#taskList h1').should('not.exist');

    // Verificar que se muestra exactamente como texto plano
    cy.get('#taskList li')
      .should('contain.text', '<h1>TAREA MALICIOSA</h1>');

  });

});
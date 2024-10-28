
const { faker } = require('@faker-js/faker');

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        
        cy.visit(url + '/board?modal-issue-create=true');
      });
  });

  it('Should create an custom issue and validate it successfully', () => {
    const randomTitle = faker.lorem.words(3); 
    const randomDescription = faker.lorem.sentence(); 

    
    cy.get('[data-testid="modal:issue-create"]').within(() => {
     
      cy.get('.ql-editor').type(randomDescription);
      cy.get('.ql-editor').should('have.text', randomDescription);

     
      cy.get('input[name="title"]').type(randomTitle);
      cy.get('input[name="title"]').should('have.value', randomTitle);

   
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]').wait(1000).trigger('mouseover').trigger('click');
      cy.get('[data-testid="icon:story"]').should('be.visible');

      
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();

      
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();

      
      cy.get('button[type="submit"]').click();
    });

    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');

    
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    
    cy.get('[data-testid="board-list:backlog"]')
      .should('be.visible')
      .and('have.length', '1')
      .within(() => {
        
        cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(randomTitle)
          .siblings()
          .within(() => {
            
            cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
            cy.get('[data-testid="icon:story"]').should('be.visible');
          });
      });

    cy.get('[data-testid="board-list:backlog"]')
      .contains(randomTitle)
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
        cy.get('[data-testid="icon:story"]').should('be.visible');
      });
  });

  it('Should validate title is required field if missing', () => {
   cy.get('[data-testid="modal:issue-create"]').within(() => {
   cy.get('button[type="submit"]').click();
   cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});

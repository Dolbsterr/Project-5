const issueTitle = "This is an issue of type: Task."; 
const issueDetailModal = '[data-testid="modal:issue-details"]';
const backlogList = '[data-testid="board-list:backlog"]';
const issuesList = '[data-testid="list-issue"]';
const deleteButton = '[data-testid="icon:trash"]';
const deleteButtonName = "Delete issue";
const confirmationPopup = '[data-testid="modal:confirm"]';
const cancelDeletionButtonName = "Cancel"; 


function clickDeleteButtonIcon() {
  cy.get(deleteButton).click();
}

function confirmDeletion() {
  cy.contains(deleteButtonName).click();
}


function cancelDeletion() {
  cy.contains(cancelDeletionButtonName).click(); 
}

describe("Issue delete", () => {
  beforeEach(() => {
    cy.visit("/"); 
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`); 
    cy.contains(issueTitle).click(); 
    cy.get(issueDetailModal).should("be.visible"); 
  });

  it("Should delete an issue and check if it was successful", () => {
    clickDeleteButtonIcon(); 
    cy.get(confirmationPopup).should("be.visible"); 
    confirmDeletion(); 
    cy.get(confirmationPopup).should("not.exist"); 
    cy.get(backlogList).within(() => {
      cy.get(issuesList).should("not.contain", issueTitle); 
    });
  });

  it("Should Cancel the deletion process", () => {
    clickDeleteButtonIcon();
    cy.get(confirmationPopup).should("be.visible"); 
    cancelDeletion(); 
    cy.get(confirmationPopup).should("not.exist"); 
    cy.get(issueDetailModal).should("be.visible"); 
    cy.get(backlogList).within(() => {
      cy.get(issuesList).should("contain", issueTitle);
    });
  });
});

class CommentsIssueModal {
    constructor() {
        this.modalSelector = '[data-testid="modal:issue-details"]';
        this.commentInputSelector = 'textarea[placeholder="Add a comment..."]';
        this.commentSaveButtonSelector = 'button:contains("Save")';
        this.issueCommentSelector = '[data-testid="issue-comment"]';
        this.confirmDeleteButtonSelector = '[data-testid="modal:confirm"] button:contains("Delete comment")';
    }


    getIssueDetailsModal() {
        return cy.get(this.modalSelector);
    }

    addComment(newComment) {
        this.getIssueDetailsModal().within(() => {
          cy.contains("Add a comment...").click();
          cy.get(this.commentInputSelector).type(newComment);
          cy.contains("button", "Save").click().should("not.exist");
          cy.contains("Add a comment...").should("exist");
          cy.get(this.issueCommentSelector).should("contain", newComment);
        });
      } 


    
    verifyCommentExists(comment) {
        this.getIssueDetailsModal().within(() => {
            cy.contains('Add a comment...').should('exist');
            cy.get(this.issueCommentSelector).should('contain', comment);
        });
    }

    editComment(newComment, updatedComment) {
        this.getIssueDetailsModal().within(() => {
          cy.get(this.issueCommentSelector)
            .first()
            .contains("Edit")
            .click()
            .should("not.exist");
    
          cy.get(this.commentInputSelector)
            .should("contain", newComment)
            .clear()
            .type(updatedComment);
    
          cy.contains("button", "Save").click().should("not.exist");
    
          cy.get(this.issueCommentSelector)
            .should("contain", "Edit")
            .and("contain", updatedComment);
        });
      }
   

    
    verifyCommentEdited(updatedComment) {
        this.getIssueDetailsModal().within(() => {
            cy.get(this.issueCommentSelector)
                .should('contain', 'Edit')
                .and('contain', updatedComment);
        });
    }

    
    deleteComment() {
        this.getIssueDetailsModal()
            .find(this.issueCommentSelector)
            .contains('Delete')
            .click();
        cy.get(this.confirmDeleteButtonSelector).click().should('not.exist');
    }

    
    verifyCommentDeleted() {
        this.getIssueDetailsModal()
            .find(this.issueCommentSelector)
            .should('not.exist');
    }
}


export default CommentsIssueModal;

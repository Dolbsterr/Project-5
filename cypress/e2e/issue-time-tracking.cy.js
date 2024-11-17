describe("Time tracking functionality testing", () => {

    // Constants
    const selectors = {
        backLogList: '[data-testid="board-list:backlog"]',
        inputFieldTime: 'input[placeholder="Number"]',
        timeTrackingButton: '[data-testid="icon:stopwatch"]',
        timeTrackingModal: '[data-testid="modal:tracking"]',
        closeIcon: '[data-testid="icon:close"]',
        doneButton: 'button', 
    };

    const issueDetails = {
        issueTitle: 'Who is the real Batman?',
        issueDescription: 'Kert Is a real Batman',
        issueCreatedConfirmation: 'Issue has been successfully created.',
    };

    const timeTrackingValues = {
        estimatedTime: '9',
        estimatedTimeUpdated: '18',
        loggedTime: '2',
        remainingTime: '5',
        loggedTimeUpdated: '3',
        remainingTimeUpdated: '4',
        estimatedTimeText: 'h estimated',
        loggedTimeText: 'h logged',
        remainingTimeText: 'h remaining',
    };

    const messages = {
        noTimeLogged: 'No time logged',
    };

    
    const openIssue = () => cy.get(selectors.backLogList).should('be.visible').contains(issueDetails.issueTitle).click();
    const closeIssue = () => cy.get(selectors.closeIcon).first().click();
    const clickDoneButton = () => cy.contains(selectors.doneButton, 'Done').click();

    beforeEach(() => {
        cy.visit("/");
        cy.url()
            .should("eq", `${Cypress.env("baseUrl")}project/board`)
            .then((url) => {
                cy.visit(url + '/board?modal-issue-create=true');
                cy.get('[data-testid="modal:issue-create"]')
                    .within(() => {
                        cy.get('[data-testid="select:type"]').click();
                        cy.get('[data-testid="select-option:Bug"]').click();
                        cy.get(".ql-editor").type(issueDetails.issueDescription);
                        cy.get('input[name="title"]').type(issueDetails.issueTitle);
                        cy.get('[data-testid="select:userIds"]').click();
                        cy.get('[data-testid="select-option:Baby Yoda"]').click();
                        cy.get('button[type="submit"]').click();
                    });
            });
        cy.contains(issueDetails.issueCreatedConfirmation).should('be.visible');
        openIssue();
    });

    it('Should add, update and remove estimated time', () => {
        cy.contains(messages.noTimeLogged).should('be.visible');

        
        cy.get(selectors.inputFieldTime).type(timeTrackingValues.estimatedTime);
        cy.get(selectors.inputFieldTime).should('have.value', timeTrackingValues.estimatedTime);
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('be.visible');
        
        closeIssue();
        cy.reload();
        openIssue();
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('be.visible');

        
        cy.get(selectors.inputFieldTime).clear().type(timeTrackingValues.estimatedTimeUpdated);
        cy.get(selectors.inputFieldTime).should('have.value', timeTrackingValues.estimatedTimeUpdated);
        cy.contains(`${timeTrackingValues.estimatedTimeUpdated}${timeTrackingValues.estimatedTimeText}`).should('be.visible');
        
        closeIssue();
        cy.reload();
        openIssue();
        cy.contains(`${timeTrackingValues.estimatedTimeUpdated}${timeTrackingValues.estimatedTimeText}`).should('be.visible');

        
        cy.get(selectors.inputFieldTime).clear();
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('not.exist');
        cy.contains(`${timeTrackingValues.estimatedTimeUpdated}${timeTrackingValues.estimatedTimeText}`).should('not.exist');
        cy.contains(messages.noTimeLogged).should('be.visible');
        
        closeIssue();
        cy.reload();
        openIssue();
        cy.contains(messages.noTimeLogged).should('be.visible');
    });

    it('Should add, update and remove logged time values', () => {
        
        cy.get(selectors.inputFieldTime).type(timeTrackingValues.estimatedTime);
        cy.get(selectors.inputFieldTime).should('have.value', timeTrackingValues.estimatedTime);
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('be.visible');

        cy.contains(messages.noTimeLogged).should('be.visible');
        cy.get(selectors.timeTrackingButton).click();
        cy.get(selectors.timeTrackingModal).should('be.visible')
            .within(() => {
                cy.get(selectors.inputFieldTime).eq(0).type(timeTrackingValues.loggedTime);
                cy.get(selectors.inputFieldTime).eq(1).type(timeTrackingValues.remainingTime);
                clickDoneButton();
            });
        cy.get(selectors.timeTrackingModal).should('not.exist');
        cy.contains(`${timeTrackingValues.loggedTime}${timeTrackingValues.loggedTimeText}`).should('be.visible');
        cy.contains(`${timeTrackingValues.remainingTime}${timeTrackingValues.remainingTimeText}`).should('be.visible');
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('not.exist');
        cy.contains(messages.noTimeLogged).should('not.exist');

        
        cy.get(selectors.timeTrackingButton).click();
        cy.get(selectors.timeTrackingModal).should('be.visible')
            .within(() => {
                cy.get(selectors.inputFieldTime).eq(0).type(timeTrackingValues.loggedTimeUpdated);
                cy.get(selectors.inputFieldTime).eq(1).type(timeTrackingValues.remainingTimeUpdated);
                clickDoneButton();
            });
        cy.get(selectors.timeTrackingModal).should('not.exist');
        cy.contains(`${timeTrackingValues.loggedTimeUpdated}${timeTrackingValues.loggedTimeText}`).should('be.visible');
        cy.contains(`${timeTrackingValues.remainingTimeUpdated}${timeTrackingValues.remainingTimeText}`).should('be.visible');
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('not.exist');
        cy.contains(messages.noTimeLogged).should('not.exist');

        
        cy.get(selectors.timeTrackingButton).click();
        cy.get(selectors.timeTrackingModal).should('be.visible')
            .within(() => {
                cy.get(selectors.inputFieldTime).eq(0).clear();
                cy.get(selectors.inputFieldTime).eq(1).clear();
                clickDoneButton();
            });
        cy.contains(messages.noTimeLogged).should('be.visible');
        cy.contains(`${timeTrackingValues.loggedTime}${timeTrackingValues.loggedTimeText}`).should('not.exist');
        cy.contains(`${timeTrackingValues.remainingTime}${timeTrackingValues.remainingTimeText}`).should('not.exist');
        cy.contains(`${timeTrackingValues.loggedTimeUpdated}${timeTrackingValues.loggedTimeText}`).should('not.exist');
        cy.contains(`${timeTrackingValues.remainingTimeUpdated}${timeTrackingValues.remainingTimeText}`).should('not.exist');
        cy.contains(`${timeTrackingValues.estimatedTime}${timeTrackingValues.estimatedTimeText}`).should('be.visible');
    });
});

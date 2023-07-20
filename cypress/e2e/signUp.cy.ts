import '../support/commands';

describe('SignUp student', () => {
    before(() => {
        cy.visit('http://localhost:4200/auth/login');
        cy.url().should('eq', 'http://localhost:4200/auth/login');
        cy.viewport(1460, 720);
        cy.log('before()');
    })

    it('signUp', () => {
        cy.wait(1500);
        cy.get('#signUp').click();
        cy.signUp('Ram', 'ram@yopmail.com', '123456', 'student');
        // cy.get('#btnSignUp').click();
        // cy.location('pathname').should('eq', '/auth/login');
        cy.wait(1000);
    })
})
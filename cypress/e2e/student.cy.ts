import '../support/commands';

describe('Student login', () => {

    before(() => {
        cy.viewport(1460, 720);
        cy.log('before()');
    })

    it('student-login', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#heading').should('have.text', ' Welcome to Login ');
        cy.get('#btnLogin').click();
        cy.get('#emailErrorMsg').should('have.text', 'Enter valid email address');
        cy.get('#passwordErrorMsg').should('have.text', 'Enter valid password');
        cy.login('vishalv.tagline@gmail.com', '123456');
        cy.get('#reload').click();
        cy.wait(2500);
        cy.get('#showProfile').click();
        cy.location('pathname').should('eq', '/student/dashboard/showProfile')
        cy.request('GET', 'https://examination.onrender.com/student/getStudentDetail').should((res: any) => {
            expect(res.status).to.eq(200);
        });
        cy.get('#btnEditProfile').click();
        cy.get('#studentName').clear();
        cy.get('#studentName').type('Vishal Variya');
        cy.get('#onUpdate').click();
        cy.request('PUT', 'https://examination.onrender.com/student/studentProfile', {
            name: 'Vishal Variya'
        }).should((res: any) => {
            expect(res.status).to.eq(200);
        });
        cy.get('#showExam').click();
        cy.location('pathname').should('eq', '/student/dashboard/showExam');
        cy.request('GET', 'https://examination.onrender.com/student/studentExam').should((res: any) => {
            expect(res.status).to.eq(200);
        });
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').type('Gujarati for 8 std');
        cy.wait(1500);
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').clear();
        cy.get('#showExam').click();
        cy.location('pathname').should('eq', '/student/dashboard/showExam');
        cy.request('GET', 'https://examination.onrender.com/student/studentExam').should((res: any) => {
            expect(res.status).to.eq(200);
        });
        cy.get(':nth-child(2) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').type('vishalv.tagline+teacher@gmail.com');
        cy.wait(1500);
        cy.get(':nth-child(2) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').clear();
        cy.get('#showExam').click();
        cy.location('pathname').should('eq', '/student/dashboard/showExam');
        for (let i = 1; i <= 5; i += 1) {
            cy.get(`:nth-child(${i}) > :nth-child(3) > #view`).click()
            cy.wait(2000);
            cy.get('#showExam').click();
        }
        for (let i = 1; i <= 5; i += 1) {
            cy.wait(1500);
            cy.get(`.p-paginator-pages > :nth-child(${i})`).click();
        }
        cy.wait(2000);
        cy.get(':nth-child(5) > :nth-child(3) > #view').click();
        cy.wait(2000);
        cy.get('.justify-content-between > :nth-child(2) > .btn').click();
        cy.get('.p-confirm-dialog-accept').click();
    })
})
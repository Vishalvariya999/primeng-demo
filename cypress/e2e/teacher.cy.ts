import '../support/commands';

describe('Teacher login', () => {

    before(() => {
        cy.viewport(1460, 720);
        cy.log('before()');
    })

    it('teacher-login', () => {
        cy.visit('http://localhost:4200/auth/login');
        cy.get('#heading').should('have.text', ' Welcome to Login ');
        cy.get('#btnLogin').click();
        cy.get('#emailErrorMsg').should('have.text', 'Enter valid email address');
        cy.get('#passwordErrorMsg').should('have.text', 'Enter valid password');
        cy.login('vishalv.tagline+teacher@gmail.com', '123456');
        cy.get('#reload').click();
        cy.wait(2000);
        cy.get('#showStudents').click();
        cy.request('GET', 'https://examination.onrender.com/dashboard/Teachers').should((res: any) => {
            expect(res.status).to.eq(200);
        })
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').type('Vishal Variya');
        cy.wait(1500);
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').clear();
        cy.get(':nth-child(2) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').type('vishalv.tagline@gmail.com');
        cy.wait(1500);
        cy.get(':nth-child(2) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').clear();
        cy.get('.p-fluid > .p-inputwrapper > .p-dropdown > .p-dropdown-trigger').click();
        cy.get('[ng-reflect-label="Active"] > .p-ripple').click();
        cy.get(':nth-child(1) > :nth-child(4) > #View').click();
        cy.get('#viewStudentDetail').click();
        cy.wait(1500);
        cy.get('#viewExam').click();
        cy.get(':nth-child(1) > :nth-child(4) > .btn-primary').click();
        cy.wait(1500);
        cy.get('#viewExam').click();
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').type('Angular 14');
        cy.wait(1500);
        cy.get(':nth-child(1) > p-columnfilter.p-element > .p-column-filter > .p-fluid > .p-inputtext').clear();
        cy.get(':nth-child(1) > :nth-child(4) > .btn-primary').click();
        cy.get('#viewExam').click();
        cy.wait(1000);
        cy.get(':nth-child(1) > :nth-child(4) > .btn-success').click();
        cy.wait(1000);
        cy.get('.p-float-label > .p-inputtext').type('Angular 14');
        cy.get('.p-chips > .p-inputtext').type('10 Miniute{enter}');
        cy.get('[style="display: inline;"]').click();
        cy.get(':nth-child(1) > :nth-child(4) > .btn-danger').click();
        cy.get('.p-confirm-dialog-reject').click();
        cy.wait(1500);
        cy.get('#viewExam').click();
        cy.request('GET', 'https://examination.onrender.com/dashboard/Teachers/viewExam').should((res: any) => {
            expect(res.status).to.eq(200);
        })
        cy.get('#createExam').click();
        cy.get('.p-float-label > .p-inputtext').type('Maths');
        cy.get('.p-chips > .p-inputtext').type('10Miniute{enter}');
        // LOOP 
        cy.get('.p-inputgroup.mb-2 > .p-inputtext').type('Addition in two numbers : 10 and 20');
        cy.get(':nth-child(1) > :nth-child(1) > .p-inputgroup > .p-inputtext').type('70');
        cy.get('.mt-1 > :nth-child(1) > :nth-child(2) > .p-inputgroup > .p-inputtext').type('30');
        cy.get(':nth-child(2) > :nth-child(1) > .p-inputgroup > .p-inputtext').type('50');
        cy.get(':nth-child(2) > :nth-child(2) > .p-inputgroup > .p-inputtext').type('87');
        cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .col-md-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-trigger').click();
        cy.get('[ng-reflect-label="Option 1"] > .p-ripple').click();
        cy.get('#btnAddQue').click();
        // LOOP
        const num = 14;
        for (let i = 1; i <= num; i += 1) {
            cy.get('.ng-untouched.ng-star-inserted > .col-lg-12 > .p-inputgroup.mb-2 > .p-inputtext').type('Addition in two numbers : 30 and 20');
            cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .mt-1 > :nth-child(1) > :nth-child(1) > .p-inputgroup > .p-inputtext').type('50');
            cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .mt-1 > :nth-child(1) > :nth-child(2) > .p-inputgroup > .p-inputtext').type('60');
            cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .mt-1 > :nth-child(2) > :nth-child(1) > .p-inputgroup > .p-inputtext').type('90');
            cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .mt-1 > :nth-child(2) > :nth-child(2) > .p-inputgroup > .p-inputtext').type('30');
            cy.get('.ng-invalid.ng-star-inserted > .col-lg-12 > .col-md-12 > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click();
            cy.get('[ng-reflect-label="Option 1"] > .p-ripple').click();
            if (i !== 14) {
                cy.get('#btnAddQue').click();
            }
        }
        cy.get('#btnSubmitExam').click();
        cy.request('POST', 'https://examination.onrender.com/dashboard/Teachers/Exam', {
            subjectName: 'Maths',
            questions: [
                {
                    "question": "question1",
                    "answer": "ans1",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question2",
                    "answer": "ans2",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question3",
                    "answer": "ans3",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question4",
                    "answer": "ans4",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question5",
                    "answer": "ans1",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question6",
                    "answer": "ans2",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question7",
                    "answer": "ans3",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question8",
                    "answer": "ans4",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question9",
                    "answer": "ans1",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question10",
                    "answer": "ans2",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                }, {
                    "question": "question11",
                    "answer": "ans3",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                }, {
                    "question": "question12",
                    "answer": "ans4",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question13",
                    "answer": "ans1",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question14",
                    "answer": "ans2",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                },
                {
                    "question": "question15",
                    "answer": "ans3",
                    "options": [
                        "ans1",
                        "ans2",
                        "ans3",
                        "ans4"
                    ]
                }
            ],
            notes: ['10mins exam', '10Questions']
        })
        cy.wait(1500);
        cy.get('#showStudents').click();
        cy.wait(2500);
    });
})
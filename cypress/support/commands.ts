declare namespace Cypress {
    interface Chainable {
        signUp(name: string, email: string, password: string, role: string): Chainable<string>
        login(email: string, password: string): Chainable<string>
    }
}

Cypress.Commands.add('signUp', (
    name: string,
    email: string,
    password: string,
    role: string
) => {
    cy.xpath('//h1[normalize-space()="SignUp"]').should('have.text', 'SignUp')
    cy.xpath('//input[@id="inputStudentName"]').focus()
    // cy.get('#inputStudentName').focus();
    cy.xpath('//input[@id="inputStudentName"]').blur();
    cy.wait(1500);
    cy.get('.mt-5 > .text-danger').should('contain', 'Enter valid UserName');
    cy.xpath('//input[@id="inputStudentName"]').type(name);
    cy.get('#inputStudentName').should('have.value', name);
    cy.get('#inputStudentEmail').focus();
    cy.get('#inputStudentEmail').blur();
    cy.wait(1500);
    cy.get('#inputStudentEmail').type(email);
    cy.get('#inputStudentEmail').should('have.value', email);
    cy.get('#inputStudentPassword').focus();
    cy.get('#inputStudentPassword').blur();
    cy.wait(2500);
    cy.get('#inputStudentPassword').type(password);
    cy.get('#inputStudentPassword').should('have.value', password);
    cy.get('#btnSignUp').click();
    cy.request('POST', 'https://examination.onrender.com/users/SignUp', {
        name: name,
        email: email,
        password: password,
        role: role
    }).should((res: any) => {
        expect(res.status).to.eq(200);
    });
})

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.get('#inputEmail').focus()
    cy.get('#inputEmail').blur()
    cy.wait(1500)
    cy.get('#inputEmail').type(email)
    cy.get('#inputEmail').should('have.value', email)
    cy.get('#inputPassword').focus()
    cy.get('#inputPassword').blur()
    cy.wait(1500)
    cy.get('#inputPassword').type(password)
    cy.get('#inputPassword').should('have.value', password)
    cy.get('#btnLogin').click()
    cy.request('POST', 'https://examination.onrender.com/users/Login', {
        email: email,
        password: password
    }).should((res: any) => {
        expect(res.status).to.eq(200);
    })
});

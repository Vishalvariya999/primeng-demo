describe('My first cases', () => {
    it('SignUp', () => {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#signUp').click()
        // cy.get('#btnSignUp').click()
        cy.get('#inputStudname').focus()
        cy.get('#inputStudname').blur()
        cy.get('.mt-5 > .text-danger').should('contain', 'Enter valid UserName')
        // cy.get('#inputStudname').type('vishal')
        // cy.get('#inputStudemail').type('vishalv.tagline@gmail.com')
    })
})
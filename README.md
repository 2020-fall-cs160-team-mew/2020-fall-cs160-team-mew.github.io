# TeamMew.github.io

2020 Fall CS 160 Project


## Contributing
Pull requests are not welcome :) For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Cypress Tests 

describe('Login Fail', () => {
    it('Visits Home Page', () => {
        cy.visit('http://localhost:3000/index.html')
        cy.get('a[id="signup"]').click()
        cy.get('a[id="formsignup"]').click()
        cy.get('p[id="resultsubmite"]').then(function($elem) {
        cy.log($elem.text())
        expect($elem.text()).to.equal("Error")
    })

})
})

describe('Login Success', () => {
    it('Visits Home Page', () => {
        cy.visit('http://localhost:3000/index.html')
        cy.get('a[id="signup"]').click()
        cy.get('input[id="emailsign"]').type('cypresstest@gmail.com')
        cy.get('input[id="passwordsign"]').type('cypresspass')
        cy.get('input[id="passwordsign2"]').type('cypresspass')
        cy.get('a[id="formsignup"]').click()
})
})

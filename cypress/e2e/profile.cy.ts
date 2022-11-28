/// <reference types="cypress" />

describe('login and logout must work', () => {
  it('login', () => {
    cy.visit('/profile')
    cy.wait(2000);
    cy.login()
    // cy.logout()


  })
})

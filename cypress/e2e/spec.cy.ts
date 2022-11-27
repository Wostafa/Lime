describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    cy.url().should('include','commands/actions')
    cy.get('.action-email').type('my-email').should('have.value','my-email')
  })
})
describe('logout state should be consistent in all pages', () => {
  before(()=>{
    cy.visit('/')
    cy.logout();
  });

  it('commenting should not be allowed in post', () => {
    cy.intercept('**/development/post/*').as('loading-post')
    cy.getByTest('link-feature').first().click();
    cy.wait('@loading-post')
    cy.get('button').contains(/login/i);
  })
  
  it('writing post should not be allowed in profile', () => {
    cy.get('a').contains(/profile/i).click()
    cy.getByTest('btn-login')
    cy.getByTest('btn-logout').should('not.exist');
  })
})
describe('test describe', ()=>{
  it('test function 1',()=>{
    cy.visit('/about')
    cy.title().then((t)=> console.log('title: ', t))
    const l = new RegExp('about us', 'i')
    cy.title().should('match', l)
    cy.wrap(2).should('eq', 2);
    

    it('test describe 2', ()=>{
      cy.wrap(3).should('eq', 3);
      // it('test function 2',()=>{
      //   cy.wrap(3).should('eq', 3);
      // })
    })
  })
})
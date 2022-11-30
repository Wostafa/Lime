describe('comment section should work well', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('comment should be added in post', () => {
    cy.getByTest('link-feature')
      .first()
      .then(link => {
        cy.wrap(link).click();
        cy.location('pathname', { timeout: 15000 }).should('eq', link.attr('href'));
      });
    const commentText = `test comment ${Date.now()}`;

    cy.get('textarea').type(commentText);
    cy.getByTest('btn-send').click();
    cy.contains(/comment sent/i, { timeout: 10000 });
    cy.get('textarea').should('have.value', '');
    cy.getByTest('comment')
      .last()
      .then(comment => {
        expect(comment).to.contain(commentText);
        cy.userDisplayName().then(name => {
          expect(comment).to.contain(name);
        });
      });

    // show comment button should work
    cy.reload();
    cy.wait(5000); // wait for firebase db instance to set up
    cy.get('button')
      .contains(/show comment/i)
      .as('send');
    cy.get('@send').click();
    cy.get('@send').contains(/loading comments/i);
    cy.getByTest('comment').should('have.length.above', 0);
  });
});

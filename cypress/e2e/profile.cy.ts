describe('profile', () => {
  const post = {
    title: `new post ${Date.now()}`,
    context: `new context ${Date.now()}`,
  };

  beforeEach(() => {
    cy.visit('/profile');
    cy.login();
    cy.getByTest('loading').should('exist');
    cy.getByTest('loading', { timeout: 7000 }).should('not.exist');
    // write post
    cy.getByTest('input-title').type(post.title);
    cy.get('.ce-paragraph').then(editor => {
      editor.text(post.context);
    });
  });

  it('previewing post should work', () => {
    // make preview
    cy.getByTest('btn-preview').click();
    cy.getByTest('notify-preview', { timeout: 10000 })
      .find('a')
      .then(link => {
        cy.wrap(link).invoke('removeAttr', 'target').click();
      });
    // check preview
    cy.location('pathname', { timeout: 10000 }).should('include', '/post/');
    cy.title().should('match', new RegExp(post.title, 'i'));
    cy.getByTest('preview-bar').should('exist');
    cy.contains(post.context);
  });

  it('drafting post should work', () => {
    // save
    cy.getByTest('btn-draft').click();
    cy.contains(/saved/i);
    cy.reload();
    // check saved draft
    cy.getByTest('loading').should('exist');
    cy.getByTest('loading', { timeout: 7000 }).should('not.exist');
    cy.getByTest('input-title').should('have.value', post.title);
  });

  it('publishing post should work', () => {
    // publish post
    cy.getByTest('btn-publish').click();
    cy.contains(/published/i, { timeout: 7000 });
    cy.location('pathname', { timeout: 13000 }).should('include', '/post/');
    cy.title({ timeout: 8000 }).should('match', new RegExp(post.title, 'i'));
    cy.getByTest('preview-bar').should('not.exist');
    cy.contains(post.context);

    // check published post exist in user's posts
    cy.go('back');
    cy.getByTest('user-posts', { timeout: 7000 }).find('li').first().as('publishedPost');
    cy.get('@publishedPost')
      .find('a')
      .then(link => {
        console.log('Link: ', link.get());
        expect(link.text()).to.match(new RegExp(post.title, 'i'));
        // store link before removing it
        const publishedUrl = link.attr('href');
        // remove post
        cy.get('@publishedPost').find('button').click();
        cy.contains(/post deleted/i, { timeout: 10000 });
        /* after removing post, now '@publishedPost refers to a new li,
       so to be clear i query again */
        cy.getByTest('user-posts').find('a').first().contains(new RegExp(post.title, 'i')).should('not.exist');
        cy.visit(publishedUrl);
        cy.contains('404', { timeout: 10000 });
      });
  });

  it('user displayName should be shown in profile', ()=>{
    cy.userDisplayName().then(displayName=>{
      cy.contains(displayName)
    })
  })
});

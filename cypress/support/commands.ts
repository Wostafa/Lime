/// <reference types="cypress" />
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { app } from '../../lib/firebase';
require('dotenv').config({ path: '.env.local' });
//
const auth = getAuth(app);

Cypress.Commands.add('test', function (value: number): Promise<number> {
  console.log('first command');
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('timed out');
      resolve(value * 2);
    }, 5000);
  });
});

Cypress.Commands.add('getByTest', (selector: string, ...args: any) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('login', (): Promise<void> => {
  if (auth.currentUser) {
    cy.log('User already logged in: ', auth.currentUser.email);
    return;
  }
  cy.log('User is not logged in, logging...');
  return new Promise((resolve, reject) => {
    cy.task('createCustomToken').then(token => {
      signInWithCustomToken(auth, token)
        .then(userCredential => {
          cy.log(`user logged in with custom token: ${userCredential.user.email}`);
          console.log('::> user logged in with custom token: ', userCredential);
          resolve();
        })
        .catch(e => {
          reject();
          console.log('::> failed to login with custom token: ', e);
        });
    });
  });
});

Cypress.Commands.add('logout', () => {
  if (!auth.currentUser) {
    cy.log('no user is logged in');
    return;
  }
  cy.log('logging out...');
  auth.signOut();
});

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

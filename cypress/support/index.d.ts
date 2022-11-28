/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getByTest(selector:string, ...args:any) : Chainable<JQuery<HTMLElement>>;
      loginByGoogleApi():void;
      login(): Chainable<void>,
      logout():void,
      task(event: 'createCustomToken'): Chainable<string>,
      task(event: 'test'): null,
    }
  }
}

export {}
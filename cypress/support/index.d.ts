/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      getByTest(selector: string, ...args: any): Chainable<JQuery<HTMLElement>>;
      loginByGoogleApi(): void;
      login(): void;
      logout(): void;
      userDisplayName(): Chainable<string>;
      task(event: 'createCustomToken'): Promise<string>;
      task(event: 'test'): null;
      test(value: number): Promise<number>;
    }
  }
}

export {};

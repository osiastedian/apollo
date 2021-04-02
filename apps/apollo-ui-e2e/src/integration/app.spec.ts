describe('apollo-ui', () => {
  beforeEach(() => cy.visit('/'));

  it('should load transcript', () => {
    cy.intercept('/assets/transcripts/transcript-1.json').as('transcript');
    cy.wait('@transcript');
  });
});

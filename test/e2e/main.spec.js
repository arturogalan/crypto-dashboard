describe('Main', () => {
  it('should display header text, a table column, and a crypto name', () => {
    cy.visit('/')
    cy.contains('span', 'Your cryptocurrencies dashboard !')
    cy.contains('th', 'Ranking')
    cy.contains('div', 'Bitcoin')
  })
  it('should navigate to a crypto detail accordingly', () => {
    cy.visit('/')
    cy.contains(/Bitcoin/).click();
    cy.location('href').should('include', 'currencies/bitcoin')
  })
})
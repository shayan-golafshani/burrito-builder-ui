describe('Order form functionality', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        fixture: 'orders.json'
        });
        cy.visit('http://localhost:3000/')
    })

    it('Should contain header with zenbox text' , ()=> {
        cy.contains('h1', 'Burrito Builder');
    })

    it('Should be able to type into an input box', () => {
        cy.get('input').type('Shayan')
        cy.get('input').should('have.value', "Shayan")
      })

    it('Should be able to click a bunch of the buttons and have the click ingred buttons show up on DOM', () => {
        cy.get('[name="beans"]').click()
        cy.get('[name="steak"]').click()
        cy.get('[name="guacamole"]').click()
        cy.get('p').should('contain', 'beans, steak, guacamole')
    })

    it('Should be able to click a bunch of the buttons and have the clear button clear off the dom', () => {
        cy.get('[name="beans"]').click()
        cy.get('[name="steak"]').click()
        cy.get('[name="guacamole"]').click()
        cy.get(':nth-child(14)').click()
        cy.get('p').should('contain', 'Order:')
    })

    it('Should have submit button disabled if no ingreds seleceted', () => {
        cy.get('input').type('Shayan')
        cy.get('[disabled=""]').should('be.disabled')
    })

    it('Should have submit button disabled if no name is entered', () => {
        cy.get('[name="beans"]').click()
        cy.get('[name="steak"]').click()
        cy.get('[name="guacamole"]').click()
        cy.get('[disabled=""]').should('be.disabled')
    })

    it("Should show a new card for a recently entered order", () => {
        cy.get('input').type('Shayan');
        cy.get('[name="beans"]').click()
        cy.get('[name="steak"]').click()
        cy.get('[name="guacamole"]').click()
        cy.get(':nth-child(16)').click()
        cy.get('section > :nth-child(3)').should('contain', 'Shayan')
        cy.get('section > :nth-child(3)').should('contain', 'beans')
    })
});
describe('Main app page', () => {
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
    
})
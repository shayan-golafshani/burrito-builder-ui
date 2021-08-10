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

    it('Should be able to show a new post', () => {
        cy.visit('http://localhost:3000/')
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
        statusCode: 201,
        body: {
          name: "Leta",
          ingredients: ['sofritas']
        }
      })
            cy.get('input').type('Leta')
            cy.get('[name="sofritas"]').click();
            cy.get(':nth-child(16)').click()

            cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
            statusCode: 200,
            fixture: 'orders2.json'
            });
            cy.visit('http://localhost:3000');
            
    });
});
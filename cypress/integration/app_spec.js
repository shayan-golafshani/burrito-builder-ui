describe('Main app page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        fixture: 'orders.json'
        })
        .visit('http://localhost:3000/')
    })

    it('Should contain header with zenbox text' , ()=> {
        cy.contains('h1', 'Burrito Builder');
    })

    it('Should be able to show a new post', () => {
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
            statusCode: 201,
            body: {
              id:3,
              name: "Leta",
              ingredients: ['sofritas']
            }
            })
            cy.get('input').type('Leta')
            cy.get('[name="sofritas"]').click();
            cy.get('form > :nth-child(5)').click()

            cy.get('section > :nth-child(3)').should('contain', 'Leta')
            cy.get('section > :nth-child(3)').should('contain', 'sofritas')
    });
});
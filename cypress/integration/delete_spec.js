describe('Delete app spec', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
        statusCode: 200,
        fixture: 'orders3.json'
        });

        cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/1', {
        statusCode: 204,
        });

        cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/2', {
        statusCode: 204,
        });

        cy.visit('http://localhost:3000/')
    })

    it("Should be able to delete the orders from the page", () => {
        cy.contains('Delete Order').click({multiple:true})
        //cy.contains('Delete Order').click()
    })

    it("Should be able to delete the orders from the page", () => {
        cy.get('#2').click()
        cy.get('#2').should('not.exist')
        //cy.contains('Delete Order').click()
    })

})
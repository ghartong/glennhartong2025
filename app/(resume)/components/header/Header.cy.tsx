import React from 'react'
import Header from './Header'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header />)
    cy.get('h1')
      .should('have.text', 'Glenn Hartong')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})
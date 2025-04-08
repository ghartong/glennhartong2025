import React from 'react'
import ReddogHeader from './ReddogHeader'

describe('<ReddogHeader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReddogHeader />)
    cy.get('h1')
      .should('have.text', 'Reddog')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})
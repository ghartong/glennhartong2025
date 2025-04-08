import React from 'react'
import ReddogLogo from '../../../reddog/components/logo/ReddogLogo'

describe('<ReddogLogo />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ReddogLogo />)
  })
})
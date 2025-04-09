import ReddogLogo from '../logo/ReddogLogo'
import Navigation from '../navigation/Navigation'
import header from './header.module.css'

function ReddogHeader() {
    return (
      <header>
        <ReddogLogo />
        <h1 className={header.red} data-id="reddog-h1">Reddog</h1>
        <Navigation />
      </header>
    );
  }

export default ReddogHeader;
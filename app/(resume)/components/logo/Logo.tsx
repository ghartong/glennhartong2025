import header from '../header/header.module.css'

function Logo() {
    return (
        <div className={header.logo}>
            <span role="presentation" aria-label='logo'>&#x24BC;</span>
        </div>
    );
}

export default Logo;
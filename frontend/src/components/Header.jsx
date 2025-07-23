import { Link } from "react-router-dom"
import logo from "../static/img/logo.png"

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" id="navIndex">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src={logo} alt="logo" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link active text-light" aria-current="page" href="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light" aria-current="page" href="/garSonicInfo">¿Qué es GarSonic?</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light" aria-current="page" href="/rols">Roles</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link btnIngresar" aria-current="page" href="/loginPage">Ingresar</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Header
import { Link } from "react-router-dom"
import logo from "../static/img/logo.png"
import { useState } from "react"

const Header = () => {

    const[openNav,setOpenNav] = useState(false)

    function handleOpenNav(){
        setOpenNav(true)
    }

    function handleCloseNav(){
        setOpenNav(false)
    }

return (
    <header className="xl:relative lg:relative w-full h-[100px] flex justify-between bg-black items-center lg:pl-[50px] xl:pr-[50px] pl-[20px] pr-[20px] shadow-[10px_25px_25px_rgba(0,0,0,0.50)]">
            <div>
                    <a href="/"><img className="w-[100px]" src={logo} alt="logo" /></a>
            </div>

            <button className="lg:hidden xl:hidden border-none bg-purple-500 w-[50px] h-[50px] flex justify-center items-center rounded-[10px]" onClick={handleOpenNav}>
                    <i className="bi bi-list text-white text-[25px]"></i>
            </button>

            <nav className={`${openNav ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"} transition-all duration-300 ease-in-out text-white list-none fixed top-0 right-0 w-[200px] p-[15px] h-[100vh] bg-black

            lg:static lg:flex lg:flex-row lg:gap-[30px] lg:transition-none lg:opacity-100 lg:h-auto lg:w-auto lg:bg-transparent lg:translate-x-0
            xl:static xl:flex xl:flex-row xl:gap-[30px] xl:bg-transparent xl:transition-none xl:opacity-100 xl:translate-x-0 `}>

                    <ul className="flex flex-col justify-center items-center mt-[150px] gap-[20px] xl:flex-row xl:mt-[0px]">
                            <button className="lg:hidden xl:hidden border-none bg-purple-500 w-[50px] h-[50px] flex justify-center items-center rounded-[10px]" onClick={handleCloseNav}>
                                    <i className="bi bi-x-lg text-white text-[25px]"></i>
                            </button>
                            <li ><Link className="text-[13px] lg:text-[16px] xl:text-[16px] p-[8px] hvr-bounce-to-bottom" to="/">Inicio</Link></li>
                            <li ><Link className="text-[13px] lg:text-[16px] xl:text-[16px] p-[8px] hvr-bounce-to-bottom" to="/garSonicInfo">¿Qué es GarSonic?</Link></li>
                            <li ><Link className="text-[13px] lg:text-[16px] xl:text-[16px] p-[8px] hvr-bounce-to-bottom" to="/rols">Roles</Link></li>
                            <li ><Link className="text-[13px] lg:text-[16px] xl:text-[16px] p-[8px] bg-white text-black rounded-xl" to="/ingresar">Ingresar</Link></li>
                    </ul>

            </nav>
    </header>
)
}

export default Header
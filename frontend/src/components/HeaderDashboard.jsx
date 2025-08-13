import { useState, useEffect } from "react";
import logo from "../static/img/logo.png";
import { UseAuth } from "../context/useAuth.js";

const HeaderDashboard = () => {
    const [userData, setUserData] = useState({});
    const [openNav, setOpenNav] = useState(false);

    const { fetchUser, logout } = UseAuth();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const res = await fetchUser();
                setUserData(res.data.user);
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchUserData();
    }, []);

    return (
        <>

            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-purple-500 w-[50px] h-[50px] flex justify-center items-center rounded-[10px]"
                onClick={() => setOpenNav(true)}
            >
                <i className="bi bi-list text-white text-[25px]"></i>
            </button>


            <header
                className={`text-white h-screen w-[300px] p-[25px] bg-gradient-to-b from-purple-900 to-black shadow-[10px_25px_25px_rgba(0,0,0,0.50)] fixed top-0 left-0 transform transition-transform duration-300 z-40 ${openNav ? "translate-x-0 headerDashboard" : "-translate-x-full"} lg:translate-x-0`}>

                    <button
                        className="lg:hidden absolute top-4 right-4 bg-red-500 w-[40px] h-[40px] flex justify-center items-center rounded-[8px]"
                        onClick={() => setOpenNav(false)}>
                        <i className="bi bi-x text-white text-[20px]"></i>
                    </button>

                    <nav>
                        <ul className="flex flex-col items-center gap-[45px]">
                            <li><img className="w-[200px]" src={logo} alt="logo app" /></li>
                            <li>
                                <a className="w-[150px] p-[10px] text-purple-500 font-bold rounded-2xl bg-white cursor-pointer hover:bg-purple-700 hover:text-white" href="/mis-listas">
                                    Mis listas
                                </a>
                            </li>
                            <li>
                                <form className="flex flex-col items-center justify-center gap-[15px] mt-[25px]" method="post">
                                    <input
                                        className="w-[200px] p-[10px] text-white border-2 border-white"
                                        type="text"
                                        placeholder="Ingrese el artista"
                                    />
                                    <button
                                        className="w-[150px] p-[10px] text-white bg-purple-500 cursor-pointer hover:bg-purple-700 rounded-2xl"
                                        type="submit">
                                        Buscar
                                    </button>
                                </form>
                            </li>
                            <li className="flex flex-col items-center gap-[15px]">
                                <img
                                    className="w-[100px] h-[100px] rounded-full object-cover border-2 border-white"
                                    src={`http://localhost:3000/uploads/${userData?.profilePhoto}`}
                                    alt={`foto de perfil de ${userData?.username}`}
                                />
                                <span className="font-bold">{userData?.username}</span>
                                <button
                                    className="w-[150px] p-[10px] text-white font-bold rounded-2xl bg-red-500 cursor-pointer hover:bg-purple-700 hover:text-white"
                                    onClick={logout}>
                                    Cerrar sesión
                                </button>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    );
};

export default HeaderDashboard;
import LoginOption from "../components/LoginOption"
import { motion } from "framer-motion"
import BackButton from "../components/BackButton"
import { Link } from "react-router-dom"

const LoginOptionPage = () => {
  return (
    <main className="w-full h-screen bg-gradient-to-b from-purple-900 to-black">

      <BackButton to="/" />

      <div className="w-full h-[250px] md:h-[200px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h1 className="w-[340px] bg-black text-center md:text-[30px] md:w-[650px] text-white p-[10px] border-2 border-white shadow-[5px_8px_15px_rgba(0,0,0,0.80)] mt-[10px] xl:text-[40px] text-[25px] lg:text-[50px] lg:mt-[60px] lg:w-[800px] lg:p-[10px]" >¿Como quieres ingresar?</h1>
        </motion.div>
      </div>
      <div className="flex flex-col h-[400px] md:h-[400px] lg:h-[500px] xl:h-[350px] 2xl:h-[500px] gap-[40px] items-center justify-center lg:flex-row lg:gap-[70px] md:flex-row md:gap-[60px]">

        <Link to="/loginUsuario" className="decoration-none">
          <LoginOption
            icono={"bi bi-person-circle"}
            rol="Usuario"
          />
        </Link>

        <Link to="/loginArtista" className="decoration-none">
          <LoginOption
            icono={"bi bi-mic-fill"}
            rol="Artista"
          />
        </Link>

      </div>
    </main>
  )
}

export default LoginOptionPage
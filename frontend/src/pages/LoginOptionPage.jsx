import LoginOption from "../components/LoginOption"
import { motion } from "framer-motion"

const LoginOptionPage = () => {
  return (
    <main className="comenzar-container">
      <div className="tituloComenzar">
        <motion.div
          initial={{ opacity: 0, y:70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h1>¿Como quieres ingresar?</h1>
        </motion.div>
      </div>
      <div className="opcionesIngreso">

        <a href="/loginUsuario">
          <LoginOption
           icono={"bi bi-person-circle"}
           rol="Usuario"
          />
        </a>

        <a href="/loginArtista">
          <LoginOption
           icono={"bi bi-mic-fill"}
           rol="Artista"
          />
        </a>
        
      </div>
    </main>
  )
}

export default LoginOptionPage
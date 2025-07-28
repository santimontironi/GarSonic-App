import Header from "../components/Header";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <Header/>
      <main className="index-container">
        <motion.div
          initial={{ opacity: 0, y:70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="contentIndex">
            <h1 className="tituloIndex">Te damos la bienvenida a GarSonic</h1>
            <p className="introIndex">Tu nueva forma de escuchar música está acá. Descubrí artistas, explorá géneros y disfrutá de tus canciones favoritas en un solo lugar. GarSonic es una experiencia musical simple, rápida y sin distracciones. ¿Listo para empezar? Dale play y sentí la música.</p>
            <div className="btnIndexBox">
              <a className="btnIndex" href="/ingresar">Comenzar</a>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default Index
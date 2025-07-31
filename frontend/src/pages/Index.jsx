import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <main className="index-container w-full h-screen bg-gradient-to-r from-purple-900 to-purple-500">
        <motion.div
          initial={{ opacity: 0, y:70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="contentIndex text-white flex flex-col gap-3 h-[800px] w-full justify-center items-center">
            <h1 className="tituloIndex text-center text-[45px] xl:text-[75px]">Te damos la bienvenida a GarSonic</h1>
            <p className="w-[380px] text-center xl:text-[20px] xl:w-[850px]">Tu nueva forma de escuchar música está acá. Descubrí artistas, explorá géneros y disfrutá de tus canciones favoritas en un solo lugar. GarSonic es una experiencia musical simple, rápida y sin distracciones. ¿Listo para empezar? Dale play y sentí la música.</p>
            <div className="mt-3">
              <a className="bg-white p-[10px] text-purple-700 hover:shadow-[4px_5px_6px_rgba(0,0,0,0.50)] rounded-[10px] xl:rounded-[12px] xl:text-[20px]" href="/ingresar">Comenzar</a>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  )
}

export default Index
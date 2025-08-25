import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <section id="inicio" className="index-container w-full min-h-[calc(80vh-100px)] lg:h-[calc(100vh-150px)] md:h-[calc(80vh-100px)] bg-gradient-to-b from-purple-900 to-purple-700">
        <motion.div
          initial={{ opacity: 0, y:70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="contentIndex text-white flex flex-col gap-3 h-[600px] md:h-[800px] lg:h-[640px] w-full justify-center items-center">
            <h1 className="tituloIndex text-center text-[45px] md:text-[50px] xl:text-[75px]">Te damos la bienvenida a GarSonic</h1>
            <p className="w-[320px] text-center lg:text-[20px] lg:w-[850px] md:text-[18px] md:w-[600px]">Tu nueva forma de escuchar música está acá. Descubrí artistas, explorá géneros y disfrutá de tus canciones favoritas en un solo lugar. GarSonic es una experiencia musical simple, rápida y sin distracciones. ¿Listo para empezar? Dale play y sentí la música.</p>
            <div className="mt-3">
              <a className="bg-white p-[10px] text-purple-700 hover:shadow-[4px_5px_6px_rgba(0,0,0,0.50)] rounded-[10px] lg:rounded-[12px] lg:text-[20px]" href="/ingresar">Comenzar</a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Index
import { motion } from "framer-motion";

const Index = () => {
  return (
    <>
      <section id="inicio" className="index-container w-full h-screen lg:h-[calc(100vh-120px)] md:h-[calc(80vh-100px)] bg-gradient-to-b from-purple-900 to-purple-700">
        <motion.div
          initial={{ opacity: 0, y:70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="contentIndex text-white flex flex-col gap-3 h-[750px] md:h-[600px] xl:h-[500px] 2xl:h-[800px] w-full justify-center items-center">
            <h1 className="tituloIndex text-center text-[45px] xl:text-[60px] md:text-[50px] 2xl:text-[75px]">Te damos la bienvenida a GarSonic</h1>
            <p className="w-[320px] text-center xl:text-[15px] 2xl:text-[20px] lg:w-[850px] md:text-[18px] md:w-[600px]">Tu nueva forma de escuchar música está acá. Descubrí artistas, explorá géneros y disfrutá de tus canciones favoritas en un solo lugar. GarSonic es una experiencia musical simple, rápida y sin distracciones. ¿Listo para empezar? Dale play y sentí la música.</p>
            <div className="mt-3">
              <a className="bg-white p-[10px] inline-block hover:scale-110 hover:shadow-[5px_5px_10px_rgba(0,0,0,0.50)] transition duration-200 text-purple-700 rounded-[10px] lg:rounded-[12px] lg:text-[20px]" href="/ingresar">Comenzar</a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Index
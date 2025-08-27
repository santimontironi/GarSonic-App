import { motion } from "framer-motion"
import photoNosotros from "../static/img/nosotros.jpg"

const About = () => {
  return (

    <section className="h-screen lg:h-[120vh] xl:h-[110vh] 2xl:h-[85vh]w-full pb-[50px] md:pb-[0px] lg:mb-[100px] xl:mb-[0px]" id="nosotros">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >

        <div className="flex flex-col items-center justify-center h-[760px] md:flex-row md:h-[500px] lg:h-[600px] lg:w-[1000px] lg:justify-between lg:mx-auto lg:gap-[25px]">
          <figure className="w-[320px] h-[400px] md:w-[280px] md:h-[400px] bg-purple-800 relative p-4 shadow-[8px_6px_10px_rgba(0,0,0,0.70)] rounded-[8px] lg:w-[450px] lg:h-[480px]">
            <img className="w-[300px] object-cover absolute left-[-10px] rounded-[8px] lg:w-[400px] lg:left-[-20px]" src={photoNosotros} alt="Persona escuchando música" />
          </figure>
          <div className="flex flex-col items-center p-[10px]">
            <h2 className="text-[30px] font-bold text-center mt-6 lg:text-[50px]">Nuestra misión</h2>
            <p className="mt-4 text-center max-w-[400px] lg:max-w-[600px] md:text-[14px] lg:text-[17px]">
              En <span className="font-semibold text-purple-600">GarSonic</span> buscamos conectar a las personas con la música que aman.
              Nuestro objetivo es ofrecer un espacio donde artistas emergentes y consolidados
              puedan compartir su arte, y donde los usuarios encuentren playlists personalizadas,
              recomendaciones y experiencias únicas.
            </p>
            <div className="mt-5">
              <a className="inline-block bg-purple-800 p-[10px] text-white rounded-[10px] hover:scale-110 transition duration-200 lg:rounded-[12px] lg:text-[20px]" href="/ingresar">Comenzar</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center lg:pb-[0px] lg:w-[1000px] lg:mx-auto md:mt-[28px] border-t-2 border-purple-600 lg:mt-[30px]">
          <span className="text-[20px] font-bold mt-[30px]">En nuestra aplicación podrás:</span>
          <ul className="mt-[20px] list-none flex flex-col gap-[15px] lg:flex-row lg:gap-[30px] lg:mt-[40px]">
            <li className="flex items-center gap-2 bg-purple-600 text-white p-[10px] rounded-[10px]">
              <i class="bi bi-music-note text-[30px]"></i>
              Explorar miles de géneros musicales
            </li>
            <li className="flex items-center gap-2 bg-purple-600 text-white p-[10px] rounded-[10px]">
              <i class="bi bi-person-circle text-[30px]"></i>
              Conectar con tus artistas favoritos
            </li>
            <li className="flex items-center gap-2 bg-purple-600 text-white p-[10px] rounded-[10px]">
              <i class="bi bi-earbuds text-[30px]"></i>
              Crear playlists personalizadas
            </li>
          </ul>
        </div>

      </motion.div>
    </section>
  )
}

export default About
import { motion } from "framer-motion"

const LoginOption = ({icono,rol}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y:50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="w-[270px] h-auto p-[5px] flex flex-col bg-gradient-to-t rounded-2xl from-purple-900 to-purple-700 hover:border-2 hover:border-white">
          <div className="w-full h-[180px] flex items-center justify-center">
            <i className={`${icono} text-[100px] text-white`} aria-hidden="true"></i>
          </div>
          <div className="flex flex-col justify-center items-center">
              <span className="text-white text-[20px] font-[900] mt-[15px]">{rol}</span>
          </div>
      </div>

    </motion.div>
  )
}

export default LoginOption
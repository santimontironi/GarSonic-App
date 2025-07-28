import { motion } from "framer-motion"

const LoginOption = ({icono,rol}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y:50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="loginOption">
          <div className="iconoContainer">
            <i className={icono} aria-hidden="true"></i>
          </div>
          <div className="loginOption-content">
              <span className="rol">{rol}</span>
          </div>
      </div>

    </motion.div>
  )
}

export default LoginOption
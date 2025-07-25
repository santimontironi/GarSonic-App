const LoginOption = ({imagen,rol,acciones}) => {
  return (
    <div className="loginOption">
        <img src={imagen} alt="icono-RolDeUsuario"/>
        <div className="loginOption-content">
            <span>{rol}</span>
            <ul>
                {acciones.map((index,accion) => (
                    <li key={index}>{accion}</li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default LoginOption
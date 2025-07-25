const LoginOption = ({icono,rol}) => {
  return (
    <div className="loginOption">
        <div className="iconoContainer">
          <i className={icono} aria-hidden="true"></i>
        </div>
        <div className="loginOption-content">
            <span className="rol">{rol}</span>
        </div>
    </div>
  )
}

export default LoginOption
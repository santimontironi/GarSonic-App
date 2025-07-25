import LoginOption from "../components/LoginOption"

const StartPage = () => {
  return (
    <main className="comenzar-container">
      <div className="tituloComenzar">
        <h1>¿Como quieres ingresar?</h1>
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

export default StartPage
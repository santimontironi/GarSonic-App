import Header from "../components/Header";

const Index = () => {
  return (
    <>
      <Header/>
      <main className="index-container">
        <div className="contentIndex">
          <h1 className="tituloIndex">Te damos la bienvenida a GarSonic</h1>
          <p className="introIndex">Tu nueva forma de escuchar música está acá. Descubrí artistas, explorá géneros y disfrutá de tus canciones favoritas en un solo lugar. GarSonic es una experiencia musical simple, rápida y sin distracciones. ¿Listo para empezar? Dale play y sentí la música.</p>
          <div className="btnIndexBox">
            <a className="btnIndex" href="/comenzar">Comenzar</a>
          </div>
          
        </div>
      </main>
    </>
  )
}

export default Index
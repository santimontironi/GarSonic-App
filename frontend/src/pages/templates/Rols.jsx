import RolCard from "../../components/layout/RolCard";

const Rols = () => {
    return (
        <div className="w-full h-[740px] sm:min-h-[850px] md:min-h-[750px] lg:min-h-[700px] xl:min-h-[650px] 2xl:min-h-[600px] bg-gradient-to-b from-purple-900 to-black xl:mt-[40px]" id="rols">
            <div className="h-[150px] sm:h-[180px] md:h-[200px] flex justify-center items-center">
                <h1 className="text-white text-[28px] sm:text-[32px] md:text-[40px] lg:text-[46px] xl:text-[50px] 2xl:text-[54px] font-extrabold drop-shadow-lg text-center">
                    Nuestros roles
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-stretch max-w-[320px] sm:max-w-[400px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1200px] m-auto gap-[16px] sm:gap-[18px] md:gap-[20px] lg:gap-[24px] xl:mt-[40px] 2xl:mt-[50px]">
                <RolCard
                    icon="bi bi-person-circle"
                    title="Usuario"
                    description="Explora, escucha y crea listas personalizadas con facilidad."
                    actions={["Registrarse", "Explorar", "Gestionar playlists"]}
                />
                <RolCard
                    icon="bi bi-music-note-beamed"
                    title="Artista"
                    description="Publica tus canciones y conecta con tu audiencia."
                    actions={["Subir Canciones", "Gestionar Canciones", "Perfil Público"]}
                />
            </div>
        </div>
    );
};

export default Rols;
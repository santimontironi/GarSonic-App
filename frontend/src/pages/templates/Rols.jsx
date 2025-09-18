import RolCard from "../../components/layout/RolCard";

const Rols = () => {
    return (
        <div className="w-full h-[800px] xl:h-[700px] bg-gradient-to-b from-purple-900 to-black xl:mt-[40px]">

            
            <div className="h-[200px] flex justify-center items-center">
                <h1 className="text-white text-[32px] md:text-[40px] lg:text-[48px] font-extrabold drop-shadow-lg text-center">
                    Nuestros roles
                </h1>
            </div>

           
            <div className="flex flex-col md:flex-row justify-center items-stretch w-[1200px] m-auto gap-[10px] xl:mt-[50px]">
                <RolCard/>
                <RolCard/>
            </div>
        </div>
    );
};

export default Rols;
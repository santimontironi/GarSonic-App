import { useForm } from "react-hook-form";
import { UseAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {

    const navigate = useNavigate()

    const[correctLoginuser,setCorrectLoginUser] = useState(false)

    const[errorLoginUser,setErrorLoginUser] = useState("")

    const {signInUser} = UseAuth()

    const{register,reset,handleSubmit,formState:{errors}} = useForm()

    async function submitForm(values){
        try{
            await signInUser(values)
            setErrorLoginUser("")
            reset()
            setCorrectLoginUser(true)
        }
        catch(error){
            if(error.response?.data?.message){
                reset()
                setErrorLoginUser(error.response.data.message)
            }
        }
    }

    useEffect(() => {
        if(correctLoginuser){
            navigate('/usuario')
        }
    },[correctLoginuser,navigate])

    return (
        <main className="containerLoginUser w-full h-screen">
            
            <div className="titleLoginUser h-[200px] flex justify-center items-center">
                <h1 className="bg-black text-white text-[27px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px]">Ingreso de usuario</h1>
            </div>
            
            <div className="contentLogin flex justify-center items-center flex-col w-full h-[300px]">
                <form className="flex flex-col w-[330px] h-[300px] p-[20px] rounded-[10px]" method="post" onSubmit={handleSubmit(submitForm)}>

                    <div className="mt-5 flex flex-col">
                        <label className="text-white text-[15px]" htmlFor="identifier">Correo electrónico o nombre de usuario</label>
                        <input className="w-full p-[7px] bg-white text-black" type="text" {...register("identifier",{required:true})} />
                        {errors.user && (
                            <p className="error">El correo electrónico o nombre de usuario es requerido</p>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col">
                        <label className="text-white text-[15px]" htmlFor="password">Contraseña</label>
                        <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password",{required:true})} />
                        {errors.password && (
                            <p className="error">La contraseña es requerida</p>
                        )}
                    </div>
                    
                    <button type="submit">Iniciar sesión</button>
                </form>

                <a href="/registroUsuario">¿No tenés cuenta?</a>

                {errorLoginUser && (
                    <p className="errorAuth">Error al iniciar sesión: {errorLoginUser}</p>
                )}
            </div>


        </main>
    )
}

export default LoginUser



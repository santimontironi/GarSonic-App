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
        <main className="containerLoginUser">
            
            <div className="titleLoginUser">
                <h1>Ingreso de usuario</h1>
            </div>
            
            <div className="contentLogin">
                <form method="post" onSubmit={handleSubmit(submitForm)}>

                    <div className="mb-3">
                        <label htmlFor="identifier">Correo electrónico o nombre de usuario</label>
                        <input type="text" {...register("identifier",{required:true})} />
                        {errors.user && (
                            <p className="error">El correo electrónico o nombre de usuario es requerido</p>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" {...register("password",{required:true})} />
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



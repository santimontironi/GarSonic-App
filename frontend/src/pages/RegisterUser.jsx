import { useForm } from "react-hook-form";
import { UseAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RegisterUser = () => {

  const navigate = useNavigate()

  const[correctRegister,setCorrectRegister] = useState(false)

  const[errorRegister,setErrorRegister] = useState("")
  
  const {register,handleSubmit,reset, formState:{errors}} = useForm()

  const {signUpUser} = UseAuth()

  async function submitForm(values){
    try{
      signUpUser(values)
      setCorrectRegister(true)
      setErrorRegister("")
      reset()
    }
    catch(error){
      if(error.response?.data?.message){
        setErrorRegister(error.response.data.message)
      }
    }
  }

  useEffect(() => {
    if(correctRegister){
      navigate('/loginUsuario')
    }
  },[correctRegister,navigate])

  return (
    <main className="containerRegisterUser">
      <form method="post" onSubmit={handleSubmit(submitForm)}>

        <div className="mb-3">
          <label htmlFor="name">Nombre</label>
          <input type="text" {...register("name",{required:true})} />
          {errors.name && (
            <p className="error">El nombre es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="surname">Apellido</label>
          <input type="text" {...register("surname",{required:true})} />
          {errors.name && (
            <p className="error">El apellido es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" {...register("email",{required:true})} />
          {errors.name && (
            <p className="error">El correo electrónico es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="username">Nombre de usuario</label>
          <input type="text" {...register("username",{required:true})} />
          {errors.name && (
            <p className="error">El nombre de usuario es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password">Contraseña</label>
          <input type="password" {...register("password",{required:true})} />
          {errors.name && (
            <p className="error">La contraseña es requerida</p>
          )}
        </div>
        
        <button type="submit">Crear cuenta</button>
      </form>

      {errorRegister && (
        <p className="errorRegister">Error al registrarse: {errorRegister}</p>
      )}
    </main>
  )
}

export default RegisterUser
import { useForm } from "react-hook-form";
import { UseAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const RegisterUser = () => {

  const navigate = useNavigate()

  const[correctRegister,setCorrectRegister] = useState(false)

  const[errorRegister,setErrorRegister] = useState("")

  const[file,setFile] = useState(null)
  
  const {register,handleSubmit,reset, formState:{errors}} = useForm()

  const {signUpUser} = UseAuth()

  async function submitForm(values){
    try{
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      if (file) {
        formData.append("profilePhoto", file);
      }

      await signUpUser(formData); 

      setCorrectRegister(true);
      setErrorRegister("");
      reset();
      setFile(null);
    }
    catch(error){
      if(error.response?.data?.message){
        setErrorRegister(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if(correctRegister){
      navigate('/loginUsuario')
    }
  },[correctRegister,navigate])

  return (
    <main className="containerRegisterUser min-h-screen w-full">

      <div className="titleRegisterUser">
        <h1>Registro de usuario</h1>
      </div>

      <form method="post" onSubmit={handleSubmit(submitForm)}>

        <div className="mb-3">
            <label htmlFor="profilePhoto">Foto de perfil</label>
            <input
              className="form-control"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
        </div>

        <div className="mb-3">
          <label className="label-form" htmlFor="name">Nombre</label>
          <input className="form-control" type="text" {...register("name",{required:true})} />
          {errors.name && (
            <p className="error">El nombre es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label className="label-form" htmlFor="surname">Apellido</label>
          <input className="form-control" type="text" {...register("surname",{required:true})} />
          {errors.surname && (
            <p className="error">El apellido es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label className="label-form" htmlFor="email">Correo electrónico</label>
          <input className="form-control" type="email" {...register("email",{required:true})} />
          {errors.email && (
            <p className="error">El correo electrónico es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label className="label-form" htmlFor="username">Nombre de usuario</label>
          <input className="form-control" type="text" {...register("username",{required:true})} />
          {errors.username && (
            <p className="error">El nombre de usuario es requerido</p>
          )}
        </div>

        <div className="mb-3">
          <label className="label-form" htmlFor="password">Contraseña</label>
          <input className="form-control" type="password" {...register("password",{required:true})} />
          {errors.password && (
            <p className="error">La contraseña es requerida</p>
          )}
        </div>
        
        <button className="m-auto text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px]" type="submit">Crear cuenta</button>
      </form>

      {errorRegister && (
        <p className="errorAuth">Error al registrarse: {errorRegister}</p>
      )}
    </main>
  )
}

export default RegisterUser
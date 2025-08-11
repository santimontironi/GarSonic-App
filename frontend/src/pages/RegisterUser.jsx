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

      <div className="titleRegisterUser h-[200px] flex justify-center items-center">
        <h1 className="text-white bg-[#662d91] p-[10px] text-[30px]">Registro de usuario</h1>
      </div>

      <form className="flex flex-col justify-center items-center m-auto w-[330px] h-[600px] p-[7px] border-2 border-white" method="post" onSubmit={handleSubmit(submitForm)}>

        <div className="mt-3 flex flex-col gap-[10px] w-[300px]">
            <label className="text-white" htmlFor="profilePhoto">Foto de perfil</label>
            <input
              className="bg-white text-black p-[5px]"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
        </div>

        <div className="mt-3 flex flex-col gap-[10px]">
          <label className="text-white" htmlFor="name">Nombre</label>
          <input className="w-[300px] bg-white p-[7px] text-black" type="text" {...register("name",{required:true})} />
          {errors.name && (
            <p className="error">El nombre es requerido</p>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-[10px]">
          <label className="text-white" htmlFor="surname">Apellido</label>
          <input className="w-[300px] bg-white p-[7px] text-black" type="text" {...register("surname",{required:true})} />
          {errors.surname && (
            <p className="error">El apellido es requerido</p>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-[10px]">
          <label className="text-white" htmlFor="email">Correo electrónico</label>
          <input className="w-[300px] bg-white p-[7px] text-black" type="email" {...register("email",{required:true})} />
          {errors.email && (
            <p className="error">El correo electrónico es requerido</p>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-[10px]">
          <label className="text-white" htmlFor="username">Nombre de usuario</label>
          <input className="w-[300px] bg-white p-[7px] text-black" type="text" {...register("username",{required:true})} />
          {errors.username && (
            <p className="error">El nombre de usuario es requerido</p>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-[10px]">
          <label className="text-white" htmlFor="password">Contraseña</label>
          <input className="w-[300px] bg-white p-[7px] text-black" type="password" {...register("password",{required:true})} />
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
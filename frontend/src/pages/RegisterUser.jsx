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
        <h1 className="bg-[#662d91] text-white text-[32px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] md:w-[600px] text-center">Registro de usuario</h1>
      </div>

      <form className="flex flex-col w-[350px] m-auto h-[600px] p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px] md:h-[600px] xl:h-[600px]" method="post" onSubmit={handleSubmit(submitForm)}>

        <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="profilePhoto">Foto de perfil</label>
            <input
              className="w-full p-[7px] bg-white text-black cursor-pointer"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
        </div>

        <div className="mt-5 flex flex-col">
          <label className="text-white" htmlFor="name">Nombre</label>
          <input className="w-full p-[7px] bg-white text-black" type="text" {...register("name",{required:true})} />
          {errors.name && (
            <p className="error">El nombre es requerido</p>
          )}
        </div>

        <div className="mt-5 flex flex-col">
          <label className="text-white" htmlFor="surname">Apellido</label>
          <input className="w-full p-[7px] bg-white text-black" type="text" {...register("surname",{required:true})} />
          {errors.surname && (
            <p className="text-white">El apellido es requerido</p>
          )}
        </div>

        <div className="mt-5 flex flex-col">
          <label className="text-white" htmlFor="email">Correo electrónico</label>
          <input className="w-full p-[7px] bg-white text-black" type="email" {...register("email",{required:true})} />
          {errors.email && (
            <p className="text-white">El correo electrónico es requerido</p>
          )}
        </div>

        <div className="mt-5 flex flex-col">
          <label className="text-white" htmlFor="username">Nombre de usuario</label>
          <input className="w-full p-[7px] bg-white text-black" type="text" {...register("username",{required:true})} />
          {errors.username && (
            <p className="error">El nombre de usuario es requerido</p>
          )}
        </div>

        <div className="mt-5 flex flex-col">
          <label className="text-white" htmlFor="password">Contraseña</label>
          <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password",{required:true})} />
          {errors.password && (
            <p className="error">La contraseña es requerida</p>
          )}
        </div>
        
        <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Crear cuenta</button>
      </form>

      {errorRegister && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al registrarse: {errorRegister}</p>
      )}
    </main>
  )
}

export default RegisterUser
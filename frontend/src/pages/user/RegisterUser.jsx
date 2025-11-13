import { useForm } from "react-hook-form";
import { UseContextUser } from "../../context/user/UseContextUser.js"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import BackButton from "../../components/layout/BackButton.jsx";
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterUser = () => {

  const navigate = useNavigate()

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
  });

  const [correctRegister, setCorrectRegister] = useState(false)

  const [errorRegister, setErrorRegister] = useState("")

  const [file, setFile] = useState(null)

  const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm()

  const { signUpUser } = UseContextUser()

  async function submitForm(values) {
    toast.loading("Registrando usuario...", { autoClose: 1000, theme: "dark" });
    try {

      if (!file) {
        setError("profilePhoto", { type: "manual", message: "La foto de perfil es requerida" });
        return;
      } else {
        clearErrors("profilePhoto");
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("password", values.password);
      formData.append("profilePhoto", file);

      await signUpUser(formData);

      setCorrectRegister(true);
      setErrorRegister("");
      reset();
      setFile(null);
    }
    catch (error) {
      if (error.response?.data?.message) {
        setErrorRegister(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (correctRegister) {
      navigate('/loginUsuario', { state: { successMessage: "Usuario registrado con éxito, inicia sesión." } })
    }
  }, [correctRegister])

  return (
    <main className="containerRegisterUser min-h-screen w-full md:pb-[50px]">

      <ToastContainer />

      <BackButton to="/loginUsuario" />

      <div className="title h-[160px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[300px] text-white text-[27px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] md:w-[600px] text-center">Registro de usuario</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <form className="flex flex-col w-[350px] m-auto h-auto p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px]" method="post" onSubmit={handleSubmit(submitForm)}>

          <div className="mt-5 flex flex-col gap-[6px]">
            <label className="text-white">Foto de perfil</label>

            <div
              {...getRootProps()}
              className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white text-black hover:bg-gray-200"
            >
              <input {...getInputProps()} />
              {file ? (
                <span>{file.name}</span>
              ) : (
                <span>Arrastra tu imagen o haz clic aquí</span>
              )}
            </div>

            {errors.profilePhoto && (
              <p className="text-white">La foto de perfil es requerida</p>
            )}

            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg shadow-[5px_10px_10px_#000] mx-auto"
              />
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="name">Nombre</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("name", { required: true })} />
            {errors.name && (
              <p className="text-white">El nombre es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="surname">Apellido</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("surname", { required: true })} />
            {errors.surname && (
              <p className="text-white">El apellido es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="email">Correo electrónico</label>
            <input className="w-full p-[7px] bg-white text-black" type="email" {...register("email", { required: true })} />
            {errors.email && (
              <p className="text-white">El correo electrónico es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="username">Nombre de usuario</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("username", { required: true })} />
            {errors.username && (
              <p className="text-white">El nombre de usuario es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="password">Contraseña</label>
            <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password", { required: true })} />
            {errors.password && (
              <p className="text-white">La contraseña es requerida</p>
            )}
          </div>

          <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Crear cuenta</button>
        </form>

        <a href="/loginUsuario" className="text-white mt-[16px] underline flex items-center justify-center">Ya tengo cuenta</a>
      </motion.div>

      {errorRegister && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al registrarse: {errorRegister}</p>
      )}
    </main>
  )
}

export default RegisterUser
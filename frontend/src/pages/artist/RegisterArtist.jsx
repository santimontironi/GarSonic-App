import { useForm } from "react-hook-form";
import { UseContextArtist } from "../../context/artist/UseContextArtist.js";
import { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "../../components/layout/BackButton.jsx";
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterArtist = () => {

  const [errorRegister, setErrorRegister] = useState("")

  const [file, setFile] = useState(null)

  const { register, handleSubmit, reset, formState: { errors }, setError, clearErrors } = useForm()

  const { signUpArtist } = UseContextArtist()

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
  });

  async function submitForm(values) {
    toast.loading("Registrando artista...", { autoClose: 1000, theme: "dark" });
    try {

      if (!file) {
        setError("profilePhoto", { type: "manual", message: "La foto de perfil es requerida" });
        return;
      } else {
        clearErrors("profilePhoto");
      }

      const formData = new FormData();
      formData.append("artistName", values.artistName);
      formData.append("email", values.email);
      formData.append("description", values.description);
      formData.append("genre", values.genre);
      formData.append("password", values.password);
      formData.append("profilePhoto", file);

      await signUpArtist(formData);

      toast.dismiss();

      toast.success("Registro exitoso. Revisa tu correo para confirmar tu cuenta.", {
        autoClose: 2000
      });

      setErrorRegister("");
      setFile(null);
      reset();
    }
    catch (error) {
      if (error.response?.data?.message) {
        setErrorRegister(error.response.data.message);
      }
    }
  }

  return (
    <main className="containerRegisterArtist min-h-screen w-full pb-[40px]">

      <BackButton to="/loginArtista" />

      <div className="title h-[170px] flex justify-center items-center">
        <h1 className="bg-[#662d91] w-[270px] text-white tex text-[29px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[8px] md:p-[12px] md:text-[40px] md:w-[600px] text-center">Registro de Artista</h1>
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
              <p className="text-white">{errors.profilePhoto.message}</p>
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
            <label className="text-white" htmlFor="artistName">Nombre artístico</label>
            <input className="w-full p-[7px] bg-white text-black" type="text" {...register("artistName", { required: true })} />
            {errors.artistName && (
              <p className="text-white">El nombre es requerido</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="description">Biografía</label>
            <textarea name="description" id="description" className="bg-white text-black p-[7px]" {...register("description", { required: true })}></textarea>
            {errors.description && (
              <p className="text-white">La biografía es requerida</p>
            )}
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-white" htmlFor="genre">Género</label>
            <select
              className="w-full p-[7px] bg-white text-black"
              {...register("genre", { required: true })}
            >
              <option value="">Selecciona un género</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="rap">Rap</option>
              <option value="cumbia">Cumbia</option>
              <option value="reggae">Reggae</option>
              <option value="reggaeton">Reggaeton</option>
              <option value="electrónica">Electrónica</option>
              <option value="otro">Otro</option>
            </select>
            {errors.genre && (
              <p className="text-white">El género es requerido</p>
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
            <label className="text-white" htmlFor="password">Contraseña</label>
            <input className="w-full p-[7px] bg-white text-black" type="password" {...register("password", { required: true })} />
            {errors.password && (
              <p className="text-white">La contraseña es requerida</p>
            )}
          </div>

          <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Crear cuenta</button>
        </form>

      </motion.div>


      <a href="/loginArtista" className="text-white mt-[25px] bg-[#924acc] w-[200px] mx-auto decoration-0 p-[10px] rounded-xl text-center flex items-center justify-center">Ya tengo cuenta</a>

      {errorRegister && (
        <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al registrarse: {errorRegister}</p>
      )}

      <ToastContainer />
    </main>
  )
}

export default RegisterArtist
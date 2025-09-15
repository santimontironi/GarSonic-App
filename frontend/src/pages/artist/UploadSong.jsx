import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseContextArtist } from "../../context/artist/UseContextArtist.js";
import BackButton from "../../components/layout/BackButton.jsx";
import Swal from "sweetalert2"
import { useDropzone } from 'react-dropzone';

const UploadSong = () => {

    const navigate = useNavigate()

    const { uploadSong } = UseContextArtist()

    const [errorUpload, setErrorUpload] = useState("")

    const [file, setFile] = useState(null)
    const [audioFile, setAudioFile] = useState(null)

    const { getRootProps: getCoverProps, getInputProps: getCoverInputProps } = useDropzone({
        accept: { 'image/*': [] },
        multiple: false,
        onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
    })

    const { getRootProps: getAudioProps, getInputProps: getAudioInputProps } = useDropzone({
        accept: { 'audio/*': [] },
        multiple: false,
        onDrop: (acceptedFiles) => {
            setAudioFile(acceptedFiles[0])
        }
    })

    const { register, handleSubmit, reset, formState: { errors } } = useForm()


    async function submitForm(values) {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("genre", values.genre);
            formData.append("duration", values.duration);
            formData.append("releaseDate", values.releaseDate);

            if (file) {
                formData.append("coverImage", file);
            }

            if (audioFile) {
                formData.append("audioFile", audioFile);
            }

            await uploadSong(formData);

            Swal.fire('¡Subido!', 'Canción subida con éxito.', 'success').then(() => {
                navigate('/artista/misCanciones')
            })

            setErrorUpload("");
            setFile(null);
            reset();
        }
        catch (error) {
            if (error.response?.data?.message) {
                console.log(error.response.data.message);
                setErrorUpload(error.response.data.message);
            }
        }
    }

    return (
        <main className="containerUploadSong min-h-screen w-full pb-[20px]">

            <BackButton to="/artista" />

            <div className="title h-[160px] flex justify-center items-center">
                <h1 className="bg-[#662d91] w-[320px] text-white text-[27px] shadow-[7px_10px_15px_rgba(0,0,0,0.70)] p-[12px] md:text-[40px] md:w-[600px] text-center">Subir Canción</h1>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }}
            >
                <form className="flex flex-col w-[350px] m-auto h-auto p-[20px] rounded-[10px] shadow-[5px_7px_10px_#000] md:w-[450px] bg-gradient-to-b from-[#000] to-[#662d91]" method="post" onSubmit={handleSubmit(submitForm)}>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white">Portada</label>

                        <div
                            {...getCoverProps()}
                            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white text-black hover:bg-gray-200"
                        >
                            <input {...getCoverInputProps()} />
                            {file ? <span>{file.name}</span> : <span>Arrastra la portada o haz clic aquí</span>}
                        </div>

                        {file && (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="mt-3 w-32 h-32 object-cover rounded-lg shadow-[5px_10px_10px_#000] mx-auto"
                            />
                        )}

                        {errors.coverImage && <p className="text-white">La imagen de portada es requerida</p>}
                    </div>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white" htmlFor="title">Título</label>
                        <input className="w-full p-[7px] bg-white text-black" type="text" {...register("title", { required: true })} />
                        {errors.title && (
                            <p className="text-white">El titulo es requerido</p>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white" htmlFor="genre">Género</label>
                        <select className="bg-white text-black p-[7px]" name="genre" id="genre" {...register("genre", { required: true })}>
                            <option value="">Selecciona un género</option>
                            <option value="rock">Rock</option>
                            <option value="pop">Pop</option>
                            <option value="hip-hop">Hip-Hop</option>
                            <option value="jazz">Jazz</option>
                            <option value="electronica">Electrónica</option>
                            <option value="reggaeton">Reggaeton</option>
                        </select>
                        {errors.genre && (
                            <p className="text-white">El género es requerido</p>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white">Audio</label>

                        <div
                            {...getAudioProps()}
                            className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white text-black hover:bg-gray-200"
                        >
                            <input {...getAudioInputProps()} />
                            <span>Arrastra el archivo de audio o haz clic aquí</span>
                            {audioFile && <span className="ml-2">{audioFile.name}</span>}
                        </div>

                        {errors.audioFile && <p className="text-white">El audio es requerido</p>}
                    </div>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white" htmlFor="releaseDate">Fecha lanzamiento</label>
                        <input className="w-full p-[7px] bg-white text-black" type="date" {...register("releaseDate", { required: true })} />
                        {errors.releaseDate && (
                            <p className="text-white">La fecha de lanzamiento es requerida</p>
                        )}
                    </div>

                    <div className="mt-5 flex flex-col gap-[6px]">
                        <label className="text-white" htmlFor="duration">Duración (minutos : segundos)</label>
                        <input className="w-full p-[7px] bg-white text-black" type="text" {...register("duration", { required: true })} />
                        {errors.duration && (
                            <p className="text-white">La duración es requerida</p>
                        )}
                    </div>

                    <button className="m-auto mt-5 text-[#662d91] bg-white font-bold border-none cursor-pointer p-[10px] hover:text-white hover:bg-black" type="submit">Subir canción</button>
                </form>

            </motion.div>

            {errorUpload && (
                <p className="errorAuth text-center text-white bg-[#d81630] p-[8px] mt-[30px] shadow-[5px_10px_15px_#101010] w-[400px] lg:p-[10px] font-[900] m-auto lg:mt-[20px] lg:w-[700px]">Error al subir canción: {errorUpload}</p>
            )}
        </main>
    )
}

export default UploadSong
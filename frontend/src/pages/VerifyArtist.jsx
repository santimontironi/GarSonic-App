import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseContextArtist } from "../context/UseContextArtist";

const VerifyArtist = () => {
    const { token } = useParams();
    const [errorVerify, setErrorVerify] = useState(false);
    const [message, setMessage] = useState("");

    const { verifyArtist } = UseContextArtist();

    useEffect(() => {
        async function verify() {
            try {
                const res = await verifyArtist(token);
                setErrorVerify(false);
                setMessage(res.message);
            } catch (error) {
                setErrorVerify(true);
                setMessage(error.response?.data?.message);
            }
        }
        verify();
    }, [token]);

    return (
        <main className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white px-4">
            <div className="p-8 rounded-2xl shadow-2xl bg-purple-800/80 max-w-lg w-full text-center backdrop-blur-md border border-purple-600">
                {!errorVerify ? (
                    <>
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-5xl">🎉</span>
                        </div>
                        <h1 className="text-2xl font-extrabold mb-3 text-purple-200 tracking-wide">
                            ¡Cuenta verificada!
                        </h1>
                        <p className="text-purple-100 leading-relaxed">{message}</p>
                        <div className="mt-6">
                            <a
                                href="/loginArtista"
                                className="inline-block px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg font-medium text-white"
                            >
                                Ir a iniciar sesión
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center mb-4">
                            <span className="text-5xl">⚠️</span>
                        </div>
                        <h1 className="text-2xl font-extrabold mb-3 text-red-300 tracking-wide">
                            Error en la verificación
                        </h1>
                        <p className="text-purple-100 leading-relaxed">{message}</p>
                        
                        <div className="mt-6">
                            <a
                                href="/"
                                className="inline-block px-6 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all shadow-lg font-medium text-white"
                            >
                                Ir al inicio
                            </a>
                        </div>
                    </>
                )}

            </div>
        </main>
    );
};

export default VerifyArtist;

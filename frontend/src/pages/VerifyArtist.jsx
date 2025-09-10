import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseContextArtist } from "../context/UseContextArtist";

const VerifyArtist = () => {
    const { token } = useParams();
    const [status, setStatus] = useState("loading"); // loading | success | error
    const [message, setMessage] = useState("");

    const { verifyArtist } = UseContextArtist();

    useEffect(() => {
        async function verify() {
            try {
                const res = await verifyArtist(token);
                setStatus("success");
                setMessage(res.data.message);
            } catch (error) {
                setStatus("error");
                setMessage(
                    error.response?.data?.message || "Hubo un error al verificar la cuenta."
                );
            }
        }
        verify();
    }, [token]);

    return (
        <main className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white">
            <div className="p-6 rounded-2xl shadow-lg bg-purple-800 max-w-md w-full text-center">
                {status === "loading" && <p>Verificando tu cuenta...</p>}
                {status === "success" && (
                    <>
                        <h1 className="text-xl font-bold mb-2">🎉 ¡Cuenta verificada!</h1>
                        <p>{message}</p>
                    </>
                )}
                {status === "error" && (
                    <>
                        <h1 className="text-xl font-bold mb-2">⚠️ Error</h1>
                        <p>{message}</p>
                    </>
                )}
            </div>
        </main>
    );
};

export default VerifyArtist;
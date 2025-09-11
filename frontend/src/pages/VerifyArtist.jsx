import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseContextArtist } from "../context/UseContextArtist";

const VerifyArtist = () => {
    const { token } = useParams();
    const [errorVerify, setErrorVerify] = useState(false);
    const [message, setMessage] = useState("");

    const { verifyArtist } = UseContextArtist();

    console.log(token);

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
        <main className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white">
            <div className="p-6 rounded-2xl shadow-lg bg-purple-800 max-w-md w-full text-center">
                {errorVerify == false && (
                    <>
                        <h1 className="text-xl font-bold mb-2">🎉 ¡Cuenta verificada!</h1>
                        <p>{message}</p>
                    </>
                )}
                {errorVerify && (
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
import { useState, useEffect } from "react"
import { UseContextUser } from "../context/UseContextUser"

const PlaylistModal = () => {
  const [playlists, setPlaylists] = useState([])
  const [errorGetPlaylists, setErrorGetPlaylists] = useState(null)
  const { getAllPlaylists } = UseContextUser()

  useEffect(() => {
    async function fetchPlaylists() {
      try {
        const res = await getAllPlaylists()
        setPlaylists(res.data)
        setErrorGetPlaylists(null)
      } catch (error) {
        if (error.response?.data?.message) {
          setErrorGetPlaylists(error.response.data.message)
        }
      }
    }

    fetchPlaylists()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-[90%] sm:w-[500px] lg:w-[700px] 2xl:w-[900px] max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
            Tus Playlists
          </h2>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {errorGetPlaylists ? (
            <p className="text-red-500 text-sm sm:text-base">
              {errorGetPlaylists}
            </p>
          ) : playlists.length > 0 ? (
            <ul className="space-y-3">
              {playlists.map((pl) => (
                <li
                  key={pl.id}
                  className="p-3 sm:p-4 rounded-lg border hover:bg-gray-50 cursor-pointer transition"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-900">
                    {pl.name}
                  </h3>
                  {pl.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {pl.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base">
              No tenés playlists creadas todavía.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default PlaylistModal
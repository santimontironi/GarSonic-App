import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Scrollbar } from "react-scrollbars-custom";
import SongList from "./SongList.jsx";

const SongSearch = ({ search, btnAddPlaylist, setSearched }) => {
  const [inputSearch, setInputSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function handleSearch() {
      if (inputSearch.trim() === "") {
        setSearchResults([]);
        setSearched(false)
        return;
      }
      try {
        const res = await search(inputSearch);
        setSearchResults(res.data);
        setSearched(true)

        if (res.data.length === 0) {
          toast.error("No se encontraron resultados.", {
            toastId: "no-results",
            autoClose: 1800,
            hideProgressBar: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    handleSearch();
  }, [inputSearch]);

  return (
    <div className="w-full flex flex-col items-center">
      <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
        <input
          className="bg-white p-2 w-[340px] md:w-[600px] md:p-3 text-purple-800 rounded-[8px] focus:outline-purple-900"
          type="text"
          placeholder="Buscar canciones..."
          onChange={(e) => setInputSearch(e.target.value)}
        />
      </form>

      {searchResults.length > 0 && (
        <Scrollbar
          style={{ height: 450, marginTop: "20px", padding: "15px", width: "100%" }}
          trackYProps={{
            style: { background: "#1e1e1e", borderRadius: "8px", width: "10px" },
          }}
          thumbYProps={{
            style: { background: "#9333ea", borderRadius: "8px" },
          }}
        >
          <div className="flex flex-col items-center gap-[15px]">
            <h2 className="text-white tituloDashboard text-[18px] text-center border-b-2 border-purple-600 md:text-[40px]">
              Resultados de la búsqueda
            </h2>

            {searchResults.map((result) => (
              <SongList
                key={result._id}
                songId={result._id}
                coverImage={`http://localhost:3000/uploads/${result.coverImage}`}
                artist={result.artist.artistName}
                title={result.title}
                audioFile={`http://localhost:3000/uploads/${result.audioFile}`}
                duration={result.duration}
                releaseDate={result.releaseDate}
                genre={result.genre}
                btnVisible={true}
                btnAddPlaylist={btnAddPlaylist}
                btnDelete={false}
              />
            ))}
          </div>
        </Scrollbar>
      )}
    </div>
  );
};

export default SongSearch;
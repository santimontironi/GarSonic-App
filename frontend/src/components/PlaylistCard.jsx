const PlaylistCard = ({name,description,coverImage,createdAt,songs}) => {
  return (
    <div>
      <img src={coverImage} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <span>{createdAt}</span>

      {songs.length == 0 ? (
        <span>Aún no tienes canciones agregadas</span>
      ) : (
        <button>Ver canciones {(songs.length)}</button>
      )}
    </div>
  )
}

export default PlaylistCard;
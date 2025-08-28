const SongCard = ({ coverImage, artist, title, audioFile, duration, releaseDate }) => {
  return (
    <div>
      <img src={coverImage} alt={title} />
      <h2>{title}</h2>
      <p>{artist}</p>
      <audio controls>
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Duration: {duration}</p>
      <p>Release Date: {releaseDate}</p>
    </div>
  )
}

export default SongCard
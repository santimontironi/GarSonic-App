import { BeatLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <BeatLoader color="#fff" />
    </div>
  )
}

export default Loader
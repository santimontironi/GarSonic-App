const BackButton = ({ to }) => {
    return (
        <div className="absolute top-5 left-5 lg:top-7 lg:left-10">
            <a className="decoration-0 lg:text-[40px] text-white text-[30px] hover:shadow-[3px_3px_15px_#000] cursor-pointer" href={to}><i className="bi bi-arrow-left-square"></i></a>
        </div>
    )
}
export default BackButton
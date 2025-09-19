const RolCard = ({ icon, title, description, actions }) => {
  return (
    <div className="flex flex-col items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-6 w-[90%] sm:w-[350px] md:w-[300px] lg:w-[320px] xl:w-[350px] 2xl:w-[400px] shadow-lg hover:scale-105 transition-transform duration-300 mx-auto">
      <i className={`${icon} text-[40px] sm:text-[50px] md:text-[55px] lg:text-[60px] xl:text-[65px] 2xl:text-[70px] text-purple-400 mb-4 drop-shadow-lg`}></i>
      <h3 className="text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] 2xl:text-[20px] text-center mb-4">{description}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {actions.map((action, index) => (
          <span
            key={index}
            className="px-2 sm:px-3 py-1 bg-purple-600 text-white text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px] rounded-full shadow-md hover:bg-purple-700 transition-colors"
          >
            {action}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RolCard;
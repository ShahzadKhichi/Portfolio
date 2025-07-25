import React from "react";

const ProjectCard = ({ Technologies, image, description }) => {
  return (
    <div className="border-2  flex flex-col my-4 hover:scale-105 active:scale-105 duration-300  shadow-2xl bg-[#080808f3]  border-[#2b2b2b] rounded-2xl p-2 lg:p-8 items-center lg:w-[60%] ">
      <div className="w-full flex flex-col lg:flex-row">
        <div className=" w-full lg:h-[50vh] flex justify-center  ">
          <img
            className=" w-[100%]   rounded-2xl border-[1px]  shadow shadow-amber-50 border-amber-50"
            height={1100}
            src={image}
            alt=""
          />
        </div>
        <div className="w-full flex justify-center ">
          <div className="flex flex-col w-[90%] gap-4 p-4 items-center justify-center ">
            <p className="text-center    font-sans font-normal text-[#818181]">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              {Technologies.map((tech, id) => (
                <div
                  key={id}
                  className=" text-[#9b9b9b] bg-[#1d1d1d]  duration-300 hover:scale-105 font-semibold py-2 px-3 rounded-full "
                >
                  {"#" + tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

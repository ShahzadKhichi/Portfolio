const Input = (props) => {
  const { label, required } = props;
  return (
    <div className="flex flex-col w-full rounded-lg">
      <div className="text-white font-semibold pl-1 pb-1">
        {label}
        {required ? <span className="text-[#b11616]"> *</span> : ""}
      </div>
      {props?.type == "text-area" ? (
        <textarea
          {...props}
          style={{}}
          className="w-full bg-[#272727f3] font-semibold  px-2 py-4 border-b-2 border-richblack-400 rounded-lg placeholder:text-[#636161f3] text-[#e7e7e7f3]"
        />
      ) : (
        <input
          {...props}
          style={{}}
          className="w-full bg-[#272727f3] font-semibold  px-2 py-4 border-b-2 border-richblack-400 rounded-lg placeholder:text-[#636161f3] text-[#e7e7e7f3]"
        />
      )}
    </div>
  );
};

export default Input;

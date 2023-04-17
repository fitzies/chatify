const Button = (props: {
  text: string;
  type: "solid" | "hollow";
  onClick: Function;
  style?: string;
}) => {
  return (
    <div
      className={`w-1/3 aspect-[2/1]
      } flex justify-center items-center rounded-lg ${
        props.type == "solid" ? "bg-light" : "border border-light"
      } hover:-translate-y-1 duration-150 cursor-pointer ${
        props.style ?? null
      }`}
      onClick={() => props.onClick()}
    >
      {props.text}
    </div>
  );
};

export default Button;

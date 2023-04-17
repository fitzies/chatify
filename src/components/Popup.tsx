const Popup = (props: { children: any; style?: string }) => {
  return (
    <div className="w-screen h-screen absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`bg-primary rounded-xl py-6 px-4 flex justify-center items-center ${props.style}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Popup;

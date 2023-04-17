"use client";

import { useRouter } from "next/navigation";

const NavItem = (props: {
  item: string;
  active: boolean;
  onClick: Function;
  icon?: any;
}) => {
  const router = useRouter();

  const onClick = () => {
    props.onClick(props.item);
    router.push(
      `/${props.item.toLowerCase() === "home" ? "" : props.item.toLowerCase()}`
    );
  };

  return (
    <div
      className={`w-3/4 aspect-square ${
        props.active ? "bg-light" : "bg-primary"
      } rounded-[50%] hover:rounded-[40%] duration-100 cursor-pointer flex justify-center items-center shadow-sm`}
      onClick={onClick}
    >
      <h1 className="text-white font-bold text-md">
        {props.item.substring(0, 4)}
      </h1>
    </div>
  );
};

export default NavItem;

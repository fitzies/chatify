"use client";

import { useState } from "react";
import NavItem from "./NavItem";

type NavItemType = {
  name: string;
  active: boolean;
};

const Nav = () => {
  const [navItems, setNavItems] = useState<NavItemType[]>([
    { name: "Home", active: true },
    { name: "Chat", active: false },
    { name: "Friends", active: false },
    { name: "Settings", active: false },
    { name: "Account", active: false },
  ]);

  const updateNav = (name: string) => {
    const idx = navItems.findIndex((item) => item.name === name);
    const temp = navItems.map((item) => {
      return {
        ...item,
        active: false,
      };
    });
    temp[idx].active = true;
    setNavItems(() => [...temp]);
  };

  return (
    <div className="w-[6%] h-screen absolute left-0 top-0 bg-secondary flex flex-col gap-4 items-center py-4 [&>*:nth-child(4)]:mt-auto">
      {navItems.map((item: NavItemType) => {
        return (
          <NavItem
            item={item.name}
            active={item.active}
            onClick={updateNav}
            key={item.name}
          />
        );
      })}
    </div>
  );
};

export default Nav;

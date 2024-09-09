import { MenuItem, Typography } from "@material-tailwind/react";
import NavListMenu from "./NavListMenu";
import { createElement } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";

function NavList() {
  const navListItems = [
    {
      label: "Exercise",
      icon: CodeBracketIcon,
    },
  ];
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon }, _) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
      <NavListMenu />
    </ul>
  );
}

export default NavList;
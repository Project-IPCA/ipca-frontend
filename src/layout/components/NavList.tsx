import { MenuItem, Typography } from "@material-tailwind/react";
import NavListMenu from "./NavListMenu";
import { createElement } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function NavList() {
  const navigate = useNavigate();
  const navListItems = [
    {
      label: "Exercise",
      icon: CodeBracketIcon,
      path: "/exercise",
    },
  ];
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, path }, _) => (
        <Typography
          key={label}
          as="a"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
          onClick={() => navigate(path)}
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

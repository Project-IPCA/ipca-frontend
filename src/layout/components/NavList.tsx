import { MenuItem, Typography } from "@material-tailwind/react";
import NavListMenu from "./NavListMenu";
import { createElement } from "react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  handleCloseNav: () => void;
}

function NavList({ handleCloseNav }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const navListItems = [
    {
      label: t("layout.default.menu.exercise"),
      icon: CodeBracketIcon,
      path: "/exercises",
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
          onClick={() => {
            navigate(path);
            handleCloseNav();
          }}
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
      <NavListMenu handleCloseNav={handleCloseNav} />
    </ul>
  );
}

export default NavList;

import {
  AcademicCapIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  LightBulbIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { createElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  handleCloseNav: () => void;
}

function NavListMenu({ handleCloseNav }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navListMenuItems = [
    {
      title: t("layout.default.menu.instructions.title"),
      description: t("layout.default.menu.instructions.desc"),
      icon: BookOpenIcon,
      path: "/instructions",
    },
    {
      title: t("layout.default.menu.examination.title"),
      description: t("layout.default.menu.examination.desc"),
      icon: AcademicCapIcon,
      path: "/examination",
    },
    {
      title: t("layout.default.menu.faq.title"),
      description: t("layout.default.menu.faq.desc"),
      icon: ChatBubbleLeftRightIcon,
      path: "/faq",
    },
  ];

  const navigate = useNavigate();

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, path }, key) => (
      <a key={key}>
        <MenuItem
          className="flex items-center gap-3 rounded-lg"
          onClick={() => {
            navigate(path);
            handleCloseNav();
          }}
        >
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" variant="small" className="font-normal">
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
              <LightBulbIcon className="h-[18px] w-[18px] text-blue-gray-500" />
              {t("layout.default.menu.instructions.title")}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />
        {t("layout.default.menu.instructions.title")}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </>
  );
}

export default NavListMenu;

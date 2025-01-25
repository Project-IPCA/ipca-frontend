import {
  ChevronDownIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store";
import { logout } from "../redux/layoutSlice";
import { setLogoutState } from "../../features/login/redux/loginSlice";
import { profileNone } from "../../assets";
import { useTranslation } from "react-i18next";
import { resetState } from "../../store/store";

interface Props {
  profileImage: string;
}

function ProfileMenu({ profileImage }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const profileMenuItems = [
    {
      label: t("layout.default.profile.menu.my_profile"),
      icon: UserCircleIcon,
      path: "/profile",
      next: () => {},
    },
    {
      label: t("layout.default.profile.menu.sign_out"),
      icon: PowerIcon,
      path: "/login",
      next: async () => {
        await dispatch(logout());
        dispatch(setLogoutState());
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(resetState());
      },
    },
  ];

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={profileImage || profileNone}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path, next }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                next();
                navigate(path);
                setIsMenuOpen(false);
              }}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;

import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { flagEn, flagTh, flagCirEn, flagCirTh } from "../../assets";
import { useTranslation } from "react-i18next";
import { LANGUAGE } from "../../constants/constants";

interface Props {
  variant?: "long" | "short";
}

function MultilingualMenu({ variant = "long" }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { i18n } = useTranslation();

  const langs = [
    {
      label: "ภาษาไทย",
      icon: flagTh,
      lang: "th",
    },
    {
      label: "English",
      icon: flagEn,
      lang: "en",
    },
  ];

  const getFlagIcon = () => {
    switch (i18n.language) {
      case LANGUAGE.th:
        return variant === "long" ? flagTh : flagCirTh;
      case LANGUAGE.en:
        return variant === "long" ? flagEn : flagCirEn;
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          // className="flex items-center gap-1  py-0.5 pr-0.5 pl-0.5 lg:ml-auto "
          className={`flex items-center  text-md font-medium capitalize ${variant === "long" ? "p-2" : "p-0 !rounded-full"}`}
        >
          <Avatar
            variant={variant === "long" ? "square" : "circular"}
            className={` ${variant === "short" ? "w-8 h-8 p-[0.25rem]" : "p-[0.35rem]"} `}
            size="sm"
            alt="flag"
            src={getFlagIcon()}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {langs.map(({ label, icon, lang }) => {
          return (
            <MenuItem
              key={label}
              onClick={() => {
                i18n.changeLanguage(lang);
                setIsMenuOpen(false);
              }}
              className={`flex items-center gap-1 rounded `}
            >
              <Avatar
                variant="square"
                className="p-[0.35rem]"
                size="sm"
                src={icon}
              />

              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="inherit"
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

export default MultilingualMenu;

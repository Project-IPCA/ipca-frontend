import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import NavList from "./components/NavList";
import { Logo, ProfileMenu } from "./components";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  getProfile,
  getProfileState,
} from "../features/profile/redux/profileSlice";

function Layout() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfileState);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const handleCloseNav = () => setIsNavOpen(false);

  useEffect(() => {
    if (!profile.profile.f_name) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <>
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <Logo />
          <div className="hidden lg:block">
            <NavList handleCloseNav={handleCloseNav} />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          <ProfileMenu profileImage={profile.profile.avatar} />
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList handleCloseNav={handleCloseNav} />
        </Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;

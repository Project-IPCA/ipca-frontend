import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExerciseListDrawer, Logo, ProfileMenu } from "./components";
import ExerciseMenu from "./components/ExerciseMenu";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  getProfile,
  getProfileState,
} from "../features/profile/redux/profileSlice";
import MultilingualMenu from "./components/MultilingualMenu";

function SubmitCodeLayout() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfileState);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (!profile.profile.f_name) {
      dispatch(getProfile());
    }
  }, [dispatch, profile]);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const toggleDrawer = () => setIsDrawerOpen((cur) => !cur);
  const handleCloseNav = () => setIsNavOpen(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <>
      <ExerciseListDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center">
            <Logo />
            <div className="hidden lg:block">
              <ExerciseMenu
                toggleDrawer={toggleDrawer}
                handleCloseNav={handleCloseNav}
              />
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
          </div>
          <div className="flex items-center lg:gap-x-4 gap-x-3">
            <MultilingualMenu />
            <ProfileMenu profileImage={profile.profile.avatar} />
          </div>
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <ExerciseMenu
            toggleDrawer={toggleDrawer}
            handleCloseNav={handleCloseNav}
          />
        </Collapse>
      </Navbar>
      <Outlet />
    </>
  );
}

export default SubmitCodeLayout;

import { XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer, Typography, IconButton, List } from "@material-tailwind/react";
import ProblemAccordion from "./ProblemAccordion";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  clearChapterListError,
  getChapterList,
  getChapterListError,
  getChapterListState,
} from "../redux/submitCodeLayoutSlice";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExerciseListDrawer({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const chapterList = useAppSelector(getChapterListState);
  const error = useAppSelector(getChapterListError);

  const sortedChapterList = useMemo(
    () =>
      [...chapterList].sort(
        (a, b) => a.items[0]?.chapter_idx - b.items[0]?.chapter_idx,
      ),
    [chapterList],
  );

  useEffect(() => {
    if (!initialized.current && chapterList.length <= 0) {
      initialized.current = true;
      dispatch(getChapterList());
    }
    return () => {};
  }, [dispatch, chapterList]);

  useEffect(() => {
    if (error) {
      toast.error(error.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      dispatch(clearChapterListError());
    }
  }, [error, dispatch]);

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      overlayProps={{
        className:
          "fixed inset-0 bg-black bg-opacity-20 h-screen overflow-auto",
      }}
      size={500}
    >
      <div className="flex justify-between items-center border-b-[1px] p-4 h-16">
        <div className="flex gap-x-2 items-center">
          <Typography variant="h5">
            {t("layout.submit_code.menu.problem_list")}
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => navigate("/exercises")}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </IconButton>
      </div>
      <List className="overflow-y-auto max-h-[calc(100vh-4rem)]">
        {sortedChapterList.map((item, index) => (
          <ProblemAccordion
            data={item}
            chapterIndex={index + 1}
            key={index}
            onDrawerClose={onClose}
          />
        ))}
      </List>
    </Drawer>
  );
}

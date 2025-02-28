import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Tab,
  Tabs,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import ExerciseCard from "./components/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  clearExerciseListError,
  ExerciseInfo,
  getExercciseListStatus,
  getExerciseList,
  getExerciseListError,
  getExerciseListState,
} from "./redux/exerciseListSlice";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import ChapterListCard from "./components/ChapterListCard";
import { CARD_MODE, LIST_MODE } from "../../constants/constants";

const ExerciseList = () => {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(getExerciseListState);
  const error = useAppSelector(getExerciseListError);
  const isFetching = useAppSelector(getExercciseListStatus);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const storedMode = localStorage.getItem("exercise_list_mode");
  const [mode, setMode] = useState(storedMode || CARD_MODE);

  const CHAPTER_LIST_MODES_OPTIONS = [
    { label: t("feature.exercise_list.mode.card"), value: CARD_MODE },
    { label: t("feature.exercise_list.mode.list"), value: LIST_MODE },
  ];

  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  useEffect(() => {
    if (!initialized.current && data.length <= 0) {
      initialized.current = true;
      dispatch(getExerciseList());
    }
    return () => {};
  }, [dispatch, data]);

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
      dispatch(clearExerciseListError());
    }
  }, [error, dispatch]);

  const getDataByFetching = isFetching
    ? (Array.from({ length: 15 }) as ExerciseInfo[])
    : filteredData;

  return (
    <div>
      {isFetching ? (
        <div className="flex gap-x-4 w-full items-center">
          <Card className="shadow-none border-[1px]  w-full h-10 flex flex-row justify-between items-center rounded-md px-3">
            <Typography
              as="div"
              className="block  h-2 w-16 rounded-lg bg-gray-300"
            >
              &nbsp;
            </Typography>
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-300" />
          </Card>
          <Typography
            as="div"
            className="block  h-8 w-72 rounded-md bg-gray-300"
          >
            &nbsp;
          </Typography>
        </div>
      ) : (
        <div className="flex gap-x-4 w-full items-center">
          <Input
            crossOrigin=""
            label={t("feature.exercise_list.search")}
            icon={<MagnifyingGlassIcon />}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Tabs value={mode} className="w-72 !z-[0]">
            <TabsHeader>
              {CHAPTER_LIST_MODES_OPTIONS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    setMode(value);
                    localStorage.setItem("exercise_list_mode", value);
                  }}
                  className={
                    mode === value ? "text-gray-900 !text-sm" : "!text-sm"
                  }
                >
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
        </div>
      )}
      {mode === CARD_MODE ? (
        <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {getDataByFetching.map((chapter, index) => (
            <ExerciseCard
              chapter_id={chapter?.chapter_id}
              full_mark={chapter?.full_mark}
              index={chapter?.items[0].chapter_idx}
              is_open={chapter?.is_open}
              marking={chapter?.total_mark}
              name={chapter?.name}
              last_exercise_success={chapter?.last_exercise_success}
              key={index}
            />
          ))}
        </div>
      ) : (
        <Card
          className="border-[1px]  mt-4 sm:mb-0 md:mb-44 lg:mb-0"
          shadow={false}
        >
          <ChapterListCard
            chapterList={getDataByFetching}
            isFetching={isFetching}
          />
        </Card>
      )}
    </div>
  );
};

export default ExerciseList;

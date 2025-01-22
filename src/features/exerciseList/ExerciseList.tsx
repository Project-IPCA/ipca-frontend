import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import ExerciseCard from "./components/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  clearExerciseListError,
  getExerciseList,
  getExerciseListError,
  getExerciseListState,
} from "./redux/exerciseListSlice";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ExerciseList = () => {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector(getExerciseListState);
  const error = useAppSelector(getExerciseListError);
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();

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

  return (
    <div>
      <Input
        crossOrigin=""
        label={t("feature.exercise_list.search")}
        icon={<MagnifyingGlassIcon />}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {filteredData.map((item, index) => (
          <ExerciseCard {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;

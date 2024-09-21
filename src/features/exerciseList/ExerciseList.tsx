import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import ExerciseCard from "./components/ExerciseCard";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useRef } from "react";
import {
  clearExerciseListError,
  getExerciseList,
} from "./redux/exerciseListSlice";
import { Bounce, toast } from "react-toastify";

const ExerciseList = () => {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.exerciseList);

  useEffect(() => {
    if (!initialized.current) {
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

  console.log(data);

  return (
    <div>
      <Input crossOrigin="" label="Search" icon={<MagnifyingGlassIcon />} />
      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {data.map((item, index) => (
          <ExerciseCard {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Input } from "@material-tailwind/react";
import ExerciseCard from "./components/ExerciseCard";

const ExerciseList = () => {
  const mockData = [
    {
      index: 1,
      name: "Introduction to Programming",
      score: 8,
      fullmark: 10,
      isOpen: true,
    },
    {
      index: 2,
      name: "Variables and Data Types",
      score: 9,
      fullmark: 10,
      isOpen: false,
    },
    {
      index: 3,
      name: "Control Structures",
      score: 7,
      fullmark: 10,
      isOpen: true,
    },
    { index: 4, name: "Functions", score: 10, fullmark: 10, isOpen: false },
    {
      index: 5,
      name: "Object-Oriented Programming",
      score: 9,
      fullmark: 10,
      isOpen: true,
    },
  ];
  return (
    <div>
      <Input crossOrigin="" label="Search" icon={<MagnifyingGlassIcon />} />
      <div className="grid gap-8 mt-8 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {mockData.map((item, index) => (
          <ExerciseCard {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;

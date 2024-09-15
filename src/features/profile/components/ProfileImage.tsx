import { PencilIcon } from "@heroicons/react/24/solid";

function ProfileImage() {
  return (
    <div className="flex justify-center items-center mb-6">
      <div className="relative w-36 h-36">
        <img
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          className="inline-block relative object-cover object-center rounded-full w-36 h-36"
        />
        <span className="absolute min-w-10 min-h-10 rounded-full p-2 text-xs font-medium  leading-none grid place-items-center bottom-[14%] right-[14%] translate-x-2/4 translate-y-2/4 bg-black  text-white border-2 border-white ">
          <PencilIcon />
        </span>
      </div>
    </div>
  );
}

export default ProfileImage;

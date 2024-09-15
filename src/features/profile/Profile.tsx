import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Input,
  Radio,
  Select,
  Option,
  Typography,
  Button,
} from "@material-tailwind/react";
import DatePicker from "./components/DatePicker";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  clearProfileError,
  getProfile,
  updateProfile,
} from "./redux/profileSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

interface ProfileInfo {
  avatar: string;
  dept_id: string;
  dob: string;
  email: string;
  f_name: string;
  gender: string;
  l_name: string;
  nickname: string;
  tel: string;
  confirm_new_password: string;
  current_password: string;
  new_password: string;
}

function Profile() {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const { data, isUpdating, error } = useAppSelector((state) => state.profile);
  const { register, handleSubmit, reset, setValue } = useForm<ProfileInfo>();

  const handleSelectChange = (value: string | undefined) => {
    if (value) {
      setValue("dept_id", value);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(getProfile());
    }
    return () => {};
  }, [dispatch, data]);

  useEffect(() => {
    if (data) {
      reset({
        confirm_new_password: "",
        current_password: "",
        new_password: "",
        ...data.profile,
      });
    }
  }, [reset, data]);

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
      dispatch(clearProfileError());
    }
  }, [error, dispatch]);

  const onSubmit: SubmitHandler<ProfileInfo> = async (data) => {
    const resultAction = await dispatch(
      updateProfile({
        avatar: data.avatar ? data.avatar : null,
        dob: data.dob ? data.dob : null,
        email: data.email ? data.email : null,
        gender: data.gender ? data.gender : null,
        nickname: data.nickname ? data.nickname : null,
        tel: data.tel ? data.tel : null,
        confirm_new_password: data.confirm_new_password
          ? data.confirm_new_password
          : null,
        current_password: data.current_password ? data.current_password : null,
        new_password: data.new_password ? data.new_password : null,
        dept_id: data.dept_id ? data.dept_id : null,
      }),
    );
    if (updateProfile.fulfilled.match(resultAction)) {
      toast.success("Updated user profile", {
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
    }
    setValue("confirm_new_password", "");
    setValue("current_password", "");
    setValue("new_password", "");
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className="w-full">
        <div className=" w-full container mx-auto flex md:flex-row flex-col gap-5 max-w-5xl ">
          <Card className="md:w-1/2 p-6">
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
            <Typography variant="h4" color="blue-gray">
              Personal Information
            </Typography>
            <form className="mt-8 mb-2   space-y-5">
              <div className="flex lg:flex-row md:flex-col lg:gap-y-0 gap-y-5 gap-x-2 ">
                <Input
                  {...register("f_name")}
                  crossOrigin=""
                  size="lg"
                  placeholder="First Name"
                  label="First Name"
                  disabled
                />
                <Input
                  {...register("l_name")}
                  crossOrigin=""
                  size="lg"
                  placeholder="Last Name"
                  label="Last Name"
                  disabled
                />
              </div>
              <div className="flex lg:flex-row flex-col lg:gap-y-0 gap-y-5 gap-x-2 ">
                <Input
                  {...register("nickname")}
                  crossOrigin=""
                  size="lg"
                  placeholder="Nickname"
                  label="Nickname"
                />
                <DatePicker />
              </div>
              <div>
                <Typography variant="h5">Gender</Typography>
                <div className="flex w-max gap-4">
                  <Radio
                    crossOrigin=""
                    label="Male"
                    value="MALE"
                    {...register("gender", { required: true })}
                  />
                  <Radio
                    crossOrigin=""
                    label="Female"
                    value="FEMALE"
                    {...register("gender", { required: true })}
                  />
                  <Radio
                    crossOrigin=""
                    label="Other"
                    value="OTHER"
                    {...register("gender", { required: true })}
                  />
                </div>
              </div>
            </form>
          </Card>
          <div className="lg:h-full flex flex-col gap-y-5 md:w-1/2">
            <Card className="h-1/2 p-6 space-y-5">
              <Typography variant="h4" color="blue-gray">
                Contact
              </Typography>

              <Select
                label="Department"
                onChange={handleSelectChange}
                value={data.profile.dept.dept_id}
                size="lg"
              >
                {data.selected.departments.map((item, index) => (
                  <Option key={index} value={item.dept_id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <Input
                crossOrigin=""
                size="lg"
                placeholder="Email"
                label="Email"
                {...register("email")}
              />
              <Input
                crossOrigin=""
                size="lg"
                placeholder="Phone Number"
                label="Phone Number"
                {...register("tel")}
              />
            </Card>
            <Card className="h-1/2 p-6 space-y-5">
              <Typography variant="h4" color="blue-gray">
                Reset Password
              </Typography>
              <Input
                crossOrigin=""
                size="lg"
                placeholder="New Password"
                label="New Password"
                type="password"
                {...register("new_password")}
              />
              <Input
                crossOrigin=""
                size="lg"
                placeholder="Confirm Password"
                label="Confirm Password"
                type="password"
                {...register("confirm_new_password")}
              />
            </Card>
          </div>
        </div>
        <div className=" w-full container mx-auto flex md:flex-row flex-col gap-5 max-w-5xl justify-end mt-5">
          <div className="w-72">
            <Input
              crossOrigin=""
              size="lg"
              placeholder="Current Password"
              label="Current Password"
              type="password"
              {...register("current_password")}
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isUpdating}
            loading={isUpdating}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;

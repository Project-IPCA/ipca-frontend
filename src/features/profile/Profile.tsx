import { Card, Input, Typography, Button } from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  clearProfileError,
  getProfile,
  updateProfile,
} from "./redux/profileSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import PersonalInfo from "./components/PersonalInfo";
import Contact from "./components/Contact";
import ResetPassword from "./components/ResetPassword";
import ProfileImage from "./components/ProfileImage";

export interface ProfileInfo {
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
  const [profileImage, setProfileImage] = useState<string>("");
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const handleImageChange = (image: string) => {
    setProfileImage(image);
  };

  const handleFileChange = (file: File | null) => {
    setProfileFile(file);
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
        avatar: profileFile ? profileFile : null,
        dob: data.dob ? data.dob.slice(0, 11) : null,
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
            <ProfileImage
              formData={data}
              profileImage={profileImage}
              onImageChange={handleImageChange}
              onFileChange={handleFileChange}
            />
            <Typography variant="h4" color="blue-gray">
              Personal Information
            </Typography>
            <PersonalInfo
              register={register}
              setValue={setValue}
              formData={data}
            />
          </Card>
          <div className="lg:h-full flex flex-col gap-y-5 md:w-1/2">
            <Card className="h-1/2 p-6 space-y-5">
              <Typography variant="h4" color="blue-gray">
                Contact
              </Typography>
              <Contact
                register={register}
                setValue={setValue}
                formData={data}
              />
            </Card>
            <Card className="h-1/2 p-6 space-y-5">
              <Typography variant="h4" color="blue-gray">
                Reset Password
              </Typography>
              <ResetPassword register={register} />
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
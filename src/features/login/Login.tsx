import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { clearErrorState, getLoginState, loginUser } from "./redux/loginSlice";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type LoginInput = {
  username: string;
  password: string;
};

function Login() {
  const { register, handleSubmit } = useForm<LoginInput>();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(getLoginState);
  const [pendingLogin, setPendingLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState.username && loginState.password) {
      dispatch(
        loginUser({
          username: loginState.username,
          password: loginState.password,
        }),
      );
    }
  }, [dispatch, loginState.password, loginState.username]);

  useEffect(() => {
    if (loginState.error !== null) {
      setPendingLogin(false);
      toast.error(loginState.error.error, {
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

      dispatch(clearErrorState());
    }
  }, [dispatch, loginState.error]);

  useEffect(() => {
    if (loginState.token) {
      navigate("/");
      setPendingLogin(false);
    }
  }, [loginState.token]);

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    setPendingLogin(true);
    dispatch(
      loginUser({
        username: data.username,
        password: data.password,
      }),
    );
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Card className="p-6">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Computer Programming Laboratory, KMITL
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Username
            </Typography>
            <Input
              {...register("username")}
              crossOrigin=""
              size="lg"
              placeholder="username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              {...register("password")}
              crossOrigin=""
              type="password"
              size="lg"
              placeholder="password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button
            className="mt-6 flex justify-center items-center gap-x-3"
            fullWidth
            type="submit"
            disabled={pendingLogin}
            loading={pendingLogin}
          >
            sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;

import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Typography
      as="a"
      className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
      onClick={() => navigate("/")}
    >
      IPCA
    </Typography>
  );
};

export default Logo;

import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ipcaIc } from "../../assets";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-x-1 mr-4 ml-2 py-1.5 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={ipcaIc} alt="brand" className="h-8 w-8 mb-1" />
      <Typography as="a" className="  font-medium">
        IPCA
      </Typography>
    </div>
  );
};

export default Logo;

import { Typography } from "@material-tailwind/react";

interface Props {
  label: string;
  value: string;
}

function InfoText({ label, value }: Props) {
  return (
    <div className="flex gap-2">
      <Typography className="font-bold" color="blue-gray">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </div>
  );
}

export default InfoText;

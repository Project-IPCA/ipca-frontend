import { Typography } from "@material-tailwind/react";

interface Info {
  desc: string;
}

interface Props {
  title: string;
  infoList: Info[];
}

function InfoCard({ title, infoList }: Props) {
  return (
    <div className="px-8 py-20">
      <div className="mb-14 text-center ">
        <div className="text-center mb-10">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-4xl !leading-snug lg:text-[40px]"
          >
            {title}
          </Typography>
        </div>
        <div className="max-w-3xl mx-auto grid gap-4">
          {infoList.map(({ desc }, index) => (
            <div className="text-left" key={index}>
              <Typography variant="paragraph">
                {index + 1}. {desc}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;

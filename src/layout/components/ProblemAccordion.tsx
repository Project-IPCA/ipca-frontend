import { CheckIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItem,
  List,
} from "@material-tailwind/react";
import { useState } from "react";
interface Problem {
  index: number;
  name: string;
}

interface Props {
  index: number;
  title: string;
  problems: Problem[];
}
const ProblemAccordion = ({ title, problems }: Props) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleOpen = () => setOpen((cur) => !cur);

  return (
    <Accordion
      open={open}
      icon={
        <ChevronDownIcon
          strokeWidth={2.5}
          className={`mx-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      }
    >
      <ListItem className="p-0" selected={open}>
        <AccordionHeader
          onClick={() => toggleOpen()}
          className="border-b-0 p-3"
        >
          <Typography color="blue-gray" className="mr-auto font-normal">
            {title}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="pl-0 py-0">
          {problems.map((item, index) => (
            <ListItem key={index}>
              <div className="w-6 h-6 text-green-500">
                <CheckIcon />
              </div>
              <Typography className="pl-2">
                {item.index}. {item.name}
              </Typography>
            </ListItem>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default ProblemAccordion;

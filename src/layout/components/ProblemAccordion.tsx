import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  ListItem,
  List,
  Chip,
} from "@material-tailwind/react";
import { useState } from "react";
import { Chapter } from "../redux/submitCodeLayoutSlice";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { ALLOW_PROBLEM_TYPE } from "../../constants/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  data: Chapter;
  chapterIndex: number;
  onDrawerClose: () => void;
}
const ProblemAccordion = ({ data, chapterIndex, onDrawerClose }: Props) => {
  const [open, setOpen] = useState<boolean>(true);
  const navigate = useNavigate();
  const { chapter, problem } = useParams();
  const { t } = useTranslation();

  const toggleOpen = () => setOpen((cur) => !cur);

  const onChangeProblem = (chapterIdx: number, itemIdx: number) => {
    navigate(`/exercise/${chapterIdx}/${itemIdx}`);
    onDrawerClose();
  };

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
          <Chip
            value={
              data.allow_access_type === ALLOW_PROBLEM_TYPE.always
                ? t("feature.exercise_list.exercise.status.open")
                : t("feature.exercise_list.exercise.status.closed")
            }
            size="sm"
            color={
              data.allow_access_type === ALLOW_PROBLEM_TYPE.always
                ? "green"
                : "red"
            }
            className="mr-2"
          />
          <Typography color="blue-gray" className="mr-auto font-normal">
            {`${t("feature.exercise_list.exercise.unit")} ${chapterIndex} ${data.chapter_name}`}
          </Typography>
        </AccordionHeader>
      </ListItem>
      <AccordionBody className="py-1">
        <List className="pl-0 py-0">
          {data?.items.map((item, index) => (
            <ListItem
              key={index}
              className={`flex justify-between items-center 
                ${item.chapter_idx == Number(chapter) && item.item_idx == Number(problem) ? "bg-blue-gray-50" : ""}`}
              disabled={data.allow_access_type === ALLOW_PROBLEM_TYPE.deny}
              onClick={() => onChangeProblem(item.chapter_idx, item.item_idx)}
            >
              <div className="flex">
                {data.allow_access_type !== ALLOW_PROBLEM_TYPE.always && (
                  <div className="w-6 h-6">
                    <LockClosedIcon />
                  </div>
                )}
                <Typography className="pl-2">
                  {t("layout.submit_code.menu.problem")} {item.item_idx}
                </Typography>
              </div>
              <Chip
                value={`${item.marking}/${item.full_mark}`}
                color={item.marking === item.full_mark ? "green" : "blue-gray"}
              />
            </ListItem>
          ))}
        </List>
      </AccordionBody>
    </Accordion>
  );
};

export default ProblemAccordion;

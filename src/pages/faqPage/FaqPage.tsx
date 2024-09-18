import { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FAQ } from "../../constants/constants";
import PageContainer from "../PageContainer";

function FaqPage() {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <PageContainer>
      <section className="px-8 py-20">
        <div className="container mx-auto">
          <div className="mb-14 text-center ">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 text-4xl !leading-snug lg:text-[40px]"
            >
              Frequently asked questions
            </Typography>
            <Typography className="mx-auto font-normal text-[18px] !text-gray-500 lg:max-w-3xl">
              A lot of people don&apos;t appreciate the moment until it&apos;s
              passed. I&apos;m not trying my hardest, and I&apos;m not trying to
              do.
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto grid gap-6">
            {FAQ.map(({ title, desc }, index) => (
              <Accordion open={open === index + 1} key={index}>
                <AccordionHeader onClick={() => handleOpen(index + 1)}>
                  {title}
                </AccordionHeader>
                <AccordionBody>{desc}</AccordionBody>
              </Accordion>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

export default FaqPage;

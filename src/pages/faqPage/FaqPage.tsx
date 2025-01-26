import { useState } from "react";
import {
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import PageContainer from "../PageContainer";
import { useTranslation } from "react-i18next";

function FaqPage() {
  const [open, setOpen] = useState(0);
  const { t } = useTranslation();
  const faqs = Array.isArray(
    t("page.faq.list", {
      returnObjects: true,
    }),
  )
    ? (t("page.faq.list", {
        returnObjects: true,
      }) as { title: string; desc: string }[])
    : [];

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
              {t("page.faq.title")}
            </Typography>
          </div>
          <div className="max-w-3xl mx-auto grid gap-6">
            {faqs.map(({ title, desc }, index) => (
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

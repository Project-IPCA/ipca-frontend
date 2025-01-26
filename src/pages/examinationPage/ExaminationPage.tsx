import { useTranslation } from "react-i18next";
import { InfoCard } from "../../components";
import PageContainer from "../PageContainer";
import { useMemo } from "react";

function ExaminationPage() {
  const { t } = useTranslation();
  const exams = Array.isArray(
    t("page.examination.list", {
      returnObjects: true,
    }),
  )
    ? (t("page.examination.list", {
        returnObjects: true,
      }) as string[])
    : [];

  const examsObj = useMemo(() => exams.map((ex) => ({ desc: ex })), [t]);

  return (
    <PageContainer>
      <div className="container mx-auto">
        <InfoCard title={t("page.examination.title")} infoList={examsObj} />
      </div>
    </PageContainer>
  );
}

export default ExaminationPage;

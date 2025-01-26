import PageContainer from "../PageContainer";
import { InfoCard } from "../../components";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

function InstructionsPage() {
  const { t } = useTranslation();

  const instructions = Array.isArray(
    t("page.instructions.list", { returnObjects: true }),
  )
    ? (t("page.instructions.list", { returnObjects: true }) as string[])
    : [];

  const instructionsObj = useMemo(
    () => instructions.map((ins) => ({ desc: ins })),
    [t],
  );

  return (
    <PageContainer>
      <div className="container mx-auto">
        <InfoCard
          title={t("page.instructions.title")}
          infoList={instructionsObj}
        />
      </div>
    </PageContainer>
  );
}

export default InstructionsPage;

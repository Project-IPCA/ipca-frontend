import { InfoCard } from "../../components";
import { EXAMINATION } from "../../constants/constants";
import PageContainer from "../PageContainer";

function ExaminationPage() {
  return (
    <PageContainer>
      <div className="container mx-auto">
        <InfoCard title={"การสอบปฏิบัติ"} infoList={EXAMINATION} />
      </div>
    </PageContainer>
  );
}

export default ExaminationPage;

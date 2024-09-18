import PageContainer from "../PageContainer";
import { InfoCard } from "../../components";
import { INSTRUCTIONS } from "../../constants/constants";

function InstructionsPage() {
  return (
    <PageContainer>
      <div className="container mx-auto">
        <InfoCard title={"ข้อแนะนำการใช้งาน"} infoList={INSTRUCTIONS} />
      </div>
      ;
    </PageContainer>
  );
}

export default InstructionsPage;

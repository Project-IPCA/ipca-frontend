import { InfoCard } from "../../components";
import { EXAMINATION } from "../../constants/constants";

function Examination() {
  return (
    <div className="container mx-auto">
      <InfoCard title={"การสอบปฏิบัติ"} infoList={EXAMINATION} />
    </div>
  );
}

export default Examination;

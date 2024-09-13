import { InfoCard } from "../../components";
import { INSTRUCTIONS } from "../../constants/constants";

function Instructions() {
  return (
    <div className="container mx-auto">
      <InfoCard title={"ข้อแนะนำการใช้งาน"} infoList={INSTRUCTIONS} />
    </div>
  );
}

export default Instructions;

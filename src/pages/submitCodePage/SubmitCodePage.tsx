import { SubmitCode } from "../../features/sumbitCode";
import PageContainer from "../PageContainer";

function SubmitCodePage() {
  return (
    <PageContainer submitCodePage={true}>
      <SubmitCode />
    </PageContainer>
  );
}

export default SubmitCodePage;

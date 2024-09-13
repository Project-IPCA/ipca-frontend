import { ReactNode } from "react";

const PageContainer = (props: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center w-screen md:mt-20 mt-14">
      <div className="px-8 py-4 w-full">{props.children}</div>
    </div>
  );
};

export default PageContainer;

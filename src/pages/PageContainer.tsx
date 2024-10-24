import { ReactNode } from "react";

const PageContainer = (props: {
  children: ReactNode;
  submitCodePage?: boolean;
}) => {
  return (
    <div
      className={`flex justify-center items-center w-screen  ${props.submitCodePage ? "h-screen mt-0" : "md:mt-20 mt-14"}`}
    >
      <div
        className={`px-8  w-full ${props.submitCodePage ? "lg:h-full lg:pt-24 pt-64  pb-6" : "py-4"}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default PageContainer;

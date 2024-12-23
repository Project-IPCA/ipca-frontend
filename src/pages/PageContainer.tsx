import { ReactNode } from "react";

const PageContainer = (props: {
  children: ReactNode;
  submitCodePage?: boolean;
}) => {
  return (
    <div
      className={`md:flex md:justify-center md:items-center w-screen md:mb-0 mb-14  ${props.submitCodePage ? "h-screen lg:mt-0 md:mt-8 mt-24" : " md:mt-24 mt-20"}`}
    >
      <div
        className={`px-8  w-full ${props.submitCodePage ? "lg:h-full lg:pt-24   pb-6" : "py-4"}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default PageContainer;

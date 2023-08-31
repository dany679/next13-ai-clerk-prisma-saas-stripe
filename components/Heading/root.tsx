import { ReactNode } from "react";

const HeadingRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      {children}
    </div>
  );
};

export default HeadingRoot;

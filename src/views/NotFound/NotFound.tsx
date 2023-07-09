import React from "react";

interface NotFoundProps {
  errorMessage: string;
}

const NotFound: React.FC<NotFoundProps> = ({ errorMessage }) => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center flex-col pb-60">
      <div className="text-6xl text-orange-600 font-bold">404</div>
      <div className="text-xl text-gray-700 mt-4 text-center">
        {errorMessage}
      </div>
    </div>
  );
};

export default NotFound;

'use client'

import {useEffect} from "react";

const MainErrorPage = ({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) => {
   useEffect(() => {
      console.error(error)
   }, [error])
   
    return (
       <div className="w-full flex flex-col items-center">
          <p className="text-2xl">We've hit a snag!</p>
          <button onClick={reset}>
             Try again
          </button>
       </div>
    );
};

export default MainErrorPage;
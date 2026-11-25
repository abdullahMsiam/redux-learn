import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Counter = ({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
}) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => Math.min(prev + step, max));
  const decrement = () => setCount((prev) => Math.max(prev - step, min));
  const reset = () => setCount(initialValue);

  return (
   <div className="h-screen flex items-center justify-center">
     <div className=" flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm w-56">
      <span className="text-7xl font-bold text-gray-800 mb-4 tabular-nums">
        {count}
      </span>

      <div className="flex items-center gap-2">
        <Button onClick={decrement} disabled={count <= min}>
          -
        </Button>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={increment} disabled={count >= max}>
          +
        </Button>
      </div>
    </div>
   </div>
  );
};

export default Counter;

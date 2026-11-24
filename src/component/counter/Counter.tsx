import React, { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1, min = -Infinity, max = Infinity }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => Math.min(prev + step, max));
  const decrement = () => setCount((prev) => Math.max(prev - step, min));
  const reset = () => setCount(initialValue);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm w-56">
      <span className="text-4xl font-bold text-gray-800 mb-4 tabular-nums">
        {count}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={decrement}
          disabled={count <= min}
          aria-label="Decrement"
          className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          -
        </button>

        <button
          onClick={reset}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 active:scale-95 transition cursor-pointer"
        >
          Reset
        </button>

        <button
          onClick={increment}
          disabled={count >= max}
          aria-label="Increment"
          className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-95 transition disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
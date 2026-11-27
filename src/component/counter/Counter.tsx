import { Button } from "@/components/ui/button";
import { decrement, increment } from "@/redux/counter/counterSlice";
import type { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {

    const value = useSelector((state: RootState ) => state.counter.value); 
    const dispatch = useDispatch(); 

  return (
   <div className="h-screen flex items-center justify-center">
     <div className=" flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm w-56">
      <span className="text-7xl font-bold text-gray-800 mb-4 tabular-nums">
        {value}
      </span>

      <div className="flex items-center gap-2">
        <Button onClick={() => dispatch(decrement())} disabled={value <= 0}>
          -
        </Button>
        {/* <Button onClick={() => dispatch(reset())}>Reset</Button> */}
        <Button onClick={() => dispatch(increment())} disabled={value >= 10}>
          +
        </Button>
      </div>
    </div>
   </div>
  );
};

export default Counter;

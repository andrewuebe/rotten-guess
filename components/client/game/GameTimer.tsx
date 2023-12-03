import { useState, useEffect, useRef, useMemo } from "react";

interface GameTimerProps {
  date: string | Date | null | undefined;
  onTimeUp: () => void;
}

export default function GameTimer({ date, onTimeUp }: GameTimerProps) {
  const targetDate = (typeof date === "string") ? new Date(date) : date;

  const calculateTimeRemaining = (date: Date | null | undefined) => {
    if (!date) return 0; // Return 0 if date is null or undefined
    const now = new Date();
    const timeRemaining = date.getTime() - now.getTime();
    return Math.floor(timeRemaining / 1000);
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(targetDate));

  const timeUpCalled = useRef(false); // useRef to keep track

  useEffect(() => {
    // Resetting timeUpCalled whenever targetDate changes
    timeUpCalled.current = false;

    const intervalId = setInterval(() => {
      const newTimeRemaining = calculateTimeRemaining(targetDate);
      setTimeRemaining(newTimeRemaining);
      if (newTimeRemaining <= 0 && !timeUpCalled.current) {
        clearInterval(intervalId); // Stop the interval
        onTimeUp(); // Call the onTimeUp function
        timeUpCalled.current = true; // Mark that onTimeUp has been called
      }
    }, 1000);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [targetDate, onTimeUp]);

  const timerColorSize = useMemo(() => {
    if (timeRemaining > 12) {
      return 'bg-pumpkin-400 scale-100';
    }
    if (timeRemaining > 8) {
      return 'bg-tomato-soup-200 scale-120';
    }
    return 'bg-tomato-soup-300 scale-125';
  }, [timeRemaining]);

  return (
    <div>
      <div className={`absolute rounded-full w-[36px] h-[36px] bg-tomato-soup-300 scale-125 animate-ping ${timeRemaining <= 5 ? 'block' : 'hidden'}`}></div>
      <div className={`rounded-full border-2 border-eggplant-800 w-[36px] h-[36px] flex flex-col items-center justify-center transition-all font-bold ${timerColorSize}`}>
        {timeRemaining > 0 ? timeRemaining : "!"}
      </div>
    </div>
  );
}

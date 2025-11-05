"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  endDate: Date;
}

export function Countdown({ endDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const end = endDate.getTime();
      const difference = end - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const formatTime = (value: number) => String(value).padStart(2, "0");

  return (
    <div className="flex gap-4">
      <div className="text-center">
        <div className="text-3xl font-bold text-[#6EE7F9]">{formatTime(timeLeft.days)}</div>
        <div className="text-xs text-[#a1a1aa] uppercase">Days</div>
      </div>
      <div className="text-3xl font-bold text-[#a1a1aa]">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#6EE7F9]">{formatTime(timeLeft.hours)}</div>
        <div className="text-xs text-[#a1a1aa] uppercase">Hours</div>
      </div>
      <div className="text-3xl font-bold text-[#a1a1aa]">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#6EE7F9]">{formatTime(timeLeft.minutes)}</div>
        <div className="text-xs text-[#a1a1aa] uppercase">Minutes</div>
      </div>
      <div className="text-3xl font-bold text-[#a1a1aa]">:</div>
      <div className="text-center">
        <div className="text-3xl font-bold text-[#6EE7F9]">{formatTime(timeLeft.seconds)}</div>
        <div className="text-xs text-[#a1a1aa] uppercase">Seconds</div>
      </div>
    </div>
  );
}


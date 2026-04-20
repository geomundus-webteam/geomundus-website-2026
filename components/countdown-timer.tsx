"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const countDownDate = new Date(targetDate);
    if (isNaN(countDownDate.getTime())) {
      console.error("Invalid targetDate:", targetDate);
      return;
    }

    const countDown = countDownDate.getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDown - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsVisible(false);
        return;
      }

      setDays(Math.floor(distance / day));
      setHours(Math.floor((distance % day) / hour));
      setMinutes(Math.floor((distance % hour) / minute));
      setSeconds(Math.floor((distance % minute) / second));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="bg-emerald-700 text-white p-4 rounded-lg">
          <div className="text-4xl font-bold">{days}</div>
          <div className="text-sm uppercase">Days</div>
        </div>
        <div className="bg-emerald-700 text-white p-4 rounded-lg">
          <div className="text-4xl font-bold">{hours}</div>
          <div className="text-sm uppercase">Hours</div>
        </div>
        <div className="bg-emerald-700 text-white p-4 rounded-lg">
          <div className="text-4xl font-bold">{minutes}</div>
          <div className="text-sm uppercase">Minutes</div>
        </div>
        <div className="bg-emerald-700 text-white p-4 rounded-lg">
          <div className="text-4xl font-bold">{seconds}</div>
          <div className="text-sm uppercase">Seconds</div>
        </div>
      </div>
    </div>
  );
}

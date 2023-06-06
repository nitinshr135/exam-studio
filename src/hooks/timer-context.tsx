import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const TimerContext = createContext<any>({} as any);

export const TimerProvider = ({ children }: { children: ReactNode }) => {
  const [startTimer, setStartTimer] = useState(true);
  const [timerDurationInSecs, setTimerDurationInSecs] = useState(0);

  useEffect(() => {
    let totalSeconds = timerDurationInSecs;

    const interval = setInterval(() => {
      totalSeconds--;

      if (totalSeconds === 0) {
        clearInterval(interval);
      }

      setTimerDurationInSecs(totalSeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTimer, timerDurationInSecs]);

  return (
    <TimerContext.Provider
      value={{
        startTimer,
        setStartTimer,
        timerDurationInSecs,
        setTimerDurationInSecs,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const UseTimer = () => {
  const context = useContext<any>(TimerContext);
  return context;
};

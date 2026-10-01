import dayjs from "dayjs";
import { locale } from './Settings'
import {
    createContext,
    useContext,
    useEffect,
    useState
  } from "react";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
const TimerContext = createContext(null);

export function TimerProvider({children}) {

    const [timersDuration, setTimersDuration] = useState(10);
    const [timerDuration, setTimerDuration] = useState(dayjs.duration(timersDuration, 's'));
    const [timeLeft, setTimeLeft] = useState(timerDuration);
    const [timerIsRunning, setTimerIsRunning] = useState(false);
    const [timerDone, setTimerDone] = useState(false);
   
    const start = () => {
      setTimerIsRunning(true);
  
    }
    const pause = () => {
      setTimerIsRunning(false);
    }
    const reset = () => {
      setTimeLeft(timerDuration);
      setTimerIsRunning(false);
     // setTimerDone(false);
    }
    useEffect(() => {
      if (!timerDuration) return
      if (!timerIsRunning) return
      if (!timeLeft) return
      if (timeLeft.asSeconds() <= 0) return
  
      const timeInterval = setInterval(() => {
        setTimeLeft(prev => {
            if (prev.asSeconds() <= 1) {
              setTimerIsRunning(false);
              setTimerDone(true);
              console.log('done');
              return dayjs.duration(0, 's')
            }
            return prev.subtract(1, 's')
          });
      }, 1000);
  
      return () => clearInterval(timeInterval);
    }, [timerDuration, timerIsRunning]);
  
    useEffect(() => {
      if (!timerDone) return
      if(timeLeft.asSeconds() >= 1) return
  
  
      reset();
      playChime(timerChime)
    })

    const [timerChime, setTimerChime] = useState('/airplane-chime.mp3');
    const playChime = (c) => {
      const audio = new Audio(c);
      console.log(c);
      console.log(audio);
      audio.play().catch(e => {
        console.log('audio cannot play', e);
      })
    };

    return (
        <TimerContext.Provider
            value={{
                timersDuration,
                timerDuration,
                timeLeft,
                timerIsRunning, 
                timerDone,
                start,
                pause,
                reset,
                timerChime,
                setTimerChime,
                playChime
            }}
        >
            {children}
        </TimerContext.Provider>
    );
}
export function useTimer() {
    const context = useContext(TimerContext);

    if (!context) {
        throw Error('no contex');
    }

    return context;
}



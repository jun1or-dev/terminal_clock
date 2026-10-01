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

const PomodoroContext = createContext(null);

export function PomodoroProvider({children}) {
    const [pomosDuration, setPomosDuration] = useState(25);
    const [pomoDuration, setPomoDuration] = useState(dayjs.duration(pomosDuration, 'm'));
    const [pomoTimeLeft, setPomoTimeLeft] = useState(pomoDuration);
    const [pomoIsRunning, setPomoIsRunning] = useState(false);
    const [pomoDone, setPomoDone] = useState(false);
   
    const start = () => {
      setPomoIsRunning(true);
  
    }
    const pause = () => {
      setPomoIsRunning(false);
    }
    const reset = () => {
      setPomoTimeLeft(pomoDuration);
      setPomoIsRunning(false);
     // setTimerDone(false);
    }
    const changeTimer = (t) => {
      const newDuration = dayjs.duration(t, 'm')
      setPomosDuration(t);
      setPomoDuration(newDuration);
      setPomoTimeLeft(newDuration);
      setPomoIsRunning(false);
      
    }
    useEffect(() => {
      if (!pomoDuration) return
      if (!pomoIsRunning) return
      if (!pomoTimeLeft) return
      if (pomoTimeLeft.asSeconds() <= 0) return
  
      const timeInterval = setInterval(() => {
        setPomoTimeLeft(prev => {
            if (prev.asSeconds() <= 1) {
              setPomoIsRunning(false);
              setPomoDone(true);
              console.log('done');
              return dayjs.duration(0, 's')
            }
            return prev.subtract(1, 's')
          });
      }, 1000);
  
      return () => clearInterval(timeInterval);
    }, [pomoDuration, pomoIsRunning]);

    const [pomoChime, setPomoChime] = useState('/airplane-chime.mp3');
    const playChime = () => {
      const audio = new Audio(pomoChime);
      console.log(pomoChime);
      console.log(audio);
      audio.play().catch(e => {
        console.log('audio cannot play', e);
      })
    };

    useEffect(() => {
      if (!pomoDone) return
      if(pomoTimeLeft.asSeconds() >= 1) return
  
  
      reset();
      playChime();
      
    }, [pomoDone, pomoTimeLeft])

    return (
        <PomodoroContext.Provider
            value={{
                pomosDuration,
                pomoDuration,
                pomoTimeLeft,
                pomoIsRunning, 
                pomoDone,
                start,
                pause,
                reset,
                changeTimer,
                playChime,
                pomoChime,
                setPomoChime
            }}
        >
            {children}
        </PomodoroContext.Provider>
    );
}
export function usePomodoro() {
    const context = useContext(PomodoroContext);

    if (!context) {
        throw Error('no contex');
    }

    return context;
}
import {
    createContext,
    useContext,
    useEffect,
    useState
  } from "react";
  import dayjs from 'dayjs';

  const StopwatchContext = createContext(null);

  export function StopwatchProvide({children}) {

    const [startTime, setStartTime] = useState()
    const [elapsed, setElapsed] = useState(0)
    const [isRunning, setIsRunning] = useState(false);
   
  //start the stopwatch
    const start = () => {
      setStartTime(dayjs());
      setIsRunning(true)
    }
    //pause the stopwatch
    const pause = () => {
      setIsRunning(false)
    }
    //resume the stopwatch
    const resume = () => {
      setStartTime(dayjs().subtract(elapsed, 'ms'))
      setIsRunning(true)
    }
    //reset the stopwatch 
    const reset = () => {
      setStartTime(null)
      setElapsed(0)
      setIsRunning(false)
    }
    //stuff to do when the stopwatch updates (every 10ms)
    useEffect(() => {
        //don't play if there is not a start time or if it's
        //not running
        if (!startTime) return
        if (!isRunning) return 
        //every 10ms, set currentTime and calculate elapsedTime
        const timeInterval = setInterval(() => {
          const currentTime = dayjs();
          setElapsed(currentTime.diff(startTime));
        }, 10);

      return () => clearInterval(timeInterval);
    }, [isRunning, startTime]);

    return (
        //provider with the variables to pass down
        <StopwatchContext.Provider
            value={{
                startTime, 
                setStartTime,
                elapsed,
                setElapsed,
                isRunning,
                setIsRunning,
                start,
                pause,
                resume,
                reset
            }}
        >
            {children}
        </StopwatchContext.Provider>
    );
  }

  export function useStopwatch() {
    const context = useContext(StopwatchContext);

    if (!context) {
        throw Error('no contex');
    }

    return context;
}
import {
    createContext,
    useContext,
    useEffect,
    useState
  } from "react";
import { StopwatchProvide } from './stopwatchContext';
import { TimerProvider } from './TimerProvider';
import { PomodoroProvider } from './PomodoroProvider';

const AppContext = createContext(null)
export default function AppProvider({children}) {
    const [locale, setLocale] = useState(navigator.language||navigator.userLanguage);
    // const click = () => {
    //     const audio = new Audio('/mouse-click.mp3');
    //   console.log(audio);
    //   audio.play().catch(e => {
    //     console.log('audio cannot play', e);
    //   })
    // }

    return (
        <AppContext.Provider value={{locale, setLocale}}>
        <StopwatchProvide>
            <TimerProvider>
                <PomodoroProvider>
                {children}
                </PomodoroProvider>
            </TimerProvider>
        </StopwatchProvide>
        </AppContext.Provider>
    )
}
export function useApp() {
    return useContext(AppContext);
}
import "./styles.css";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";

import { useState, useEffect, createContext, useContext } from "react";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import i18n from "./i18next";

import bum from './locale';
import NavBar from './Navbar'
import Clock from './clock';
import Stopwatch from './stopwatch';
import Timer from './Timer';
import Pomodoro from './Pomodoro';
import Settings from './Settings';
import { useApp } from "./appContext";
import AppProvider from './appContext';
dayjs.extend(updateLocale)
dayjs.extend(duration);
dayjs.extend(localizedFormat);
require("dayjs/locale/ja");
require("dayjs/locale/ko");
require("dayjs/locale/zh");
require("dayjs/locale/zh-tw");
require("dayjs/locale/fr");
require("dayjs/locale/es");
require("dayjs/locale/en-gb");
function AppContent() {
  const { locale, click } = useApp();
  const [navToggled, setNavToggled] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest(".click")) {
        const audio = new Audio("/mouse-click.mp3");
        console.log(audio)
        audio.play().catch(e => {
          console.log('audio cannot play', e);
        })
      }
    };
    

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  
  return (
    <div className={navToggled ? 'layout expanded' : 'layout'}>
      <NavBar 
        navToggled={navToggled}
        setNavToggled={setNavToggled}
        locale={locale}
      />
      <div className="App">
       <Routes>
          <Route
            path='/'
            element={<Clock locale={locale} click={click}/>}
          />
         <Route
           path='/stopwatch'
           element={<Stopwatch locale={locale}/>}
          />
         <Route 
          path='/timer'
          element={<Timer locale={locale}/>}
          />
        <Route
          path='/pomodoro'
          element={<Pomodoro locale={locale}/>} 
        />
        <Route
          path='/menu'
          element={<Settings />}
        />
      </Routes>
    </div>
    </div>
  )
}
export default function App() {
  
  return (
    <BrowserRouter>
      <AppProvider >
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

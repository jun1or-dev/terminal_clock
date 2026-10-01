import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";

import { useState, useEffect, createContext, useContext } from "react";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import i18n from "./i18next";

import { usePomodoro } from './PomodoroProvider';
export default function Pomodoro({locale}) {
  const { t, i18n } = useTranslation();
  const {
      pomosDuration,
      pomoDuration,
      pomoTimeLeft,
      pomoIsRunning, 
      pomoDone,
      start,
      pause,
      reset,
      changeTimer
  } = usePomodoro();

  useEffect(() => {
      i18n.changeLanguage(locale.name ? locale.name : locale);
    }, [i18n, locale]);
  

  return (
    <div className="el-container">
      <div className={pomosDuration == 25 &&pomoIsRunning
        ? 'head-div work' 
        : pomosDuration == 5 && pomoIsRunning
          ? 'head- div pause' 
          : pomosDuration==15 && pomoIsRunning
            ? 'head-div l-pause' 
            : 'head-div'}>
        <button className='el-btn click focus' onClick={() => changeTimer(25)}>
          {t('focus')}
        </button>
        <button className='el-btn click pause' onClick={() => changeTimer(5)}>
          {t('rest')}
        </button>
        <button className='el-btn click l-pause' onClick={() => changeTimer(15)}>
          {t('long rest')}
        </button>
      </div>
      <div className="time-div">
        {pomoTimeLeft.format('mm:ss')}
      </div>
      <div className="head-div">
        <button 
        className="el-btn click"
        onClick={
          !pomoDuration == pomoTimeLeft 
            ? start
            : pomoIsRunning
              ? pause
              : start
        }
        >
        {pomoDuration == pomoTimeLeft
              ? t('start')
              : pomoIsRunning
                ? t('pause')
                : t('resume')}
        </button>
        <button className='el-btn' onClick={reset}>{t('reset')}</button>
      </div>
    </div>
  )
}

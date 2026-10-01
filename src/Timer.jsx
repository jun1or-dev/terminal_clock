import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";

import { useState, useEffect, createContext, useContext } from "react";
import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import i18n from "./i18next";

import { useTimer } from './TimerProvider';

export default function Timer({locale}) {
    const { t, i18n } = useTranslation();
    const {
        timersDuration,
        timerDuration,
        timeLeft,
        timerIsRunning, 
        timerDone,
        start,
        pause,
        reset
    } = useTimer();

    useEffect(() => {
        i18n.changeLanguage(locale.name ? locale.name : locale);
      }, [i18n, locale]);
    
  
    return (
      <div className="el-container">
        <div className="time-div">
          {timeLeft.format('mm:ss')}
        </div>
        <div className="head-div">
          <button 
          className="el-btn click"
          onClick={
            !timerDuration == timeLeft 
              ? start
              : timerIsRunning
                ? pause
                : start
          }
          >
          {timerDuration == timeLeft
                ? t('start')
                : timerIsRunning
                  ? t('pause')
                  : t('resume')}
          </button>
          <button className='el-btn' onClick={reset}>{t('reset')}</button>
        </div>
      </div>
    )
  }
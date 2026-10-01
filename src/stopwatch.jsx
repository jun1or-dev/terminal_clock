import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useState, useEffect, createContext, useContext } from "react";
import React, { Suspense } from "react";
import i18n from "./i18next";
import { useTranslation } from "react-i18next";
import duration from "dayjs/plugin/duration";
import updateLocale from "dayjs/plugin/updateLocale";
import { useStopwatch } from "./stopwatchContext";

export default function Stopwatch({locale}) {
    const { t, i18n } = useTranslation();
    const {
        startTime,
        elapsed,
        isRunning,
        start,
        pause,
        resume,
        reset
    } = useStopwatch();
    let swTime = dayjs.duration();
   
 
  
    useEffect(() => {
      i18n.changeLanguage(locale.name ? locale.name : locale);
    }, [i18n]);
    
    swTime =dayjs.duration(elapsed);
    const timeString = 
      swTime.asHours() >= 1 
        ? 'HH:mm:ss'
        : swTime.asMinutes() >= 1
          ? 'mm:ss'
          : 'ss';
  
    return(
      <div className="el-container">
        <div className="time-div">
          {swTime.format(timeString)}
          <span className='sec-span'>
            {swTime.format('SSS')}
          </span>
        </div>
        <div className="head-div">
          <button
              className="el-btn click"
              onClick={
                !startTime 
                  ? start
                  : isRunning
                    ? pause
                    : resume
              }
            >
              {!startTime
                ? t('start')
                : isRunning
                  ? t('pause')
                  : t('resume')}
            </button>
          <button className='el-btn' onClick={reset}>{t('reset')}</button>
        </div>
      </div>
    )
  }
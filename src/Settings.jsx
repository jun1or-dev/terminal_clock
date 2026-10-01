import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useApp } from "./appContext";
import { useTimer } from './TimerProvider';
import { usePomodoro } from './PomodoroProvider';

export default function Settings() {
    const { t, i18n } = useTranslation();
    const {locale, setLocale } = useApp();
    const { timerChime, setTimerChime, playChime} = useTimer();
    const { pomoChime, setPomoChime } = usePomodoro();
    useEffect(() => {
      i18n.changeLanguage(locale.name ? locale.name : locale);
    }, [i18n, locale]);
    useEffect(() => {
      console.log("chime changed:", timerChime);
    }, [timerChime]);
    useEffect(() => {
      console.log("chime changed:", pomoChime);
    }, [pomoChime]);
  
    return (
      <div>
        <h2>{t("settings")}</h2>
        <h3>{t('general')}</h3>
        <div className = 'setting-selector'>
          <label htmlFor='language'>{t("language")}</label>
          <select
              id='language'
              value={locale}
              onChange={(e) => {
                setLocale(e.target.value);
                console.log(locale);
              }}
          >
            <option value='fr'>Français</option>
            <option value='en'>English</option>
            <option value='es'>Español</option>
            <option value='zh-cn'>简体中文（普通话）</option>
            <option value='zh-tw'>繁體中文（國語）</option>
            <option value='ja'>日本語</option>
            <option value='ko'>한국어</option>
            <option value='bum'>bulu</option>
          </select>
        </div>
        <h3>{t('timer')}</h3>
        <label htmlFor='chimes'>{t("chime")}</label>
        <select
          id='chimes'
          value={timerChime}
          onChange={(e) => {
            setTimerChime(e.target.value);
            console.log();
            playChime(e.target.value)
          }}
        >
          <option value={'/bell-chime.mp3'}>{t('bell')}</option>
          <option value={'/airplane-chime.mp3'}>{t('airplane')}</option>
          <option value={'/wind-chime.mp3'}>{t('wind chime')}</option>
          <option value={'/airplane-chime.mp3'}>{t('gong')}</option>
        </select>
        <h3>{t('pomodoro')}</h3>
        <div className='setting-selector'>
        <label htmlFor='pomo-chimes'>{t("chime")}</label>
        <select
          id='pomo-chimes'
          value={pomoChime}
          onChange={(e) => {
            setPomoChime(e.target.value);
            console.log(pomoChime);
            playChime(e.target.value)
          }}
        >
          <option value={'/bell-chime.mp3'}>{t('bell')}</option>
          <option value={'/airplane-chime.mp3'}>{t('airplane')}</option>
          <option value={'/wind-chime.mp3'}>{t('wind chime')}</option>
          <option value={'/airplane-chime.mp3'}>{t('gong')}</option>
        </select>
        </div>
      </div>
    );
  }
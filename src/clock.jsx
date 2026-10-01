import dayjs from "dayjs";
//import localizedFormat from "dayjs/plugin/localizedFormat";

import { useState, useEffect, createContext, useContext } from "react";

export default function Clock({ locale, click }) {
    const [time, setTime] = useState('0');
    const [date, setDate] = useState();
    const [isShort, setIsShort] = useState(false);
  
    useEffect(() => {
      const timeInterval = setInterval(() => {
        const now = dayjs().locale(locale);
        setTime({
          hours: now.format("HH"),
          minutes: now.format("mm"),
          seconds: now.format("ss"),
        });
        setDate(now.format(isShort? 'L (dd)' : 'LL (dddd)'));
      }, 100);
  
      return () => clearInterval(timeInterval);
    }, [locale, isShort]);
  
    return (
      <>
      <div className="el-container">
        <div className="head-div click" onClick={() => setIsShort(prev => !prev)}>{date}</div>
        <div className="time-div click" onClick={click}>
          <span>{time.hours}</span>
          <span className="separator">:</span>
          <span>{time.minutes}</span>
          <span className="separator">:</span>
          <span>{time.seconds}</span>
        </div>
        {/* <div className="now-playing">
          <span className="n-playing-txt">
            now playing：</span><br/>
          <span className="song-name">
            開心餐廳</span><br/>
          <span className="artist-name">
            Crowd Lu</span>
        </div> */}
      </div>
      
      </>
    );
  }
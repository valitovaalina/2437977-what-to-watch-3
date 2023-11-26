import { timeTranslation } from '../consts';

export const getTimeLeft = (timeLeft: number) => {
  const formatTime = (time: number) => time > 9 ? time : `0${time}`;

  const hours = formatTime(Math.floor(timeLeft / timeTranslation / timeTranslation));
  const minutes = formatTime(Math.floor(timeLeft / timeTranslation - Math.floor(timeLeft / timeTranslation / timeTranslation) * timeTranslation));
  const seconds = formatTime(Math.floor(timeLeft % timeTranslation));

  const timeInActualFormat = `${minutes}:${seconds}`;
  return Number(hours) > 0 ? `${hours}:${timeInActualFormat}` : timeInActualFormat;
};

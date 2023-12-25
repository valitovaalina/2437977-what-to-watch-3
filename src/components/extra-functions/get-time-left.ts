import { TIME_TRANSLATION } from '@consts/consts';

export const getTimeLeft = (timeLeft: number) => {
  const formatTime = (time: number) => time > 9 ? time : `0${time}`;

  const hours = formatTime(Math.floor(timeLeft / TIME_TRANSLATION / TIME_TRANSLATION));
  const minutes = formatTime(Math.floor(timeLeft / TIME_TRANSLATION - Math.floor(timeLeft / TIME_TRANSLATION / TIME_TRANSLATION) * TIME_TRANSLATION));
  const seconds = formatTime(Math.floor(timeLeft % TIME_TRANSLATION));

  const timeInActualFormat = `${minutes}:${seconds}`;
  return Number(hours) > 0 ? `${hours}:${timeInActualFormat}` : timeInActualFormat;
};

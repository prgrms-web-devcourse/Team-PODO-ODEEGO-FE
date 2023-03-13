const formatTime = (remainingTime: string) => {
  const times = remainingTime.split(":");
  const minutes = Number(times[1]);
  const seconds = Math.floor(Number(times[2]));

  return {
    minutes,
    seconds,
  };
};

export default formatTime;

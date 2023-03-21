const formatTime = (remainingTime: string) => {
  const times = remainingTime.split(":");
  const minutes = Number(times[1]);
  const seconds = Math.floor(Number(times[2]));

  return {
    minutes,
    seconds,
  };
};

const stationNamesEqual = (
  o1: { stationName: string },
  o2: { stationName: string }
) => {
  return o1.stationName === o2.stationName.split(" ")[0];
};

const inputsEqual = (
  recoilState: { stationName: string }[],
  inputState: { stationName: string }[]
) =>
  recoilState.length === inputState.length &&
  recoilState.every((o, idx) => stationNamesEqual(o, inputState[idx]));

export { formatTime, inputsEqual };

import { COLORS } from "@/constants";
import { SHADOWS } from "@/constants/css";

const Station = (stationName: string) => {
  const style = `
    display: block;
    height: 2.6rem;
    text-align: center;
    padding: 0.5rem 1.2rem;
    box-sizing: border-box;
    background-color: ${COLORS.mainOrange};
    box-shadow: ${SHADOWS.backdropOrange};
    color: ${COLORS.backgroundSecondary};
    border-radius: 3rem;
  `;

  return `<div style="${style}">${stationName}</div>`;
};

const Avatar = () => {
  const style = `
    display: flex;
    justify-content: center;
    align-items: center; 
    box-shadow: ${SHADOWS.backdropGreenStrong};
    height: 2.7rem;
    width: 2.7rem;
    background-color: ${COLORS.mainGreen};
    border-radius: 5rem;
  `;

  return `<div style="${style}"><img src="/avatar.svg" alt="avatar" /></div>`;
};

export { Station, Avatar };

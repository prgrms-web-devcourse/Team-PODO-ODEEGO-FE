import { COLORS, SHADOWS } from "@/constants/css";
import styled from "@emotion/styled";
import { DirectionsSubwayFilledOutlined } from "@mui/icons-material";

interface MidwayButtonProps {
  name: string;
  coord: number[];
  isCurrent: boolean;
  onClick(coord: number[]): void;
}

const MidwayButton = ({
  onClick,
  name,
  coord,
  isCurrent,
}: MidwayButtonProps) => {
  const handleClick = () => {
    onClick(coord);
  };

  return (
    <Button onClick={handleClick}>
      <DirectionsSubwayFilledOutlined fontSize='large' />
      <span
        style={{
          color: isCurrent ? COLORS.textPrimary : COLORS.textSecondary,
        }}>
        {name}
      </span>
    </Button>
  );
};

export default MidwayButton;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  width: 6rem;
  height: 6rem;
  background-color: ${COLORS.backgroundSecondary};
  box-shadow: ${SHADOWS.backdropGreen};
  box-sizing: border-box;
  border-radius: 1.3rem;
`;

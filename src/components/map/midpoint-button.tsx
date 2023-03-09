import { COLORS, SHADOWS, SUBWAY } from "@/constants/css";
import styled from "@emotion/styled";
import { DirectionsSubwayFilledOutlined } from "@mui/icons-material";

interface MidPointButtonProps {
  stationName: string;
  isCurrent: boolean;
  onClick(id: string): void;
  id: string;
  line: keyof typeof SUBWAY;
}

const MidPointButton = ({
  onClick,
  stationName,
  isCurrent,
  id,
  line,
}: MidPointButtonProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Button onClick={handleClick}>
      <DirectionsSubwayFilledOutlined
        fontSize='large'
        sx={{ color: SUBWAY[line] }}
      />
      <span
        style={{
          color: isCurrent ? COLORS.textPrimary : COLORS.textSecondary,
        }}>
        {stationName}
      </span>
    </Button>
  );
};

export default MidPointButton;

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

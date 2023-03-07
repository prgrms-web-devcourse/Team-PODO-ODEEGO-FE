import { Button } from "@mui/material";

interface HomeButtonProps {
  onClick: () => void;
  hasCondition?: boolean;
  defaultText: string;
  altText?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "neutral"
    | undefined;
}

const HomeButton = ({
  color,
  onClick,
  hasCondition,
  defaultText,
  altText,
}: HomeButtonProps) => {
  return (
    <>
      <Button
        type='button'
        variant='contained'
        color={color ? color : "primary"}
        onClick={onClick}
        sx={{
          height: "4.5rem",
          borderRadius: "8px",
          textAlign: "center",
        }}>
        {hasCondition ? <span>{altText}</span> : <span>{defaultText}</span>}
      </Button>
    </>
  );
};

export default HomeButton;

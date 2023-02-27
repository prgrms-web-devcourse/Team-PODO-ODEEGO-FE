import { Button, CircularProgress } from "@mui/material";

interface HomeButtonProps {
  onClick: () => void;
  isLoading: boolean;
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
  isLoading,
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
        {isLoading ? (
          <CircularProgress
            size='2rem'
            sx={{
              color: "white",
            }}
          />
        ) : hasCondition ? (
          <span>{altText}</span>
        ) : (
          <span>{defaultText}</span>
        )}
      </Button>
    </>
  );
};

export default HomeButton;

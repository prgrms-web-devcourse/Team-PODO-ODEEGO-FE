import styled from "@emotion/styled";

interface PacManSpinnerProps {
  pacManSize: string;
  ballSize: string;
}

const PacManSpinner = ({ pacManSize, ballSize }: PacManSpinnerProps) => {
  return <PacManSpinnerContainer pacManSize={pacManSize} ballSize={ballSize} />;
};

export default PacManSpinner;

const PacManSpinnerContainer = styled.div<{
  pacManSize: string;
  ballSize: string;
}>`
  border-radius: 50%;
  margin: 0 auto;
  border-radius: 100em 100em 0 0;
  background: #f00;
  transform-origin: bottom;
  animation: eating-top 0.5s infinite;

  &,
  &::before {
    width: ${({ pacManSize }) => pacManSize};
    height: calc(${({ pacManSize }) => pacManSize} / 2);
    background: rgb(90, 178, 125);
  }

  &::before {
    content: "";
    display: block;
    margin-top: calc(${({ pacManSize }) => pacManSize} / 2);
    position: absolute;
    transform-origin: top;
    border-radius: 0 0 100em 100em;
    transform: rotate(80deg);
    animation: eating-bottom 0.5s infinite;
  }

  &::after {
    position: absolute;
    border-radius: 100em;
    content: "";
    display: block;
    height: ${({ ballSize }) => ballSize};
    width: ${({ ballSize }) => ballSize};
    margin-top: calc(
      (${({ pacManSize }) => pacManSize} / 2) -
        (${({ ballSize }) => ballSize} / 2)
    );
    margin-left: calc(
      (${({ pacManSize }) => pacManSize} / 2) -
        (${({ ballSize }) => ballSize} / 2)
    );
    transform-origin: center;
    animation: center 0.5s infinite, ball 0.5s -0.33s infinite linear;
  }

  @keyframes eating-top {
    0% {
      transform: rotate(-40deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-40deg);
    }
  }

  @keyframes eating-bottom {
    0% {
      transform: rotate(80deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(80deg);
    }
  }

  @keyframes center {
    0% {
      transform: rotate(40deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(40deg);
    }
  }

  @keyframes ball {
    0% {
      opacity: 0.7;
      box-shadow: 40px 0 0 0 rgba(90, 178, 125, 0.5),
        70px 0 0 0 rgba(90, 178, 125, 0.5), 100px 0 0 0 rgba(90, 178, 125, 0.5);
    }
    100% {
      box-shadow: 10px 0 0 0 rgba(90, 178, 125, 0.5),
        40px 0 0 0 rgba(90, 178, 125, 0.5), 70px 0 0 0 rgba(90, 178, 125, 0.5);
    }
  }
`;

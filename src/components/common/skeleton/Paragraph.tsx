import Box from "./Box";

const Paragraph = ({ line = 3, ...props }) => {
  return (
    <div {...props}>
      <Box width='70%' height='1.8rem'></Box>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box key={index} width='12.4rem' height='12.4rem' />
        ) : (
          <Box key={index} width='10rem' height='12.4rem' />
        )
      )}
    </div>
  );
};

export default Paragraph;

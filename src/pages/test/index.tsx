import axios from "axios";

export const Test = () => {
  axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_API_END_POINT}/api/hello/simple`,
  }).then((res) => console.log(res));

  return (
    <>
      <h1>ENV TEST PAGE</h1>
    </>
  );
};

export default Test;

import { GetServerSideProps } from "next";

interface RoomPageProps {
  data: { message: string };
}

const RoomPage = ({ data }: RoomPageProps) => {
  const num = +(data.message.split(" ").at(-1) as string);
  console.log(num);
  return <div>RoomPage</div>;
};

export default RoomPage;

export const getServerSideProps: GetServerSideProps<{
  data: RoomPageProps;
}> = async ({ params }) => {
  // 404 Page if no params
  if (!params) {
    return {
      notFound: true,
    };
  }

  const roomId = params.roomId;
  const res = await fetch(
    `${process.env.NEXT_HELLO_API_ENDPOINT}/api/hello/query-parameter?query=${roomId}`
  );
  const data = await res.json();

  // Redirect home if no data
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
};

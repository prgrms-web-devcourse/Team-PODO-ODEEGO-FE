interface SetStartPointModalprops {
  startingPoint: string;
}

export const SetStartPointModalContent = ({
  startingPoint,
}: SetStartPointModalprops) => {
  return (
    <>
      <p>{startingPoint}</p>
      <p>출발역은 수정할 수 없습니다.</p>
    </>
  );
};

export default SetStartPointModalContent;

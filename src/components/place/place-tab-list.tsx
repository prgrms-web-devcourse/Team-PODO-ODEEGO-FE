import styled from "@emotion/styled";

const PlaceTabList = () => {
  const tab = [
    {
      id: 1,
      name: "전체",
      category: "total",
    },
    {
      id: 2,
      name: "카페",
      category: "cafe",
    },
    {
      id: 3,
      name: "레스토랑",
      category: "restaurant",
    },
  ];

  return (
    <SearchCategory>
      {tab.map(({ name, id, category }): any => {
        return <TabItem key={id}>{name}</TabItem>;
      })}
    </SearchCategory>
  );
};
export default PlaceTabList;

const SearchCategory = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 3rem;
  border-radius: 10px;
  padding: 0.5rem;
`;

const TabItem = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  cursor: pointer;
  &:hover {
    color: #fdfdfd;
    background-color: #5ab27d;
    border-radius: 50px;
    padding: 0 1rem;
  }
`;

import { COLORS } from "@/constants/css";
import { tabState } from "@/recoil/search-state";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

interface TabProps {
  id: number;
  name: string;
  category: string;
}

const PlaceTabList = () => {
  const setTitle = useSetRecoilState(tabState);
  const [activeId, setActiveId] = useState(1);

  const tab = [
    {
      id: 1,
      name: "전체",
      category: "",
    },
    {
      id: 2,
      name: "카페",
      category: "CAFE",
    },
    {
      id: 3,
      name: "레스토랑",
      category: "RESTAURANT",
    },
  ];

  const handleClick = (val: string, id: number) => {
    setTitle(val);

    setActiveId(id);
  };

  return (
    <SearchCategory>
      {tab.map(({ id, name, category }: TabProps) => {
        return (
          <TabItem onClick={() => handleClick(category, id)} key={id}>
            <span className={activeId === id ? "active" : ""}>{name}</span>
          </TabItem>
        );
      })}
    </SearchCategory>
  );
};
export default PlaceTabList;

const SearchCategory = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
  margin-left: 1rem;
`;

const TabItem = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  cursor: pointer;

  .active {
    color: #fdfdfd;
    background-color: ${COLORS.backgroundAccent};
    border-radius: 50px;
    padding: 0.4rem 1rem;
  }
`;

const TabSpan=styled.span`

`

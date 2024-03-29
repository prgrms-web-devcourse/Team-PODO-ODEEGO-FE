import { COLORS } from "@/constants/css";
import { tabState } from "@/recoil/search-state";
import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

interface TabProps {
  id: number;
  name: string;
  category: string;
}

const PlaceTabList = () => {
  const setTabValue = useSetRecoilState(tabState);
  const [activeId, setActiveId] = useState(1);

  const tab = [
    {
      id: 1,
      name: "전체보기",
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
    setTabValue(val);
    setActiveId(id);
  };

  useEffect(() => {
    return () => {
      setTabValue("");
    };
  }, []);

  return (
    <SearchCategory>
      {tab.map(({ id, name, category }: TabProps) => {
        return (
          <TabItem
            className={activeId === id ? "active" : ""}
            onClick={() => handleClick(category, id)}
            key={id}>
            <span>{name}</span>
          </TabItem>
        );
      })}
    </SearchCategory>
  );
};
export default PlaceTabList;

const SearchCategory = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
`;

const TabItem = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  border-radius: 50px;
  padding: 0.8rem 1.8rem;
  flex: 0 1 auto;
  text-align: center;

  &.active {
    color: #fdfdfd;
    background-color: ${COLORS.backgroundAccent};
  }
`;

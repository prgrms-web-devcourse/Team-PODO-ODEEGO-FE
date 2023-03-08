import { COUNT } from "@/constants/local-storage";
import { setLocalStorage } from "@/utils/storage";
import styled from "@emotion/styled";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

interface SelectProps {
  isValid: boolean;
}

const SelectModal = ({ isValid }: SelectProps) => {
  const [count, setCount] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setLocalStorage(COUNT, e.target.value);
    setCount(e.target.value);
  };

  return (
    <>
      {isValid ? (
        <TextP>몇 명이 모이나요?</TextP>
      ) : (
        <TextPContainer>
          <TextP>방이 만료되었습니다.</TextP>
          <TextP>새로 만드시겠습니까?</TextP>
        </TextPContainer>
      )}
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <Select
          id='count-select-standard'
          value={count}
          placeholder='몇 명'
          sx={{
            fontSize: "1.5rem",

            "& .MuiSelect-select": {
              paddingLeft: "1rem",
              backgroundColor: "#FAFCF8",
            },
          }}
          onChange={handleChange}>
          <MenuItem value='' sx={{ display: "none" }}>
            <em>-</em>
          </MenuItem>
          <MenuItem value='2' sx={{ fontSize: "1.3rem", minHeight: 0 }}>
            2명
          </MenuItem>
          <MenuItem value='3' sx={{ fontSize: "1.3rem", minHeight: 0 }}>
            3명
          </MenuItem>
          <MenuItem value='4' sx={{ fontSize: "1.3rem", minHeight: 0 }}>
            4명
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SelectModal;

const TextP = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const TextPContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & p:nth-of-type(1) {
    margin-bottom: 0;
    color: red;
  }
  & p:nth-of-type(2) {
    margin-top: 1rem;
    font-size: 1.4rem;
  }
`;

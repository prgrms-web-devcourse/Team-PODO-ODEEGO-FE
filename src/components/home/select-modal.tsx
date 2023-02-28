import { countState } from "@/recoil/count-state";
import styled from "@emotion/styled";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useRecoilState } from "recoil";

const SelectModal = () => {
  const [count, setCount] = useRecoilState(countState);

  const handleChange = (e: SelectChangeEvent) => {
    setCount(e.target.value);
  };

  return (
    <>
      <P>몇 명이 모이나요?</P>
      <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
        <Select
          id='count-select-standard'
          value={count}
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
          <MenuItem value='2'>2명</MenuItem>
          <MenuItem value='3'>3명</MenuItem>
          <MenuItem value='4'>4명</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default SelectModal;

const P = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

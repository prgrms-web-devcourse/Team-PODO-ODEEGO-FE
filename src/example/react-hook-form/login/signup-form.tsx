"use client";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../components/form-input";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

import React, { useEffect } from "react";

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .required("닉네임을 입력해주세요")
    .matches(
      /^[가-힣|ㄱ-ㅎ][^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/,
      "닉네임에 특수문자가 포함되면 안되고 한글만 입력할 수 있습니다."
    )
    .min(3, "3글자 이상 20글자 이하로 입력해주세요")
    .max(20, "3글자 이상 20글자 이하로 입력해주세요"),

  subway: yup
    .string()
    .required("지하철 역을 입력해주세요")
    .matches(/역$/, "한글로 된 역만 입력해주세요"),

  // password: yup
  //   .string()
  //   .required()
  //   .min(8)
  //   .matches(/[a-zA-Z]+/, "Password must contain at least one letter")
  //   .matches(/\d+/, "Password must contain at least one number"),
  // confirmPassword: yup
  //   .string()
  //   .required()
  //   .oneOf([yup.ref("password")], "Password must match"),
});

type SignupFormData = yup.InferType<typeof SignupSchema>;

interface SignupFormProps {
  data?: any;
  station?: string;
  onSuccess(): void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SignupForm = ({
  data,
  station,
  onSuccess,
  onKeyDown,
}: SignupFormProps) => {
  const { control, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      username: "",
      subway: "",
    },
    mode: "onBlur",
    resolver: yupResolver(SignupSchema),
  });

  const getSubwayStation = useWatch({
    control,
    name: "subway",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log(data);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SignUpWrapper>
          <FormInput
            fontSize={"20px"}
            width={"100%"}
            control={control}
            name='username'
            label='닉네임'
          />
          <br />
          <FormInput
            fontSize={"20px"}
            width={"100%"}
            control={control}
            name='subway'
            label='지하철'
            onKeyDown={onKeyDown}
            data={data}
          />
        </SignUpWrapper>

        {/*<SearchInput />*/}
        {/*<div>*/}
        {/*  <FormInput*/}
        {/*    fontSize={"20px"}*/}
        {/*    width={"100%"}*/}
        {/*    control={control}*/}
        {/*    name='subway'*/}
        {/*    label='지하철'*/}
        {/*  />*/}
        {/*</div>*/}

        <Button type='submit'>회원가입</Button>
      </form>
    </>
  );
};

export default SignupForm;

const SignUpWrapper = styled.div`
  p {
    font-size: 15px;
    margin-top: 5px;
    color: #fff;
  }
`;

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '../components/form-input';
import { Button } from '@mui/material';
import Link from 'next/link';

const LoginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[a-zA-Z]+/, 'Password must contain at least one letter')
    .matches(/\d+/, 'Password must contain at least one number'),
});

type LoginFormData = yup.InferType<typeof LoginSchema>;

interface LoginFormProps {
  onSuccess(): void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log(data);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput control={control} name='email' label='이메일' />
      </div>
      <div>
        <FormInput
          control={control}
          name='password'
          label='비밀번호'
          type='password'
        />
      </div>
      <Button type='submit'>로그인</Button>
      <Button>
        <Link href='/signup'>회원가입</Link>
      </Button>
    </form>
  );
};

export default LoginForm;

'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInput from '../components/form-input';
import { Button } from '@mui/material';

const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[a-zA-Z]+/, 'Password must contain at least one letter')
    .matches(/\d+/, 'Password must contain at least one number'),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password must match'),
});

type SignupFormData = yup.InferType<typeof SignupSchema>;

interface SignupFormProps {
  onSuccess(): void;
}

const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const { control, handleSubmit } = useForm<SignupFormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(SignupSchema),
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormInput control={control} name='username' label='아이디' />
      </div>
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
      <div>
        <FormInput
          control={control}
          name='confirmPassword'
          label='비밀번호 확인'
          type='password'
        />
      </div>
      <Button type='submit'>회원가입</Button>
    </form>
  );
};

export default SignupForm;

import { setUser } from '@/features/auth/authSlice';
import { login } from '@/services/users';
import { useAppDispatch } from '@/store/hook';
import { Button, MyText, TextInput } from '@/ui';
import { AxiosError } from 'axios';
import { Link, router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [emailError, setEmailError] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string>('');

  const dispatch = useAppDispatch();

  const isEmpty = email === '' || password === '';

  const onEmailChange = (text: string) => {
    setEmailError('');
    setEmail(text);
    const isEmail = text.includes('@');
    if (!isEmail && email !== '') setEmailError('Enter a valid email');
  };

  const onLogin = async () => {
    setEmailError('');
    setPasswordError('');
    const isEmail = email.includes('@');
    if (!isEmail) {
      setEmailError('Please enter a valid email');
      return;
    }

    try {
      const response = await login({ email, password });

      console.log('login response =>', response);
      dispatch(setUser(response))

      router.replace('/(app)/(tabs)/feed')

    } catch (error) {
      if (error instanceof Error) {
        setPasswordError(error?.message);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="w-60">
        <MyText className="text-black font-bold text-[36px]">
          Welcome Back!
        </MyText>
      </View>
      <View className="flex-col">
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          IconName="user"
          tailwindClass="mt-8"
          placeholder="Your email"
          error={emailError}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          IconName="lock"
          password
          placeholder="your password"
          tailwindClass="mt-8"
          error={passwordError}
        />
        <Link
          href={'/forget-password'}
          className="text-[#614FE0] self-end my-2"
        >
          Forgot Password?
        </Link>
      </View>
      <Button
        title="Login"
        tailwindClass="mt-20"
        onPress={onLogin}
        disabled={isEmpty}
      />
      <MyText className="text-center my-4">
        Create An Account{' '}
        <Link href={'/sign-up'} className="text-[#614FE0] font-semibold">
          Sign Up
        </Link>
      </MyText>
    </SafeAreaView>
  );
};

export default SignUp;

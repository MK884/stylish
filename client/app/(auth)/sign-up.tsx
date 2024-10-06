import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, MyText, TextInput } from '@/ui';
import { Link, router } from 'expo-router';
import { login as userLogin, register } from '@/services/users';
import { useAppDispatch } from '@/store/hook';
import { setUser } from '@/features/auth/authSlice';

const SignIn = () => {
  const [userName, setuserName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const [confirmPasswordError, setConfirmPasswordError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [userNameError, setuserNameError] = React.useState('');

  const dispatch = useAppDispatch();

  const isEmpty =
    userName === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '';

  const validate = () => {
    let valid = true;
    if (userName.length > 8 && userName.length < 4) {
      setuserNameError('userName must be between 4 to 8 characters');
      valid = false;
    }

    if (!email.includes('@')) {
      setEmailError('enter valid email address');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('both password should be identical');
      valid = false;
    }

    return valid;
  };

  const onRegister = async () => {
    if (!validate()) return;

    try {
      const response = await register({ userName, email, password });

      if (response) {
        const user = await userLogin({ email, password });

        dispatch(setUser(user));

        router.replace('/(app)/(tabs)/feed');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error?.message === 'username already taken')
          setuserNameError(error?.message);
        else
          setEmailError(error?.message);
        console.log(error);
        
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="w-60">
        <MyText className="text-black font-bold text-[36px]">
          Create an account
        </MyText>
      </View>
      <View className="flex-col">
        <TextInput
          value={userName}
          onChangeText={(text) => setuserName(text)}
          IconName="user"
          tailwindClass="mt-8"
          placeholder="Username"
          error={userNameError}
        />
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          IconName="user"
          tailwindClass="mt-8"
          placeholder="email"
          error={emailError}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          IconName="lock"
          password
          placeholder="Password"
          tailwindClass="mt-8"
        />
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          IconName="lock"
          password
          placeholder="Confirm Password"
          tailwindClass="mt-8"
          error={confirmPasswordError}
        />
        <MyText className="self-start my-2 text-[#676767]">
          By clicking the
          <Text className="text-[#614FE0]"> Register</Text> button, you agree to
          the public offer
        </MyText>
      </View>
      <Button title="Register" tailwindClass="mt-20" disabled={isEmpty} onPress={onRegister}/>
      <MyText className="text-center my-4">
        I Already Have an Account{' '}
        <Link href={'/sign-in'} className="text-[#614FE0] font-semibold">
          Login in
        </Link>
      </MyText>
    </SafeAreaView>
  );
};

export default SignIn;

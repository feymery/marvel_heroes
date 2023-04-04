import React from 'react';
import {View} from 'react-native';
import {Button} from '../components/Button';
import {Input} from '../components/Input';
import {useLoginSetup} from '../hooks/useLoginSetup';
import {styles} from '../theme/styles';

export const Login = () => {
  const {email, checkEmail, isValidEmail, handleSubmitLogin, loading} =
    useLoginSetup();
  return (
    <View
      style={[
        styles.container,
        styles.centeredContainer,
        styles.generalPadding,
      ]}>
      <Input
        type="email"
        value={email}
        isValid={isValidEmail}
        onChange={checkEmail}
      />
      <Button
        style={styles.topMargin}
        text="login"
        loading={loading}
        onPress={handleSubmitLogin}
      />
    </View>
  );
};

import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {colors, styles} from '../theme/styles';

type InputProps = {
  value?: string;
  onChange?: (e: string) => void;
  type: string;
  isValid?: boolean;
};

export const errorMessages: Record<string, string> = {
  email: 'Introduce a valid email',
};

export const placeholders: Record<string, string> = {
  email: 'email',
};

export const Input = ({value, onChange, isValid, type}: InputProps) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholders[type]}
          placeholderTextColor={colors.white}
        />
      </View>
      {!isValid && errorMessages[type] ? (
        <Text>{errorMessages[type]}</Text>
      ) : (
        <Text />
      )}
    </>
  );
};

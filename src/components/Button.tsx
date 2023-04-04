import React from 'react';
import {ActivityIndicator, Pressable, Text, ViewStyle} from 'react-native';
import {styles} from '../theme/styles';

type ButtonProps = {
  text?: string;
  onPress?: (e: any) => void;
  style?: ViewStyle;
  loading?: boolean;
};

export const Button = ({onPress, text, style, loading}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={style}>
      {loading ? (
        <ActivityIndicator
          style={styles.button}
          size={'small'}
          color="#ffffff"
        />
      ) : (
        <Text style={styles.button}>{text}</Text>
      )}
    </Pressable>
  );
};

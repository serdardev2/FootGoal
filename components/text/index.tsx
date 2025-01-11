import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { styles } from './styles';

interface MainTextProps extends TextProps {
  children: React.ReactNode;
  lightColor?: string;
  darkColor?: string;
}

export const MainText: React.FC<MainTextProps> = ({
  children,
  style,
  lightColor,
  darkColor,
  ...props
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <RNText style={[styles.text, { color }, style]} {...props}>
      {children}
    </RNText>
  );
};

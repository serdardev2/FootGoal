import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { styles } from './styles';

interface MainButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const MainButton: React.FC<MainButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  buttonStyle,
  textStyle,
  ...rest
}) => {
  const getButtonStyle = () => {
    let baseStyle: ViewStyle = styles.button;

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle = { ...baseStyle, ...styles.primaryButton };
        break;
      case 'secondary':
        baseStyle = { ...baseStyle, ...styles.secondaryButton };
        break;
      case 'outline':
        baseStyle = { ...baseStyle, ...styles.outlineButton };
        break;
    }

    switch (size) {
      case 'small':
        baseStyle = { ...baseStyle, ...styles.smallButton };
        break;
      case 'medium':
        baseStyle = { ...baseStyle, ...styles.mediumButton };
        break;
      case 'large':
        baseStyle = { ...baseStyle, ...styles.largeButton };
        break;
    }

    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.disabledButton };
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    let baseStyle: TextStyle = styles.buttonText;

    switch (variant) {
      case 'primary':
        baseStyle = { ...baseStyle, ...styles.primaryText };
        break;
      case 'secondary':
        baseStyle = { ...baseStyle, ...styles.secondaryText };
        break;
      case 'outline':
        baseStyle = { ...baseStyle, ...styles.outlineText };
        break;
    }

    if (disabled) {
      baseStyle = { ...baseStyle, ...styles.disabledText };
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), buttonStyle]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? '#007AFF' : '#FFFFFF'}
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

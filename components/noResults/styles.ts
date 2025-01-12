import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    image: {
      width: 120,
      height: 120,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    message: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      color: Colors[theme].grayBorder,
    },
  });

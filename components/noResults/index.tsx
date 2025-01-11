import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { MainText } from '@/components/text';
import { useColorScheme } from 'react-native';

interface NoResultsProps {
  message: string;
  image?: ImageSourcePropType;
}

export const NoResults: React.FC<NoResultsProps> = ({
  message,
  image = require('@/assets/images/no-results.png'),
}) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <MainText style={styles.message}>{message}</MainText>
    </View>
  );
};

import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

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

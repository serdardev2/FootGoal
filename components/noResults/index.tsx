import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { MainText } from '@/components/text';
import { useColorScheme } from 'react-native';
import { createStyles } from './styles';

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

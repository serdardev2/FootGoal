import { StyleSheet, Text } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { MainText } from '@/components/text';

export default function Profile() {
  return (
    <ThemedView>
      <MainText>asd</MainText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

import { Animated, FlatList, useColorScheme, View } from 'react-native';
import { MainText } from '@/components/text';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef, useState } from 'react';
import { useDashboardStore } from '@/src/store/dashboardStore';
import { HomeResponse } from '@/src/types/homeResponse';
import { createStyles } from './styles';
import { NoResults } from '@/components/noResults';
import { useTranslation } from 'react-i18next';
import { MatchCard } from '@/components/matchCard';

export default function HomeScreen() {
  const { matches, loadFavorites } = useDashboardStore();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');
  const { t } = useTranslation();

  useEffect(() => {
    loadFavorites();
  }, []);

  const renderItem = ({ item }: { item: HomeResponse }) => (
    <MatchCard match={item} />
  );

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
    >
      <ThemedView style={styles.content}>
        <MainText style={styles.title}>
          Foot
          <MainText style={styles.titleGreen}>goal</MainText>
        </MainText>

        {matches.length === 0 ? (
          <View style={styles.loadingContainer}>
            <NoResults message={t('dashboard.noResult')} />
          </View>
        ) : (
          <FlatList
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            data={matches}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </ThemedView>
    </Animated.View>
  );
}

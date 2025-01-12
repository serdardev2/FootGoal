import {
  Animated,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { MainText } from '@/components/text';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useRef, useState } from 'react';
import { useDashboardStore } from '@/src/store/dashboardStore';
import { HomeResponse } from '@/src/types/homeResponse';
import { createStyles } from './styles';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { NoResults } from '@/components/noResults';
import { useTranslation } from 'react-i18next';

const MatchCard = ({ match }: { match: HomeResponse }) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');
  const colors = Colors[colorScheme || 'light'];

  const { favoriteIds, toggleFavorite } = useDashboardStore();

  const isFavorite = favoriteIds.includes(match.id);

  const handleToggleFavorite = async () => {
    await toggleFavorite(match.id);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.matchCard}>
      <View style={styles.timeContainer}>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.starContainer}
        >
          <AntDesign
            name={isFavorite ? 'star' : 'staro'}
            size={25}
            color={isFavorite ? colors.yellow : colors.grayBorder}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.matchInfoContainer}>
        <View style={styles.teamRow}>
          <MainText style={styles.teamName} numberOfLines={1}>
            {match.homeTeam}
          </MainText>
          <MainText style={styles.score}>{match.homeScore}</MainText>
        </View>

        <View style={styles.teamRow}>
          <MainText style={styles.teamName} numberOfLines={1}>
            {match.awayTeam}
          </MainText>
          <MainText style={styles.score}>{match.awayScore}</MainText>
        </View>
      </View>

      <MainText style={styles.minute}>{match.minute}'</MainText>
    </TouchableOpacity>
  );
};

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

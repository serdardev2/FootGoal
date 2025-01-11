import { ThemedView } from '@/components/ThemedView';
import {
  FlatList,
  useColorScheme,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MainText } from '@/components/text';
import { useState, useEffect } from 'react';
import { HomeResponse } from '@/src/types/homeResponse';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useDashboardStore } from '@/src/store/dashboardStore';
import { createStyles } from './styles';
import { useTranslation } from 'react-i18next';
import { NoResults } from '@/components/noResults';

const FavoriteMatchCard = ({ match }: { match: HomeResponse }) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');
  const colors = Colors[colorScheme || 'light'];
  const { toggleFavorite } = useDashboardStore();
  const handleToggleFavorite = async () => {
    await toggleFavorite(match.id);
  };

  return (
    <View style={styles.matchCard}>
      <View style={styles.timeContainer}>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={styles.starContainer}
        >
          <AntDesign name="star" size={25} color={colors.yellow} />
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
    </View>
  );
};

export default function Favorites() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');
  const colors = Colors[colorScheme || 'light'];
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { matches, favoriteIds, loadFavorites } = useDashboardStore();

  const favoriteMatches = matches.filter((match) =>
    favoriteIds.includes(match.id)
  );

  useEffect(() => {
    const initializeFavorites = async () => {
      setIsLoading(true);
      await loadFavorites();
      setIsLoading(false);
    };

    initializeFavorites();
  }, []);

  const renderItem = ({ item }: { item: HomeResponse }) => (
    <FavoriteMatchCard match={item} />
  );

  return (
    <ThemedView style={styles.content}>
      <MainText style={styles.title}>
        Favori
        <MainText style={styles.titleGreen}>lerim</MainText>
      </MainText>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : favoriteMatches.length === 0 ? (
        <View style={styles.loadingContainer}>
          <NoResults message={t('favorites.noResult')} />
        </View>
      ) : (
        <FlatList
          data={favoriteMatches}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

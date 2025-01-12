import { TouchableOpacity, View, useColorScheme } from 'react-native';
import { MainText } from '@/components/text';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useDashboardStore } from '@/src/store/dashboardStore';
import { MatchCardProps } from './types';
import { createStyles } from '@/app/(tabs)/styles';

export const MatchCard = ({ match, type = 'default' }: MatchCardProps) => {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme || 'light');
  const colors = Colors[colorScheme || 'light'];

  const { favoriteIds, toggleFavorite } = useDashboardStore();
  const isFavorite = type === 'favorite' || favoriteIds.includes(match.id);

  const handleToggleFavorite = async () => {
    await toggleFavorite(match.id);
  };

  const CardWrapper = type === 'default' ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={styles.matchCard}
      {...(type === 'default' && { activeOpacity: 0.8 })}
    >
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
    </CardWrapper>
  );
};

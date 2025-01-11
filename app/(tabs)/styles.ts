import { Colors } from '@/constants/Colors';
import { StyleSheet, Dimensions, useColorScheme } from 'react-native';

export const createStyles = (theme: 'light' | 'dark') => {
  const colors = theme === 'dark' ? Colors.dark : Colors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    listContainer: {
      paddingVertical: 8,
    },
    matchCard: {
      height: 72,
      marginVertical: 6,
      borderRadius: 12,
      backgroundColor: colors.containerBackground,
      flexDirection: 'row',
    },
    timeContainer: {
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRightWidth: 1,
      borderRightColor: colors.border,
      flexDirection: 'row',
    },
    timeContainerx: {},
    matchTime: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
    },
    matchTimeAM: {
      fontSize: 10,
      fontWeight: '500',
      color: colors.text,
      textAlign: 'center',
    },
    matchInfoContainer: {
      flex: 1,
      paddingHorizontal: 16,
      justifyContent: 'center',
    },
    teamRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 30,
    },
    teamName: {
      flex: 1,
      fontSize: 12,
      fontWeight: '600',
      marginRight: 16,
    },
    score: {
      fontSize: 12,
      fontWeight: '700',
      width: 30,
      textAlign: 'right',
    },
    minute: {
      fontSize: 10,
      color: colors.green,
      position: 'absolute',
      right: 40,
      top: '50%',
      marginTop: -8,
    },
    starContainer: {},
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      lineHeight: 32,
    },
    titleGreen: {
      color: colors.green,
      fontSize: 22,
      lineHeight: 32,
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noFavorites: {
      fontSize: 16,
      color: colors.text,
      textAlign: 'center',
    },
  });
};

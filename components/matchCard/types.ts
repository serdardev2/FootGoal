// components/MatchCard/types.ts
import { HomeResponse } from '@/src/types/homeResponse';

export type MatchCardType = 'default' | 'favorite';

export interface MatchCardProps {
  match: HomeResponse;
  type?: MatchCardType;
}

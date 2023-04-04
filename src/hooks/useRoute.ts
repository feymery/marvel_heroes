import {RouteProp, useRoute as useNativeRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';

export const useRoute = <T extends keyof RootStackParamList>() =>
  useNativeRoute<RouteProp<{params: RootStackParamList[T]}>>();

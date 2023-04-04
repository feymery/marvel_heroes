import {useNavigation as useDefaultNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';

export type StackNavigation = StackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export const useNavigation = () => useDefaultNavigation<StackNavigation>();

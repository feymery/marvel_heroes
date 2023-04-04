import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../api/logout';
import {Button} from '../components/Button';
import {CachedRequestsProvider, useCachedRequests} from '../components/prueba';
import {useNavigation} from '../hooks/useNavigation';
import {setUser} from '../store/user/actions';
import {UserState} from '../store/user/reducer';
import {styles} from '../theme/styles';
import {MarvelHeroData} from '../types/data';

export const Home = () => {
  const url = 'http://gateway.marvel.com/v1/public/characters';
  const navigation = useNavigation();

  function HeroesList() {
    const [state, actions] = useCachedRequests();
    const [loading, setLoading] = useState(false);
    const [currentList, setCurrentList] = useState<MarvelHeroData[]>([]);
    const isFocused = useIsFocused();
    const user = useSelector((userState: UserState) => userState);
    const dispatch = useDispatch();
    useEffect(() => {
      if (
        state.url &&
        state.data &&
        state.data[url] &&
        !state.isFetching &&
        isFocused
      ) {
        setCurrentList(
          (list) => [...list, ...state.data[url]] as MarvelHeroData[],
        );
      }
    }, [isFocused, state, state.data, state.isFetching, state.url]);

    return !state.data || currentList.length === 0 ? (
      <ActivityIndicator size="large" color="#ffffff" />
    ) : (
      <>
        <SafeAreaView edges={['right', 'left', 'top']}>
          <View style={styles.top}>
            <View style={styles.centeredRow}>
              <Image
                source={require('../assets/userAvatar.png')}
                style={styles.avatar}
              />
              <Text style={[styles.subheader, styles.paddingLeftTitle]}>
                {user.name + ' ' + user.surname}
              </Text>
            </View>
            <Button
              text="logout"
              loading={loading}
              onPress={() => {
                if (loading) {
                  return;
                }
                setLoading(true);
                logout().then((value: User) => {
                  dispatch(setUser(value));
                  setLoading(false);
                });
              }}
            />
          </View>
        </SafeAreaView>
        <FlatList
          data={currentList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <>
              <Pressable
                onPress={() => {
                  navigation.navigate('heroDetails', {hero: item});
                }}>
                <ImageBackground
                  source={{
                    uri: item.thumbnail.path + '.' + item.thumbnail.extension,
                  }}
                  style={styles.card}>
                  <LinearGradient
                    colors={['#00000000', '#000000']}
                    style={styles.cardGradient}>
                    <Text style={styles.subheader}>{item.name}</Text>
                    <Text
                      style={
                        styles.body
                      }>{`${item.comics.available} comics`}</Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            </>
          )}
          onEndReached={actions.paginate}
          onEndReachedThreshold={0.25}
        />
      </>
    );
  }

  return (
    <View style={styles.homeScreen}>
      <CachedRequestsProvider maxResultsPerPage={10} url={url}>
        <HeroesList />
      </CachedRequestsProvider>
    </View>
  );
};

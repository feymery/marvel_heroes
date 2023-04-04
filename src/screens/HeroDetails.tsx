import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {CachedRequestsProvider, useCachedRequests} from '../components/prueba';
import {useNavigation} from '../hooks/useNavigation';
import {useRoute} from '../hooks/useRoute';
import {styles} from '../theme/styles';
import {MarvelComicData} from '../types/data';

export const HeroDetails = () => {
  const route = useRoute<'heroDetails'>();
  const navigation = useNavigation();

  const hero = route.params.hero;
  const url = `http://gateway.marvel.com/v1/public/characters/${hero.id}`;

  const [state, actions] = useCachedRequests();

  console.log('value: ' + JSON.stringify(state));

  const [currentComics, setCurrentComics] = useState<MarvelComicData[]>([]);
  useEffect(() => {
    if (state.url && state.data && state.data[url] && !state.isFetching) {
      setCurrentComics(
        (list) => [...list, ...state.data[url]] as MarvelComicData[],
      );
    }
  }, [state.data, state.isFetching, state.url, url]);

  console.log(hero.image);

  return (
    <CachedRequestsProvider maxResultsPerPage={10} url={url}>
      <ScrollView bounces={false} style={styles.container}>
        <ImageBackground
          source={{uri: hero.thumbnail.path + '.' + hero.thumbnail.extension}}
          style={styles.heroProfile}>
          <LinearGradient
            colors={['#00000000', '#000000']}
            style={styles.heroProfileGradient}>
            <SafeAreaView>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.input}>back</Text>
              </Pressable>
            </SafeAreaView>
            <View>
              <Text style={styles.header}>{hero.name}</Text>
              {hero.description ? (
                <Text style={styles.body}>{hero.description}</Text>
              ) : (
                <></>
              )}
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.generalPadding}>
          <Text style={styles.subheader}>comics</Text>

          {!state.data || currentComics.length === 0 ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <FlatList
              horizontal={true}
              data={currentComics}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <>
                  <ImageBackground
                    source={{uri: item.resourceURI}}
                    style={styles.card}>
                    <LinearGradient
                      colors={['#00000000', '#000000']}
                      style={styles.cardGradient}>
                      <Text style={styles.subheader}>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </>
              )}
              onEndReached={actions.paginate}
              onEndReachedThreshold={0.25}
            />
          )}
        </View>
      </ScrollView>
    </CachedRequestsProvider>
  );
};

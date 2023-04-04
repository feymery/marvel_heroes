import React from 'react';
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
import {CachedRequestsProvider} from '../components/prueba';
import {useHeroDetailsSetup} from '../hooks/useHeroDetailsSetup';
import {useNavigation} from '../hooks/useNavigation';
import {useRoute} from '../hooks/useRoute';
import {styles} from '../theme/styles';

export const HeroDetails = () => {
  const route = useRoute<'heroDetails'>();
  const navigation = useNavigation();
  const hero = route.params.hero;

  const {currentComics, state, actions} = useHeroDetailsSetup();
  const url = `http://gateway.marvel.com/v1/public/characters/${hero.id}`;

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
        <>
          <Text style={[styles.subheader, styles.generalPadding]}>comics</Text>

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
                    style={styles.verticalCard}>
                    <LinearGradient
                      colors={['#00000000', '#000000']}
                      style={styles.verticalCardGradient}>
                      <Text style={styles.subheader}>{item.title}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </>
              )}
              onEndReached={actions.paginate}
              onEndReachedThreshold={0.25}
            />
          )}
        </>
      </ScrollView>
    </CachedRequestsProvider>
  );
};

import React from 'react';
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
import {Button} from '../components/Button';
import {CachedRequestsProvider} from '../components/prueba';
import {useHomeSetup} from '../hooks/useHomeSetup';
import {styles} from '../theme/styles';

const url = 'http://gateway.marvel.com/v1/public/characters';

export const Home = () => {
  function HeroesList() {
    const {
      state,
      currentList,
      user,
      loading,
      submitLogout,
      actions,
      goToDetails,
    } = useHomeSetup();

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
            <Button text="logout" loading={loading} onPress={submitLogout} />
          </View>
        </SafeAreaView>
        <FlatList
          data={currentList}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <>
              <Pressable
                onPress={() => {
                  goToDetails(item);
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

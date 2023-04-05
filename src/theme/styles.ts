import {StyleSheet} from 'react-native';

const colors = {
  white: 'white',
  black: '#000000',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c82636',
    flex: 1,
  },
  paddingLeftTitle: {
    paddingLeft: 10,
  },

  generalPadding: {
    padding: '10%',
  },

  centeredContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginScreen: {
    backgroundColor: '#c82636',
    padding: '10%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    borderStyle: 'solid',
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 15,
    width: '100%',
  },
  input: {
    color: colors.white,
    fontWeight: '600',
    padding: 0,
  },
  header: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 24,
  },
  subheader: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 20,
  },
  body: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 12,
  },
  button: {
    backgroundColor: colors.black,
    color: colors.white,
    borderRadius: 15,
    fontWeight: '600',
    textTransform: 'uppercase',
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topMargin: {
    marginTop: 10,
  },
  homeScreen: {flex: 1, justifyContent: 'center', backgroundColor: '#c82636'},
  card: {width: '100%', height: 200},
  verticalCard: {
    width: 200,
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 20,
  },

  verticalCardGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 10,
  },

  cardGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    padding: 5,
  },

  heroProfile: {width: '100%', height: 400},

  heroProfileGradient: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    padding: '5%',
  },

  top: {
    backgroundColor: '#c82636',
    flexDirection: 'row',
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  centeredRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 30, height: 30},
});

export {styles, colors};

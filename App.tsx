import React, {useEffect} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useSelector} from 'react-redux';
import {useInitSetup} from './src/hooks/useInitSetup';
import {UserState} from './src/store/user/reducer';
import store from './src/store/store';
import {routes, loginRoutes} from './src/utils/routes';

const Stack = createNativeStackNavigator();

const App = () => {
  const {checkAuthenticated} = useInitSetup();
  const isAuthenticated = useSelector(
    (state: UserState) => state.isAuthenticated,
  );
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    checkAuthenticated();
  }, [checkAuthenticated]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {(isAuthenticated ? routes : loginRoutes).map(
          ({name, component, showHeader}) => (
            <Stack.Screen
              {...{name, component}}
              key={name}
              options={{
                headerShown: showHeader,
              }}
            />
          ),
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default Root;

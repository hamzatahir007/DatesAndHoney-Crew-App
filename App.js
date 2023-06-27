import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import MyStack from './src/view/navigation/navigation.js';
import store from './redux/store.js';

const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;

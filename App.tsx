import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Poppins_300Light,
          Poppins_500Medium,
          Poppins_600SemiBold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Open up App.js to start working on your app!</Text>
        </View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

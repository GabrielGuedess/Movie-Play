import React, { useCallback, useEffect, useState } from 'react';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import {
  Poppins_300Light,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { QueryClient, QueryClientProvider } from 'react-query';

import { Routes } from 'routes';

import { Auth } from 'screens/Auth';

import { ThemeProvider } from 'styled-components';

import theme from 'styles/theme';

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <Routes />
          {/* <Auth /> */}
          <Toast />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

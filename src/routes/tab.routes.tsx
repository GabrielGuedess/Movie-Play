import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutes } from './stack.routes';

import { Home } from 'screens/Home';

import { useTheme } from 'styled-components';

import { MovieDTO } from 'dtos/MovieDTO';

import HomeSvg from 'assets/home.svg';
import MovieSvg from 'assets/movie.svg';
import ProfileSvg from 'assets/profile.svg';
import SearchSvg from 'assets/search.svg';

export type TabRoutesParamList = {
  StackRoutes: undefined;
  Movie: MovieDTO;
  Search: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<TabRoutesParamList>();

export function TabRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.iconInactive,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          height: 70,
          borderTopWidth: 0,
        },
      }}
    >
      <Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <HomeSvg fill={color} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.text,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Screen
        name="Movie"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <MovieSvg fill={color} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.text,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <SearchSvg fill={color} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.text,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <ProfileSvg fill={color} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -8,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: colors.text,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Navigator>
  );
}

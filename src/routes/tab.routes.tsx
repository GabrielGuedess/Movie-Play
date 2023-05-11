import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StackRoutes } from './stack.routes';

import { MovieUser } from 'screens/MovieUser';
import { Profile } from 'screens/Profile';
import { Search } from 'screens/Search';

import { useTheme } from 'styled-components';

import HomeSvg from 'assets/svg/home.svg';
import MovieSvg from 'assets/svg/movie.svg';
import ProfileSvg from 'assets/svg/profile.svg';
import SearchSvg from 'assets/svg/search.svg';

export type TabRoutesParamList = {
  StackRoutes: undefined;
  MovieUser: undefined;
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
        name="MovieUser"
        component={MovieUser}
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
        component={Search}
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
        component={Profile}
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

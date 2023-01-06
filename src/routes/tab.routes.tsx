import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from 'screens/Home';

import { useTheme } from 'styled-components';

import HomeSvg from 'assets/home.svg';
import Movie from 'assets/movie.svg';
import Profile from 'assets/profile.svg';
import Search from 'assets/search.svg';

const { Navigator, Screen } = createBottomTabNavigator();

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
        name="Home"
        component={Home}
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
        name="Movies"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Movie fill={color} />
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
              <Search fill={color} />
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
              <Profile fill={color} />
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

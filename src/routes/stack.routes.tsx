import { createStackNavigator } from '@react-navigation/stack';

import { Home } from 'screens/Home';
import { Movie } from 'screens/Movie';

import { MovieDTO } from 'dtos/MovieDTO';

export type StackRoutesParamList = {
  Home: undefined;
  Movie: MovieDTO;
};

const { Navigator, Screen } = createStackNavigator<StackRoutesParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Movie" component={Movie} />
    </Navigator>
  );
}

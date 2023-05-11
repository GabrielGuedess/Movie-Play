import { createStackNavigator } from '@react-navigation/stack';

import { Home } from 'screens/Home';
import { Movie } from 'screens/Movie';
import { Serie } from 'screens/Serie';
import { SerieSeason } from 'screens/SerieSeason';
import { Stream } from 'screens/Stream';

import { MovieDTO } from 'dtos/MovieDTO';
import { SerieDTO } from 'dtos/SerieDTO';
import { StreamDTO } from 'dtos/StreamDTO';

export type StackRoutesParamList = {
  Home: undefined;
  Movie: MovieDTO;
  Serie: SerieDTO;
  SerieSeason: { id: number; season: number; seasons: number };
  Stream: StreamDTO;
};

const { Navigator, Screen } = createStackNavigator<StackRoutesParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Movie" component={Movie} />
      <Screen name="Serie" component={Serie} />
      <Screen name="SerieSeason" component={SerieSeason} />
      <Screen name="Stream" component={Stream} />
    </Navigator>
  );
}

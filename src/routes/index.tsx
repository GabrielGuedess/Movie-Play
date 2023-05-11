import {
  DarkTheme,
  NavigationContainer,
  RouteProp,
} from '@react-navigation/native';

import { StackRoutesParamList } from './stack.routes';
import { TabRoutes, TabRoutesParamList } from './tab.routes';

export type RoutesParams = TabRoutesParamList & StackRoutesParamList;

export type RootRouteProps<RouteName extends keyof RoutesParams> = RouteProp<
  RoutesParams,
  RouteName
>;

export function Routes() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <TabRoutes />
    </NavigationContainer>
  );
}

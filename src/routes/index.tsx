import { NavigationContainer, RouteProp } from '@react-navigation/native';

import { TabRoutes, TabRoutesParamList } from './tab.routes';

export type RootRouteProps<RouteName extends keyof TabRoutesParamList> =
  RouteProp<TabRoutesParamList, RouteName>;

export function Routes() {
  return (
    <NavigationContainer>
      <TabRoutes />
    </NavigationContainer>
  );
}

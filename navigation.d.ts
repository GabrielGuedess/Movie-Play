import { RoutesParams } from './src/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RoutesParams {}
  }
}

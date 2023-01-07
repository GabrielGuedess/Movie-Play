import { TabRoutesParamList } from './src/routes/tab.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabRoutesParamList {}
  }
}

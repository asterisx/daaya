import {createDrawerNavigator} from 'react-navigation-drawer';

import HomeStack from './home.stack';
import UploadsStack from './uploads.stack';

const MainNavigator = createDrawerNavigator({
  Home: HomeStack,
  Uploads: UploadsStack,
});

export default MainNavigator;

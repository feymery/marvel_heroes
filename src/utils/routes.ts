import {HeroDetails} from '../screens/HeroDetails';
import {Home} from '../screens/Home';
import {Login} from '../screens/Login';
import {ViewType} from '../types/navigation';

const defaultConfig = {
  showHeader: false,
};

export const loginRoutes: ViewType[] = [
  {name: 'login', component: Login, ...defaultConfig},
];
export const routes: ViewType[] = [
  {name: 'home', component: Home, ...defaultConfig},
  {name: 'heroDetails', component: HeroDetails, ...defaultConfig},
];

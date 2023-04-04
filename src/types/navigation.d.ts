import {ReactElement} from 'react';

declare type RootStackParamList = {
  login: undefined;
  home: undefined;
  heroDetails: {
    hero: MarvelHero;
  };
};

type ViewType = {
  name: keyof RootStackParamList;
  component: (props: any) => ReactElement;
  showHeader: boolean;
};

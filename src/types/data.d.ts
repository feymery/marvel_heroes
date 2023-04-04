import {ApisauceInstance} from 'apisauce';

declare type MarvelHeroesListResponse = {
  results: {[x: string]: MarvelHeroData[] | undefined};
};
declare type MarvelHeroComicsListResponse = {
  results: {[x: string]: MarvelComicData[] | undefined};
};

declare type MarvelResponse =
  | MarvelHeroesListResponse
  | MarvelHeroComicsListResponse;

declare type Thumbnail = {
  path: string;
  extension: string;
};

declare type MarvelHeroData = {
  id: string;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: {available: number};
};

declare type MarvelComicData = {
  id: string;
  title: string;
  resourceURI: string;
};

declare type MarvelData = MarvelHeroData | MarvelComicData;

declare type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

declare type ContextStateInitialized = {
  url: string;
  isFetching: false;
  data?: undefined;
};

declare type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

declare type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  data: T;
  apisauceInstance: ApisauceInstance;
};

declare type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;

declare interface IActions {
  paginate(): void;
}

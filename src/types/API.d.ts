import {ApisauceInstance} from 'apisauce';

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

declare type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

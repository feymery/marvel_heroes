import {PRIVATE_KEY, PUBLIC_KEY} from '@env';
import {ApisauceInstance, create} from 'apisauce';
import md5 from 'md5';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ApiRequestContextState,
  IActions,
  ContextStateUninitialized,
  ContextStateInitialized,
  ContextStateFetched,
} from '../types/API';
import {MarvelResponse, MarvelData} from '../types/data';

const initialState = {
  isFetching: false,
};

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};

const marvelProxy = new Proxy<MarvelResponse>(
  {
    apiInstance: create({baseURL: 'https://developer.marvel.com'}),
    results: {},
  },
  {
    get: function <T extends MarvelData[]>(
      target: {
        results: {
          [key in string]?: T;
        };
      },
      url: string,
    ) {
      const values = target;

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
          resolve(values.results[url] as T);
          return;
        }

        try {
          const response = await (
            target as {
              results: {
                [key in string]?: T;
              };
              apiInstance: ApisauceInstance;
            }
          ).apiInstance.get<T>(url);
          const data = response.data as T;
          if (response.status !== 200 || !data) {
            throw new Error('Error fetching data');
          }

          (
            target as {
              results: {
                [key in string]?: T;
              };
            }
          ).results[url] = data;
          resolve(data);
          return data;
        } catch (e) {
          reject(e);
        }
      });
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, {paginate: () => undefined}]);

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
  } as ContextStateInitialized);

  const [page, setPage] = useState(0);

  const getNavigatableUrl = useCallback((): string => {
    const ts = new Date().getTime();
    const hash = md5(`${new Date().getTime()}${PRIVATE_KEY}${PUBLIC_KEY}`);
    return `${url}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hash}&limit=${maxResultsPerPage}&offset=${
      page * maxResultsPerPage
    }`;
  }, [page, state]);

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return;
    }

    setState(
      state.url !== url
        ? {
            isFetching: true,
            url,
          }
        : {
            ...state,
            isFetching: true,
          },
    );

    marvelProxy[getNavigatableUrl()].then((value) => {
      setState({
        ...state,
        isFetching: false,
        data: {
          ...(state.data ?? {}),
          [url]: value.data.results,
        },
      } as ContextStateFetched<MarvelData>);
    });
  }, [page, url]);

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
          paginate: () => {
            setPage(page + 1);
          },
        },
      ]}>
      {children}
    </ApiRequestContext.Provider>
  );
}

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};

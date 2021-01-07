import get from 'lodash/get';
import merge from 'deepmerge';
import { useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';

const useResolvers = (breadcrumbsConfig, props) => {
  const location = useLocation();
  const { pathname } = location;

  const pathConfig = breadcrumbsConfig.find(
    (config) => !!matchPath(pathname, {
      path: config.path,
      exact: true,
    }),
  );

  const requiredResolvers = get(pathConfig, 'resolvers', []);
  const defaultConfig = get(pathConfig, 'defaultConfig', []);

  const [resolvedProps, setResolvedProps] = useState({});

  useEffect(() => {
    const mappedDefaultConfig = defaultConfig.map((getConfig) => getConfig(props));
    setResolvedProps(merge.all(mappedDefaultConfig));

    const resolve = async () => {
      const resolvers = requiredResolvers.map((resolver) => resolver(props));
      const newResolvedProps = await Promise.all(resolvers);
      const result = merge.all(newResolvedProps);

      setResolvedProps(result);
    };

    if (requiredResolvers.length > 0) {
      resolve();
    }
  }, [pathname]);

  return resolvedProps;
};

export default useResolvers;

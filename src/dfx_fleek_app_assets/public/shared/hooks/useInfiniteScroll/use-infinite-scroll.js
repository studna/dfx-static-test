import { useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';
import { ID_OF_SCROLLABLE_ELEMENT } from '~/constants';

const BOTTOM_BAND = 50;
const DEFAULT_DEBOUNCE_TIME = 300;

const useInfiniteScroll = ({
  fetchMore, // required, function provided by useQuery
  updateCache, // required
  nextToken, // required, token to fetch next set of data,
  // if token is "false" value, then no event will fire
  elementRef, // optional: default is main scrollable element of layout
  // if "elementRef" is null (for example because wasn't rendered yet)
  // then scroll event won't be added
  debounceTime = DEFAULT_DEBOUNCE_TIME,
  bottomBand = BOTTOM_BAND, // distance from bottom of a list element where
  // should start calling "fetchMore"
}) => {
  const listElementRef = useRef();

  // have to use refs for tokens, because debounce make setTimeout on function
  // and props used in that function can be outdated
  // when function in setTimeout is called
  const alreadyUsedTokenRef = useRef(null);
  const newTokenRef = useRef(null);
  newTokenRef.current = nextToken;

  const makeRequest = async () => {
    try {
      await fetchMore({
        variables: {
          nextToken: newTokenRef.current,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          return updateCache(previousResult, fetchMoreResult);
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error, try to fetch more', err);
    }
  };

  const tryFetchMore = async () => {
    const {
      scrollHeight,
      clientHeight,
      scrollTop,
    } = listElementRef.current;
    const maxScroll = scrollHeight - clientHeight;
    const isNewToken = newTokenRef.current
      && alreadyUsedTokenRef.current !== newTokenRef.current;

    if (maxScroll - scrollTop < bottomBand && isNewToken) {
      alreadyUsedTokenRef.current = newTokenRef.current;
      makeRequest();
    }
  };

  useEffect(() => {
    if (elementRef === null || !newTokenRef.current) {
      return;
    }

    listElementRef.current = elementRef === undefined
      ? window.document.getElementById(ID_OF_SCROLLABLE_ELEMENT)
      : elementRef;
    const listElement = listElementRef.current;

    const onScroll = debounce(tryFetchMore, debounceTime);
    listElement.addEventListener('scroll', onScroll);
    tryFetchMore();
    // eslint-disable-next-line consistent-return
    return () => listElement.removeEventListener('scroll', onScroll);
  }, [elementRef, newTokenRef.current, fetchMore]);
};

export default useInfiniteScroll;

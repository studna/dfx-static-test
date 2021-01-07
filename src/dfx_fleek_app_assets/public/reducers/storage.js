import uniqBy from 'lodash/uniqBy';
import { SEARCH_TERM_CHANGE } from '~/constants';

import {
  EDIT_OBJECT,
  EDIT_OBJECTS,
  BUCKET_ERROR,
  BUCKET_SUCESS,
  BUCKET_LOADING,
  STORE_OBJECTS,
  SET_ERROR_STATE,
  SET_LOADING_STATE,
  REMOVE_OBJECTS,
  UNSELECT_ALL_OBJECTS,
} from '~/views/Teams/Storage/actions';

const DEFAULT_STATE = {
  error: null,
  objects: [],
  buckets: {
    error: null,
    isLoading: false,
  },
  loading: true,
  searchTerm: '',
  actionOptions: [
    {
      id: 'open',
      name: 'Open',
      access: {
        folder: false,
        file: true,
      },
    },
    {
      id: 'view',
      name: 'View',
      access: {
        folder: true,
        file: true,
      },
    },
    {
      id: 'rename',
      name: 'Rename',
      access: {
        folder: false,
        file: false,
      },
    },
    {
      id: 'download',
      name: 'Download',
      access: {
        folder: false,
        file: true,
      },
    },
    // Removed from MVP
    // {
    //   id: 'download-as',
    //   name: 'Download as',
    //   access: {
    //     folder: false,
    //     file: true,
    //   },
    // },
    {
      id: 'copy-path',
      name: 'Copy Path',
      access: {
        folder: false,
        file: true,
      },
    },
  ],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SEARCH_TERM_CHANGE: {
      return {
        ...state,
        searchTerm: action.value,
      };
    }

    case SET_LOADING_STATE: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case SET_ERROR_STATE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case UNSELECT_ALL_OBJECTS: {
      return {
        ...state,
        objects: state.objects.map((obj) => ({
          ...obj,
          selected: false,
        })),
      };
    }

    case EDIT_OBJECT: {
      const { payload = {} } = action;
      const objects = state.objects.map((obj) => {
        if (obj.fullKey === payload.fullKey) return payload;
        return obj;
      });

      return {
        ...state,
        objects,
      };
    }

    case EDIT_OBJECTS: {
      const { payload = [] } = action;
      const objects = state.objects.map((obj) => {
        const object = payload.find((_obj) => obj.fullKey === _obj.fullKey);

        return object || obj;
      });

      return {
        ...state,
        objects,
      };
    }

    case REMOVE_OBJECTS: {
      const { payload = [] } = action;
      const objects = state.objects.filter((obj) => {
        const object = payload.find((_obj) => obj.fullKey === _obj.fullKey);

        return !object;
      });

      return {
        ...state,
        objects,
      };
    }

    case STORE_OBJECTS: {
      const objects = uniqBy([
        ...action.payload,
        ...state.objects,
      ], 'fullKey');

      return {
        ...state,
        objects,
        loading: false,
      };
    }
    case BUCKET_ERROR: {
      return {
        ...state,
        buckets: {
          ...state.buckets,
          isLoading: false,
          error: action.error,
        },
      };
    }
    case BUCKET_SUCESS: {
      return {
        ...state,
        buckets: {
          ...state.buckets,
          isLoading: false,
          [action.bucket.Name]: {
            ...action.bucket,
          },
        },
      };
    }
    case BUCKET_LOADING: {
      return {
        ...state,
        buckets: {
          ...state.buckets,
          isLoading: true,
        },
      };
    }
    default:
      return state;
  }
};

import { getLocale, setLocale } from 'umi';

const initState = {
  language: ""
};

export default {
  namespace: 'global',
  state: {
    ...initState
  },
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    reset() {
      return {
        ...initState,
      };
    },
  },
  effects: {
    *changeLan({ payload }, { put }) {
      let { language } = payload;
      yield put ({
        type: "update",
        payload: {
          language: language
        }
      })
    },
  },
};

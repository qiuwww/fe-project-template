import { fetchMovieList, enumStatus } from '@/services/management';

const ManagementModel = {
  namespace: 'management',
  state: {
    movieListData: {},
    statusListData: [],
  },
  effects: {
    *statusEnumList({ payload, callback }, { call, put, select }) {
      const res = yield call(enumStatus, payload);
      yield put({
        type: 'save',
        payload: {
          statusListData: [
            {
              desc: '全部',
              value: '',
            },
            ...res.data,
          ],
        },
      });
    },
    *fetchMovieList({ payload, callback }, { call, put, select }) {
      const res = yield call(fetchMovieList, payload);

      yield put({
        type: 'save',
        payload: {
          movieListData: res,
        },
      });
    },
    // *clearNotices({ payload }, { put, select }) {
    //   yield put({
    //     type: 'saveClearedNotices',
    //     payload,
    //   });
    //   const count = yield select(state => state.global.notices.length);
    //   const unreadCount = yield select(
    //     state => state.global.notices.filter(item => !item.read).length,
    //   );
    //   yield put({
    //     type: 'user/changeNotifyCount',
    //     payload: {
    //       totalCount: count,
    //       unreadCount,
    //     },
    //   });
    // },
    // *changeNoticeReadState({ payload }, { put, select }) {
    //   const notices = yield select(state =>
    //     state.global.notices.map(item => {
    //       const notice = { ...item };
    //       if (notice.id === payload) {
    //         notice.read = true;
    //       }
    //       return notice;
    //     }),
    //   );
    //   yield put({
    //     type: 'saveNotices',
    //     payload: notices,
    //   });
    //   yield put({
    //     type: 'user/changeNotifyCount',
    //     payload: {
    //       totalCount: notices.length,
    //       unreadCount: notices.filter(item => !item.read).length,
    //     },
    //   });
    // },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {},
};
export default ManagementModel;

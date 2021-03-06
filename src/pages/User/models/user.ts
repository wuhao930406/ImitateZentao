import {
  Login,
  sendVerificationCode,
  reparePassword,
  uploadBackgroungImg,
  queryBackgroungImg,
  blackboard,
  blackport,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    res: {},
    queryBackgroungImg: '',
    blackboard: [],
    blackport: {},
  },
  effects: {
    *blackboard({ payload }: any, { call, put }: any) {
      const responese = yield call(blackboard, payload);
      yield put({
        type: 'updateState',
        payload: {
          blackboard: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *blackport({ payload }: any, { call, put }: any) {
      const responese = yield call(blackport, payload);
      yield put({
        type: 'updateState',
        payload: {
          blackport: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *queryBackgroungImg({ payload }: any, { call, put }: any) {
      const responese = yield call(queryBackgroungImg, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryBackgroungImg: responese.data && responese.data.data.dicName,
        },
      });
      return responese;
    },
    *Login({ payload }: any, { call, put }: any) {
      const responese = yield call(Login, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *uploadBackgroungImg({ payload }: any, { call, put }: any) {
      const responese = yield call(uploadBackgroungImg, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *sendVerificationCode({ payload }: any, { call, put }: any) {
      const responese = yield call(sendVerificationCode, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *reparePassword({ payload }: any, { call, put }: any) {
      const responese = yield call(reparePassword, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      for (let i in payload) {
        if (payload[i].code != '0000' && payload[i].code) {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};

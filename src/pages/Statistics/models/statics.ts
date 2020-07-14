import {
  queryProjectTaskStatus,
  ProdqueryAllSelectAll,
  umRequiretoproj,
  queryProjectRate,
  queryTaskFinish,
  queryBug,
  DepqueryTreeList,
  depuserlist,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  state: {
    DepqueryTreeList: [],
    queryProjectTaskStatus: [],
    queryProjectRate: [],
    queryTaskFinish: [],
    queryBug: [],
    depuserlist: [],
    umRequiretoproj: [],
    ProdqueryAllSelectAll: [],
    code: {},
  },
  effects: {
    *umRequiretoproj({ payload }: any, { call, put }: any) {
      const responese = yield call(umRequiretoproj, payload);
      yield put({
        type: 'updateState',
        payload: { umRequiretoproj: responese.data && responese.data.dataList },
      });
      return responese;
    },
    *ProdqueryAllSelectAll({ payload }: any, { call, put }: any) {
      const responese = yield call(ProdqueryAllSelectAll, payload);
      yield put({
        type: 'updateState',
        payload: {
          ProdqueryAllSelectAll: responese.data && responese.data.data,
        },
      });
      return responese;
    },
    *depuserlist({ payload }: any, { call, put }: any) {
      const responese = yield call(depuserlist, payload);
      yield put({
        type: 'updateState',
        payload: { depuserlist: responese.data && responese.data.data },
      });
      return responese;
    },
    *DepqueryTreeList({ payload }: any, { call, put }: any) {
      const responese = yield call(DepqueryTreeList, payload);
      yield put({
        type: 'updateState',
        payload: {
          DepqueryTreeList: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *queryProjectTaskStatus({ payload }: any, { call, put }: any) {
      const responese = yield call(queryProjectTaskStatus, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryProjectTaskStatus: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *queryProjectRate({ payload }: any, { call, put }: any) {
      const responese = yield call(queryProjectRate, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryProjectRate: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *queryTaskFinish({ payload }: any, { call, put }: any) {
      const responese = yield call(queryTaskFinish, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryTaskFinish: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *resetTaskFinish({ payload }: any, { call, put }: any) {
      yield put({
        type: 'updateState',
        payload: {
          queryTaskFinish: payload,
        },
      });
      return {};
    },

    *queryBug({ payload }: any, { call, put }: any) {
      const responese = yield call(queryBug, payload);
      yield put({
        type: 'updateState',
        payload: {
          queryBug: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
  },

  reducers: {
    updateState(state: any, { payload }: any) {
      for (let i in payload) {
        if (payload[i].code && payload[i].code !== '0000') {
          message.destroy();
          message.warn(payload[i].msg);
        }
      }
      return { ...state, ...payload };
    },
  },
};
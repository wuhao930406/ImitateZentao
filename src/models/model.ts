import {
  changePassword,
  Logout,
  ProjquerySelectList,
  ProjqueryByProjectId,
  UserqueryAll,
  queryMenu,
} from '@/services/api.ts';
import { message } from 'antd';

export default {
  namespace: 'model',
  state: {
    res: {},
    ProjquerySelectList: [],
    ProjqueryByProjectId: {
      data: {
        data: {},
        dataList: [],
        workDayHours: '',
      },
    },
    UserqueryAll: [],
    postdata: {
      projectId: '', //项目id，必填
      realName: '', //用户名称，筛选条件
      jobTitle: '', //团队角色，筛选条件
      joinMinDate: '', //入团日起，筛选条件
      joinMaxDate: '', //入团日止，筛选条件
      sortList: [
        //排序字段
        {
          fieldName: 'realName', //用户名称
          sort: '',
        },
        {
          fieldName: 'jobTitle', //角色团队
          sort: '',
        },
        {
          fieldName: 'joinDate', //入团日
          sort: '',
        },
      ],
    },
    queryMenu: [],
  },
  effects: {
    *UserqueryAll({ payload }: any, { call, put }: any) {
      const responese = yield call(UserqueryAll, payload);
      yield put({
        type: 'updateState',
        payload: { UserqueryAll: responese.data && responese.data.parentList },
      });
      return responese;
    },
    *postdata({ payload }: any, { call, put }: any) {
      yield put({
        type: 'updateState',
        payload: { postdata: payload },
      });
      return 'responese';
    },
    *ProjqueryByProjectId({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjqueryByProjectId, payload);
      yield put({
        type: 'updateState',
        payload: { ProjqueryByProjectId: responese },
      });
      return responese;
    },
    *ProjquerySelectList({ payload }: any, { call, put }: any) {
      const responese = yield call(ProjquerySelectList, payload);
      yield put({
        type: 'updateState',
        payload: {
          ProjquerySelectList: responese.data && responese.data.dataList,
        },
      });
      return responese;
    },
    *changePassword({ payload }: any, { call, put }: any) {
      const responese = yield call(changePassword, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *Logout({ payload }: any, { call, put }: any) {
      const responese = yield call(Logout, payload);
      yield put({
        type: 'updateState',
        payload: { res: responese },
      });
      return responese;
    },
    *queryMenu({ payload }: any, { call, put }: any) {
      const responese = yield call(queryMenu, payload);
      yield put({
        type: 'updateState',
        payload: { queryMenu: responese },
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

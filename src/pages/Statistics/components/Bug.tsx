import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import Container from '@material-ui/core/Container';
import {
  Card,
  Row,
  Col,
  Select,
  DatePicker,
  TreeSelect,
  InputNumber,
  Tooltip,
} from 'antd';
import styles from '../style.less';
import Button from '@material-ui/core/Button';
import AutoTable from '@/components/AutoTable';
import setNewState from '@/utils/setNewState';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
let { Option } = Select,
  { RangePicker } = DatePicker,
  { TreeNode } = TreeSelect;
//工作日计算
function workday_count(start: any, end: any) {
  let first = start.clone().endOf('week'); // 第一周最后一天
  let last = end.clone().startOf('week'); // 最后一周第一天
  let days = (last.diff(first, 'days') * 5) / 7;
  let wfirst = first.day() - start.day();
  if (start.day() == 0) --wfirst;
  let wlast = end.day() - last.day();
  if (end.day() == 6) --wlast;
  return wfirst + days + wlast;
}

let Bug = ({ dispatch, statics, model, loading }: any) => {
  let [curindex, changecur] = useState(0),
    [postdata, cpost] = useState({
      productId: '', //产品id
      projectId: '', // 项目id，根据产品联动
      solveUserId: '', //人员id，独立下拉框
    });

  let createNewArr = (data: any) => {
    return data
      .reduce((result: any, item: any) => {
        //首先将userId字段作为新数组result取出
        if (result.indexOf(item.userId) < 0) {
          result.push(item.userId);
        }
        return result;
      }, [])
      .reduce((result: any, id: any) => {
        //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
        const children = data.filter((item: any) => item.userId == id);

        result = result.concat(
          children.map((item: any, index: any) => ({
            ...item,
            childrens: children,
            rowSpan: index === 0 ? children.length : 0, //将第一行数据添加rowSpan字段
          })),
        );
        return result;
      }, []);
  };

  console.log(createNewArr(statics.queryBug));

  let columns = [
    {
      title: '姓名',
      dataIndex: 'userName',
      key: 'userName',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: row.userName,
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: text,
          props: {
            rowSpan: parseInt(row.count),
          },
        };
      },
    },
    {
      title: '项目名称',
      dataIndex: 'projectName',
      key: 'projectName',
      ellipsis: true,
      width: 120,
    },
    {
      title: '任务数',
      dataIndex: 'taskCount',
      key: 'taskCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: 'bug数',
      dataIndex: 'bugCount',
      key: 'bugCount',
      ellipsis: true,
      width: 120,
    },
    {
      title: 'bug总计',
      dataIndex: 'bugTotal',
      key: 'bugTotal',
      ellipsis: true,
      width: 120,
      render(text: any, row: any) {
        return {
          children: text,
          props: {
            rowSpan: row.rowSpan,
          },
        };
      },
    },
  ];

  useEffect(() => {
    setNewState(dispatch, 'statics/queryBug', postdata, () => {});
    setNewState(dispatch, 'statics/ProdqueryAllSelectAll', {}, () => {});
    setNewState(dispatch, 'statics/umRequiretoproj', {}, () => {});
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap' }}>
        <div className={styles.items}>
          <label className={styles.mys}>产品</label>
          <Select
            allowClear
            style={{ width: 200 }}
            placeholder="请选择"
            value={postdata.productId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                productId: val,
                projectId: undefined,
              });
              setNewState(
                dispatch,
                'statics/umRequiretoproj',
                { productId: val },
                () => {},
              );
            }}
          >
            {statics.ProdqueryAllSelectAll.map(
              ({ dicKey, dicName }: any, i: number) => (
                <Option key={i} value={dicKey}>
                  {dicName}
                </Option>
              ),
            )}
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>项目</label>
          <Select
            allowClear
            style={{ width: 200 }}
            placeholder="请选择"
            value={postdata.projectId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                projectId: val,
              });
            }}
          >
            {statics.umRequiretoproj.map(
              ({ dicKey, dicName }: any, i: number) => (
                <Option key={i} value={dicKey}>
                  {dicName}
                </Option>
              ),
            )}
          </Select>
        </div>

        <div className={styles.items}>
          <label className={styles.mys}>人员</label>
          <Select
            allowClear
            style={{ width: 100 }}
            placeholder="请选择"
            value={postdata.solveUserId}
            onChange={(val: any) => {
              cpost({
                ...postdata,
                solveUserId: val,
              });
            }}
          >
            {model.UserqueryAll.map(({ dicKey, dicName }: any, i: number) => (
              <Option key={i} value={dicKey}>
                {dicName}
              </Option>
            ))}
          </Select>
        </div>

        <div className={styles.items}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            style={{ height: 32, borderRadius: 0 }}
            onClick={() => {
              setNewState(dispatch, 'statics/queryBug', postdata, () => {});
            }}
          >
            <span style={{ marginTop: 2 }}>查询</span>
          </Button>
        </div>
      </div>

      <AutoTable
        bordered={true}
        data={{ list: createNewArr(statics.queryBug) }}
        columns={columns}
        pagination="false"
        scroll={{ x: 900 }}
        loading={loading.effects['statics/queryBug']}
        rowKey="userId"
      ></AutoTable>
    </div>
  );
};

export default connect(({ statics, model, loading }: any) => ({
  statics,
  model,
  loading,
}))(Bug);

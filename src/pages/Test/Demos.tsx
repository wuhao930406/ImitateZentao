import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Input,
  message,
  List,
  Card,
  Popconfirm,
  Divider,
  Row,
  Col,
  Tooltip,
  Modal,
} from 'antd';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutoTable from '@/components/AutoTable';
import {
  getColumnSearchProps,
  getColumnSelectProps,
  getColumnTreeSelectProps,
  getColumnRangeProps,
  getColumnRangeminProps,
} from '@/components/TbSearch';
import Dia from '@/components/Dia/index';
import DemoList from './DemoList';
import DemoAction from './DemoAction';
import EditIcon from '@material-ui/icons/Edit';
import mockfile from '@/utils/mockfile';
import Projectdetail from '@/components/Projectdetail';
import Demodetail from '@/components/Demodetail';
import rendercolor from '@/utils/rendercor';
import Productdetail from '@/components/Productdetail';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import BugReportIcon from '@material-ui/icons/BugReport';
import DemoBug from './DemoBug';
import DeleteIcon from '@material-ui/icons/Delete';

let defaultvalue = [
  {
    id: 'fatetts',
    step: '',
    expection: '',
    children: [],
  },
];

let Demos = (props: any) => {
  let { bug, dispatch, loading, model } = props,
    projectId = model.postdata.projectId, //props projectid
    [post, cpost] = useState({
      posturl: 'bug/DemoqueryList',
      postdata: {
        projectId: projectId, //项目id，筛选条件
        caseNo: '', //用例编号，筛选条件
        caseName: '', //用例标题，筛选条件
        caseType: '', //用例类型，筛选条件
        openUserId: '', //创建人id，筛选条件
        openMinTime: '', //创建起时间，筛选条件
        openMaxTime: '', //创建止时间，筛选条件
        lastExecuteUserId: '', //执行人id，筛选条件
        lastExecuteMinTime: '', //执行起时间，筛选条件
        lastExecuteMaxTime: '', //执行止时间，筛选条件
        lastResult: '', //结果，筛选条件
        sortList: [
          //排序字段
          {
            fieldName: 'caseNo', //用例编号
            sort: '',
          },
          {
            fieldName: 'caseName', //用例标题
            sort: '',
          },
          {
            fieldName: 'caseTypeName', //用例类型名
            sort: '',
          },
          {
            fieldName: 'openUserName', //创建人名
            sort: '',
          },
          {
            fieldName: 'lastExecuteUserName', //执行人名
            sort: '',
          },
          {
            fieldName: 'lastExecuteTime', //执行时间
            sort: '',
          },
          {
            fieldName: 'lastResult',
            sort: '',
          },
        ],
      },
    }),
    [tree, ctree] = useState(),
    [iftype, ciftype] = useState({
      curitem: {},
      fullScreen: false,
      visible: false,
      title: '',
      key: '',
    }),
    defaultfields: any = {
      projectId: {
        value: projectId, //初始化值
        type: 'select', //类型
        title: '所属项目', //placeholder
        name: ['projectId'], //唯一标识
        required: true, //必填？
        disabled: true,
        options: model.ProjquerySelectList && model.ProjquerySelectList,
      },
      caseType: {
        value: '', //初始化值
        type: 'select', //类型
        title: '用例类型', //placeholder
        name: ['caseType'], //唯一标识
        required: true, //必填？
        options: bug.Demotype && bug.Demotype,
      },
      caseName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '用例名称', //placeholder
        name: ['caseName'], //唯一标识
        required: true, //必填？
        col: { span: 24 },
      },
      precondition: {
        value: '', //初始化值
        type: 'textarea', //类型
        title: '前置条件', //placeholder
        name: ['precondition'], //唯一标识
        required: false, //必填？
        col: { span: 24 },
      },
      stepList: {
        value: defaultvalue, //初始化值
        type: 'editable', //类型
        title: '用例步骤', //placeholder
        name: ['stepList'], //唯一标识
        required: true, //必填？
        col: { span: 24 },
      },
      attachmentList: {
        value: [], //初始化值
        type: 'upload',
        title: '附件',
        name: ['attachmentList'],
        required: false,
        col: { span: 24 },
      },
    },
    [fields, cf] = useState(defaultfields);

  useEffect(() => {
    let arr = ['Demotype']; //下拉框汇总
    arr.map((item: any) => {
      setNewState(dispatch, `bug/${item}`, {}, res => {
        //options:res.data.dataList
        cf({
          projectId: {
            value: projectId, //初始化值
            type: 'select', //类型
            title: '所属项目', //placeholder
            name: ['projectId'], //唯一标识
            required: true, //必填？
            disabled: true,
            options: model.ProjquerySelectList && model.ProjquerySelectList,
          },
          caseType: {
            value: '', //初始化值
            type: 'select', //类型
            title: '用例类型', //placeholder
            name: ['caseType'], //唯一标识
            required: true, //必填？
            options: res.data.dataList,
          },
          caseName: {
            value: '', //初始化值
            type: 'input', //类型
            title: '用例名称', //placeholder
            name: ['caseName'], //唯一标识
            required: true, //必填？
            col: { span: 24 },
          },
          precondition: {
            value: '', //初始化值
            type: 'textarea', //类型
            title: '前置条件', //placeholder
            name: ['precondition'], //唯一标识
            required: false, //必填？
            col: { span: 24 },
          },
          stepList: {
            value: defaultvalue, //初始化值
            type: 'editable', //类型
            title: '用例步骤', //placeholder
            name: ['stepList'], //唯一标识
            required: true, //必填？
            col: { span: 24 },
          },
          attachmentList: {
            value: [], //初始化值
            type: 'upload',
            title: '附件',
            name: ['attachmentList'],
            required: false,
            col: { span: 24 },
          },
        });
      });
    });
  }, []);

  //父级组件项目变化调用
  useMemo(() => {
    if (projectId) {
      cf((fields: any) => {
        return {
          ...fields,
          projectId: {
            value: projectId, //初始化值
            type: 'select', //类型
            title: '所属项目', //placeholder
            name: ['projectId'], //唯一标识
            required: true, //必填？
            disabled: true,
            options: model.ProjquerySelectList && model.ProjquerySelectList,
          },
        };
      });
      cpost({
        ...post,
        postdata: {
          ...post.postdata,
          projectId: projectId,
        },
      });
    }
  }, [model.postdata]);

  let columns = [
    {
      title: '用例编号',
      dataIndex: 'caseNo',
      key: 'caseNo',
      sorter: {
        multiple: 100,
      },
      ellipsis: true,
      width: 120,
      ...getColumnSearchProps('caseNo', post.postdata, handleSearch),
    },
    {
      title: '用例标题',
      dataIndex: 'caseName',
      key: 'caseName',
      ellipsis: true,
      sorter: {
        multiple: 99,
      },
      ...getColumnSearchProps('caseName', post.postdata, handleSearch),
      render(text: React.ReactNode, record: any) {
        return (
          <a
            onClick={() => {
              setNewState(
                dispatch,
                'bug/DemoqueryById',
                { id: record.id },
                () => {
                  ciftype({
                    ...iftype,
                    curitem: record,
                    visible: true,
                    title: `[${record.caseNo}]` + text,
                    key: 'detail',
                    fullScreen: true,
                  });
                },
              );
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: '用例类型',
      dataIndex: 'caseTypeName',
      key: 'caseTypeName',
      sorter: {
        multiple: 111,
      },
      width: 180,
      ...getColumnSelectProps(
        'caseType',
        bug.Demotype,
        post.postdata,
        handleSearch,
      ),
      render: (text: any, record: any) => (
        <b style={{ color: rendercolor('Buglevel', record.caseType) }}>
          {text}
        </b>
      ),
    },
    {
      title: '创建人',
      dataIndex: 'openUserName',
      key: 'openUserName',
      sorter: {
        multiple: 98,
      },
      width: 120,
      ...getColumnSelectProps(
        'openUserId',
        model.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '执行人',
      dataIndex: 'lastExecuteUserName',
      key: 'lastExecuteUserName',
      sorter: {
        multiple: 97,
      },
      width: 120,
      ...getColumnSelectProps(
        'lastExecuteUserId',
        model.UserqueryAll,
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '执行时间',
      dataIndex: 'lastExecuteTime',
      key: 'lastExecuteTime',
      sorter: {
        multiple: 113,
      },
      width: 140,
      ...getColumnRangeminProps(
        'lastExecuteMinTime',
        'lastExecuteMaxTime',
        post.postdata,
        handleSearch,
      ),
      render(text: any) {
        return (
          <span>
            {text && moment(parseInt(text)).format('YYYY-MM-DD HH:mm')}
          </span>
        );
      },
    },
    {
      title: '结果',
      dataIndex: 'lastResultName',
      key: 'lastResultName',
      sorter: {
        multiple: 96,
      },
      width: 120,

      ...getColumnSelectProps(
        'lastResult',
        [
          {
            dicName: '不通过',
            dicKey: 0,
          },
          {
            dicName: '通过',
            dicKey: 1,
          },
        ],
        post.postdata,
        handleSearch,
      ),
    },
    {
      title: '产生bug',
      dataIndex: 'bugCount',
      key: 'bugCount',
      width: 120,
      sorter: {
        multiple: 95,
      },
    },
    {
      title: '执行次数',
      dataIndex: 'executeTimes',
      key: 'executeTimes',
      sorter: {
        multiple: 94,
      },
      width: 120,
    },
    {
      title: '步骤数',
      dataIndex: 'stepCount',
      key: 'stepCount',
      sorter: {
        multiple: 92,
      },
      width: 120,
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 220,
      render: (text: any, record: any) => renderAction(record, false),
    },
  ];

  function handleSearch(value: any, dataIndex: any, dataIndexs: any) {
    if (dataIndexs) {
      cpost(() => {
        return {
          ...post,
          postdata: {
            ...post.postdata,
            [dataIndex]: value && value[0],
            [dataIndexs]: value && value[1],
          },
        };
      });
    } else {
      cpost(() => {
        return {
          ...post,
          postdata: {
            ...post.postdata,
            [dataIndex]: value,
          },
        };
      });
    }
  }

  let handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let newsorter = [];
    if (!Array.isArray(sorter)) {
      newsorter.push(sorter);
    } else {
      newsorter = sorter;
    }
    let sortList = newsorter.map((item: any, i: number) => {
      return {
        fieldName: item.columnKey,
        sort:
          item.order == 'descend' ? false : item.order == 'ascend' ? true : '',
      };
    });

    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          sortList,
        },
      };
    });
  };

  useMemo(() => {
    if (post.postdata.projectId) {
      setNewState(dispatch, post.posturl, post.postdata, () => {
        cf({
          projectId: {
            value: post.postdata.projectId, //初始化值
            type: 'select', //类型
            title: '所属项目', //placeholder
            name: ['projectId'], //唯一标识
            required: true, //必填？
            disabled: true,
            options: model.ProjquerySelectList && model.ProjquerySelectList,
          },
          caseType: {
            value: '', //初始化值
            type: 'select', //类型
            title: '用例类型', //placeholder
            name: ['caseType'], //唯一标识
            required: true, //必填？
            options: bug.Demotype && bug.Demotype,
          },
          caseName: {
            value: '', //初始化值
            type: 'input', //类型
            title: '用例名称', //placeholder
            name: ['caseName'], //唯一标识
            required: true, //必填？
            col: { span: 24 },
          },
          precondition: {
            value: '', //初始化值
            type: 'textarea', //类型
            title: '前置条件', //placeholder
            name: ['precondition'], //唯一标识
            required: false, //必填？
            col: { span: 24 },
          },
          stepList: {
            value: defaultvalue, //初始化值
            type: 'editable', //类型
            title: '用例步骤', //placeholder
            name: ['stepList'], //唯一标识
            required: true, //必填？
            col: { span: 24 },
          },
          attachmentList: {
            value: [], //初始化值
            type: 'upload',
            title: '附件',
            name: ['attachmentList'],
            required: false,
            col: { span: 24 },
          },
        });
      });
    }
  }, [post]);

  let pageChange = (page: any, pageSize: any) => {
    cpost(() => {
      return {
        ...post,
        postdata: {
          ...post.postdata,
          pageIndex: page,
          pageSize,
        },
      };
    });
  };

  function renderAction(record: any, shown: boolean) {
    return (
      <div>
        <Tooltip title="执行记录">
          <IconButton
            onClick={() => {
              setNewState(
                dispatch,
                'bug/DemoqueryListByCaseId',
                { caseId: record.id },
                () => {
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: true,
                      title: '执行记录',
                      key: 'records',
                      curitem: record,
                      fullScreen: false,
                    };
                  });
                },
              ); //DemoList
            }}
          >
            <ListAltIcon color={'action'} />
          </IconButton>
        </Tooltip>

        <Divider type="vertical"></Divider>

        <Tooltip title="执行">
          <IconButton
            onClick={() => {
              ciftype(() => {
                return {
                  ...iftype,
                  visible: true,
                  title: '执行用例',
                  key: 'action',
                  curitem: record,
                  fullScreen: false,
                };
              });
              ctree(record.stepTreeList);
            }}
          >
            <PlayCircleOutlineIcon color={'primary'} />
          </IconButton>
        </Tooltip>

        <Divider type="vertical"></Divider>
        <Tooltip title="编辑">
          <IconButton
            onClick={() => {
              cf({
                projectId: {
                  ...fields.projectId,
                  value: record.projectId, //初始化值
                },
                caseType: {
                  ...fields.caseType,
                  value: record.caseType, //初始化值
                },
                caseName: {
                  ...fields.caseName,
                  value: record.caseName, //初始化值
                },
                precondition: {
                  ...fields.precondition,
                  value: record.precondition, //初始化值
                },
                stepList: {
                  ...fields.stepList,
                  value: record.stepTreeList, //初始化值
                },
                attachmentList: {
                  ...fields.attachmentList,
                  value: record.attachmentList
                    ? mockfile(record.attachmentList)
                    : [], //初始化值
                },
              });
              ciftype(() => {
                return {
                  ...iftype,
                  visible: true,
                  title: '修改' + record.caseName,
                  key: 'edit',
                  curitem: record,
                  fullScreen: false,
                };
              });
            }}
          >
            <EditIcon color={'primary'} />
          </IconButton>
        </Tooltip>
        <Divider type="vertical"></Divider>

        <Tooltip title="转Bug">
          <IconButton
            aria-label="delete"
            onClick={() => {
              setNewState(
                dispatch,
                'bug/DemoqueryFailListByCaseId',
                { caseId: record.id },
                () => {
                  ciftype(() => {
                    return {
                      ...iftype,
                      visible: true,
                      title: '转Bug',
                      key: 'tobug',
                      curitem: record,
                      fullScreen: false,
                    };
                  });
                },
              ); //DemoList
            }}
          >
            <BugReportIcon color={'error'} />
          </IconButton>
        </Tooltip>
        <Divider type="vertical"></Divider>
        <Popconfirm
          overlayStyle={{ zIndex: 9999999999 }}
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认删除' + record.caseName + '？'}
          onConfirm={() => {
            setNewState(
              dispatch,
              'bug/DemodeleteById',
              { id: record.id },
              () => {
                message.success('删除' + record.caseName + '成功！');
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  hides(false);
                });
              },
            );
          }}
        >
          <Tooltip title="删除">
            <IconButton aria-label="delete">
              <DeleteIcon color={'error'} />
            </IconButton>
          </Tooltip>
        </Popconfirm>
      </div>
    );
  }

  function hides() {
    ciftype(() => {
      return {
        ...iftype,
        visible: false,
        fullScreen: false,
      };
    });
  }

  return (
    <Container maxWidth="xl">
      <Dia
        fullScreen={iftype.fullScreen}
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
          ciftype(() => {
            return {
              ...iftype,
              visible: key,
              fullScreen: false,
            };
          });
          // setTimeout(() => {
          //   cf(defaultfields);
          // }, 200);
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={<div style={{ height: 24 }}></div>}
      >
        {iftype.key == 'detail' ? (
          <Demodetail
            showOther={() => {
              setNewState(
                dispatch,
                'bug/ProjqueryById',
                { id: bug.DemoqueryById.data.data.projectId },
                (res: any) => {
                  Modal.info({
                    style: { top: 20 },
                    zIndex: 66,
                    width: 1200,
                    maskClosable: true,
                    title: bug.DemoqueryById.data.data.projectName,
                    content: (
                      <Projectdetail
                        showProduct={() => {
                          setNewState(
                            dispatch,
                            'bug/ProdqueryInfo',
                            { id: res.data.data.productId },
                            (result: any) => {
                              Modal.info({
                                style: { top: 20 },
                                zIndex: 66,
                                width: 1200,
                                maskClosable: true,
                                title: res.data.data.productName,
                                content: (
                                  <Productdetail maindata={result.data.data} />
                                ),
                                okText: '晓得了',
                              });
                            },
                          );
                        }}
                        maindata={res.data.data}
                      />
                    ),
                    okText: '晓得了',
                  });
                },
              );
            }}
            renderAction={() => renderAction(iftype.curitem, true)}
            maindata={bug.DemoqueryById.data.data}
          ></Demodetail>
        ) : iftype.key == 'records' ? (
          <DemoList
            dataSource={bug.DemoqueryListByCaseId.data.dataList}
          ></DemoList>
        ) : iftype.key == 'action' && iftype.visible ? (
          <DemoAction
            dataSource={tree}
            id={iftype.curitem.id}
            onChange={(value: any) => {
              ctree(value);
            }}
            cancelFn={() => {
              message.success('执行成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
              ciftype(() => {
                return {
                  ...iftype,
                  visible: false,
                  fullScreen: false,
                };
              });
            }}
          ></DemoAction>
        ) : iftype.key == 'tobug' ? (
          <DemoBug
            dataSource={bug.DemoqueryFailListByCaseId.data.dataList}
            cancelFn={async (data: any) => {
              await ciftype(() => {
                return {
                  ...iftype,
                  visible: false,
                  fullScreen: false,
                };
              });
              history.push({
                pathname: '/index/test/bugs',
                query: {
                  data: JSON.stringify(
                    data.map((item: any) => ({
                      step: item.step,
                      reality: item.reality,
                      expection: item.expection,
                    })),
                  ),
                  id: iftype.curitem.id,
                },
              });
            }}
          ></DemoBug>
        ) : (
          <InitForm
            fields={fields}
            submitData={(values: any) => {
              let newfields = JSON.parse(JSON.stringify(values));
              //文件处理
              let newlist = newfields.attachmentList.fileList
                ? newfields.attachmentList.fileList.map(
                    (items: any, i: number) => {
                      return {
                        attachmentName: items.response
                          ? items.response.data.dataList[0].name
                          : items.name,
                        attachUrl: items.response
                          ? items.response.data.dataList[0].url
                          : items.url,
                      };
                    },
                  )
                : [];
              newfields.attachmentList = newlist;

              if (iftype.key == 'active') {
                setNewState(
                  dispatch,
                  'bug/Bugactivate',
                  {
                    ...newfields,
                    id: iftype.curitem.id,
                  },
                  () => {
                    ciftype(() => {
                      return {
                        ...iftype,
                        visible: false,
                      };
                    });
                    setNewState(dispatch, post.posturl, post.postdata, () => {
                      message.success('已激活' + iftype.curitem.bugName + '！');
                    });
                  },
                );
                return;
              }

              if (iftype.key == 'deal') {
                setNewState(
                  dispatch,
                  'bug/Bugsolve',
                  {
                    ...newfields,
                    id: iftype.curitem.id,
                  },
                  () => {
                    ciftype(() => {
                      return {
                        ...iftype,
                        visible: false,
                      };
                    });
                    setNewState(dispatch, post.posturl, post.postdata, () => {
                      message.success('已处理' + iftype.curitem.bugName + '！');
                    });
                  },
                );
                return;
              }

              if (iftype.key == 'checks') {
                setNewState(
                  dispatch,
                  'bug/Bugconfirm',
                  {
                    ...newfields,
                    id: iftype.curitem.id,
                  },
                  () => {
                    ciftype(() => {
                      return {
                        ...iftype,
                        visible: false,
                      };
                    });
                    setNewState(dispatch, post.posturl, post.postdata, () => {
                      message.success('已验收' + iftype.curitem.bugName + '！');
                    });
                  },
                );

                return;
              }

              //新增修改
              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
              } else if (iftype.key == 'add') {
                delete newfields.id;
              }

              newfields.stepList = newfields.stepList.map((item: any) => {
                if (item.id.indexOf('tts') != -1) {
                  item.id = '';
                  item.parentId = '';
                }
                item.children = item.children.map((it: any) => {
                  if (it.id.indexOf('tts') != -1) {
                    it.id = '';
                    it.parentId = '';
                  }
                  return {
                    id: it.id,
                    parentId: it.parentId,
                    step: it.step, //步骤，必填
                    expection: it.expection,
                    children: it.children,
                  };
                });
                return {
                  id: item.id,
                  parentId: item.parentId,
                  step: item.step, //步骤，必填
                  expection: item.expection,
                  children: item.children,
                };
              });

              setNewState(dispatch, 'bug/Demosave', newfields, () => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: false,
                  };
                });
                setNewState(dispatch, post.posturl, post.postdata, () => {
                  message.success('操作成功');
                });
              });
            }}
            onChange={(newFields: any) => {}}
            submitting={
              props.loading.effects['bug/Demosave'] || !iftype.visible
            }
          ></InitForm>
        )}
      </Dia>
      <Card
        title={props.route.name}
        extra={
          <div>
            <IconButton
              style={{ padding: 8, borderRadius: 4 }}
              onClick={() => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    fullScreen: false,
                    title: '新增用例',
                    key: 'add',
                  };
                });
                //cf(defaultfields);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '6px 12px',
                }}
              >
                <AddCircleOutlineIcon
                  style={{ fontSize: 22 }}
                  color="primary"
                />
                <span
                  style={{ fontSize: 14, color: '#1183fb', paddingLeft: 6 }}
                >
                  新增
                </span>
              </div>
            </IconButton>
          </div>
        }
      >
        <AutoTable
          data={bug.DemoqueryList}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
          onChange={handleTableChange}
          scroll={{ y: '65vh' }}
        />
      </Card>
    </Container>
  );
};

export default connect(({ bug, model, loading }: any) => ({
  bug,
  model,
  loading,
}))(Demos);

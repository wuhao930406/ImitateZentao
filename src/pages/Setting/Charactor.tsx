import React, { useEffect, useState, useMemo } from 'react';
import styles from './index.less';
import { connect, history } from 'umi';
import Button from '@material-ui/core/Button';
import InitForm from '@/components/InitForm';
import moment from 'moment';
import {
  Tooltip,
  Tree,
  Input,
  message,
  Table,
  Card,
  Popconfirm,
  Divider,
} from 'antd';
import Container from '@material-ui/core/Container';
import setNewState from '@/utils/setNewState';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AutoTable from '@/components/AutoTable';
import Dia from '@/components/Dia/index';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';

let Charactor = (props: any) => {
  let { set, dispatch, loading } = props,
    [post, cpost] = useState({
      posturl: 'set/ChaqueryList',
      postdata: {
        pageIndex: '1',
        pageSize: '10',
        sortList: [
          //--------------------------排序
          {
            fieldName: 'roleNo', //---------编号
            sort: '',
          },
        ],
      },
    }),
    [iftype, ciftype] = useState({
      curitem: {},
      visible: false,
      title: '',
      key: '',
    }),
    defaultfields: any = {
      roleName: {
        value: '', //初始化值
        type: 'input', //类型
        title: '角色名称', //placeholder
        name: ['roleName'], //唯一标识
        required: true, //必填？
      },
      roleNo: {
        value: '', //初始化值
        type: 'input', //类型
        title: '角色编号', //placeholder
        name: ['roleNo'], //唯一标识
        required: true, //必填？
      },
      description: {
        value: '', //初始化值
        type: 'textarea', //类型
        title: '描述', //placeholder
        name: ['description'], //唯一标识
        required: false, //必填？
        col: { span: 24 },
        rows: 6,
      },
    },
    [fields, cf] = useState(defaultfields),
    [permissionIdList, cp] = useState([]);

  useEffect(() => {
    setNewState(dispatch, post.posturl, post.postdata, () => {});
    setNewState(dispatch, 'set/UserqueryAll', {}, () => {}); //用户列表
    setNewState(dispatch, 'set/UserqueryWechatList', {}, () => {}); //微信列表
    setNewState(dispatch, 'set/UserqueryTreeList', {}, () => {}); //部门树
    setNewState(dispatch, 'set/UserqueryAllSelect', {}, () => {}); //部门树
  }, []);

  let columns = [
    {
      title: '角色编号',
      sorter: {
        multiple: 98,
      },
      width: 140,
      dataIndex: 'roleNo',
      key: 'roleNo',
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName',
      width: 180,
      ellipsis: true,
      sorter: {
        multiple: 100,
      },
    },
    {
      title: '描述',
      sorter: {
        multiple: 98,
      },
      ellipsis: true,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 130,
      render: (text: any, record: any) => renderAction(record),
    },
  ];

  function renderAction(record: any) {
    return (
      <div>
        <IconButton
          disabled={record.roleType == '1'}
          onClick={() => {
            cf({
              roleName: {
                ...fields.roleName,
                value: record.roleName, //初始化值
              },
              roleNo: {
                ...fields.roleNo,
                value: record.roleNo, //初始化值
              },
              description: {
                ...fields.description,
                value: record.description, //初始化值
              },
            });
            ciftype(() => {
              return {
                ...iftype,
                visible: true,
                title: '修改角色信息',
                key: 'edit',
                curitem: record,
              };
            });
          }}
        >
          <Tooltip title="修改">
            <EditIcon color={record.roleType == '1' ? 'action' : 'primary'} />
          </Tooltip>
        </IconButton>
        <Divider type="vertical"></Divider>

        <Popconfirm
          okText="确认"
          cancelText="取消"
          placement="bottom"
          title={'确认删除该角色？'}
          onConfirm={() => {
            setNewState(dispatch, 'set/Chadelete', { id: record.id }, () => {
              message.success('删除成功！');
              setNewState(dispatch, post.posturl, post.postdata, () => {});
            });
          }}
        >
          <Tooltip title="删除">
            <IconButton disabled={record.roleType == '1'}>
              <DeleteIcon color={record.roleType == '1' ? 'action' : 'error'} />
            </IconButton>
          </Tooltip>
        </Popconfirm>
        <Divider type="vertical"></Divider>
        <IconButton
          aria-label="delete"
          onClick={() => {
            setNewState(
              dispatch,
              'set/ChaqueryAllByRoleId',
              { roleId: record.id },
              () => {
                ciftype(() => {
                  return {
                    ...iftype,
                    visible: true,
                    title: '角色关联权限',
                    key: 'link',
                    curitem: record,
                  };
                });
              },
            );
          }}
        >
          <Tooltip title="关联权限">
            <LinkIcon color="default" />
          </Tooltip>
        </IconButton>
      </div>
    );
  }

  function handleSearch(value: any, dataIndex: any) {
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
    setNewState(dispatch, post.posturl, post.postdata, () => {});
  }, [post]);

  useMemo(() => {
    cp(set.ChaqueryAllByRoleId.data.data.haveIdList);
  }, [iftype]);

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

  return (
    <Container maxWidth="xl">
      <Dia
        show={iftype.visible}
        cshow={(key: React.SetStateAction<boolean>) => {
          ciftype(() => {
            return {
              ...iftype,
              visible: key,
            };
          });
        }}
        maxWidth="lg"
        title={iftype.title}
        footer={
          iftype.key == 'link' && iftype.curitem.roleType != '1' ? (
            false
          ) : (
            <div style={{ height: 24 }}></div>
          )
        }
        onOk={() => {
          let postData = {
            roleId: iftype.curitem.id,
            permissionIdList: permissionIdList.checked,
          };
          setNewState(dispatch, 'set/Chamissave', postData, () => {
            setNewState(dispatch, post.posturl, post.postdata, () => {
              ciftype(() => {
                return {
                  ...iftype,
                  visible: false,
                };
              });
            });
            message.success('授权成功');
          });
        }}
      >
        {iftype.key == 'link' ? (
          <div>
            <Tree
              checkStrictly={true}
              checkable
              defaultExpandAll={true}
              onCheck={(checkedKeys: any, info: any) => {
                cp(checkedKeys);
              }}
              checkedKeys={permissionIdList}
              treeData={set.ChaqueryAllByRoleId.data.data.premList}
            />
          </div>
        ) : (
          <InitForm
            fields={fields}
            submitData={(values: any) => {
              let newfields = JSON.parse(JSON.stringify(values));
              if (iftype.key == 'edit') {
                newfields.id = iftype.curitem.id;
              }
              setNewState(dispatch, 'set/Chasave', newfields, () => {
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
            submitting={props.loading.effects['set/Chasave'] || !iftype.visible}
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
                    title: '新增角色',
                    key: 'add',
                  };
                });
                cf(defaultfields);
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
          scroll={{ y: '65vh' }}
          data={set.ChaqueryList}
          columns={columns}
          loading={loading.effects[post.posturl]}
          pageChange={pageChange}
          onChange={handleTableChange}
        />
      </Card>
    </Container>
  );
};

export default connect(({ set, loading }: any) => ({
  set,
  loading,
}))(Charactor);

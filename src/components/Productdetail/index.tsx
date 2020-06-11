import React, { useEffect, useState, useMemo } from 'react';
import moment from 'moment';
import { List, Card, Row, Col } from 'antd';
import rendercolor from '@/utils/rendercor';
import DetailItem from '@/components/DetailItem';
import Button from '@material-ui/core/Button';

let Productdetail = (props: any) => {
  let { renderAction, maindata } = props;
  let columns = [
    {
      title: '产品编号',
      dataIndex: 'productNo',
      key: 'productNo',
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
    },
    {
      title: '产品负责人',
      dataIndex: 'chargeUserName',
      key: 'chargeUserName',
    },
    {
      title: '创建人',
      dataIndex: 'openUserName',
      key: 'openUserName',
    },
    {
      title: '由谁创建',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: '由谁激活',
      dataIndex: 'activateDate',
      key: 'activateDate',
    },
    {
      title: '由谁关闭',
      dataIndex: 'closeDate',
      key: 'closeDate',
    },
  ];

  let renderdetail = () => {
    let listdata: any,
      dataSource: any[] = [],
      newcolumns = JSON.parse(JSON.stringify(columns)).filter((it: any) => {
        return it.dataIndex != 'action' && it.dataIndex != 'openUserName';
      }), //过滤不需要的
      addarr = [
        {
          title: '产品描述',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '附件',
          dataIndex: 'attachmentList',
          key: 'attachmentList',
        },
      ]; //初始化
    if (maindata) {
      listdata = maindata.product;
    }

    newcolumns = [...newcolumns, ...addarr];

    if (listdata) {
      dataSource = newcolumns.map((item: any) => {
        let date = listdata[item.dataIndex]
          ? moment(parseInt(listdata[item.dataIndex])).format('YYYY-MM-DD')
          : '-';
        return {
          title: item.title,
          dataIndex: item.dataIndex,
          value:
            item.dataIndex == 'openDate'
              ? listdata.openUserName &&
                `${listdata.openUserName} 于 ${date}创建`
              : item.dataIndex == 'closeDate'
              ? listdata.closeUserName &&
                `${listdata.closeUserName} 于 ${date}关闭`
              : item.dataIndex == 'activateDate'
              ? listdata.activateUserName &&
                `${listdata.activateUserName} 于 ${date}激活`
              : listdata[item.dataIndex],
        };
      });
    }

    let info1 = [
      'statusName',
      'productNo',
      'productName',
      'description',
      'attachmentList',
      'chargeUserName',
    ].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    let info2 = ['openDate', 'activateDate', 'closeDate'].map((item: any) => {
      return dataSource.filter((it: any) => {
        return it.dataIndex == item;
      })[0];
    });
    function renderList(list: any[]) {
      if (list) {
        return list.map((item, i) => (
          <Button
            color="primary"
            disableElevation
            style={{ marginRight: 12, marginBottom: 6, marginTop: 6 }}
            onClick={() => {
              window.open(item.attachUrl);
            }}
          >
            {item.attachmentName}
          </Button>
        ));
      } else {
        return '';
      }
    }
    return (
      <div>
        <Card bordered={false}>
          <Row gutter={24}>
            <Col span={6}>
              <h4>项目数</h4>
              <span style={{ fontSize: 20, color: 'green' }}>
                {maindata.productSum}
              </span>
            </Col>
            <Col span={6}>
              <h4>任务数</h4>
              <span style={{ fontSize: 20, color: 'green' }}>
                {maindata.taskSum}
              </span>
            </Col>
            <Col span={6}>
              <h4>用例数</h4>
              <span style={{ fontSize: 20, color: 'green' }}>
                {maindata.exampleSum}
              </span>
            </Col>
            <Col span={6}>
              <h4>相关bug</h4>
              <span style={{ fontSize: 20, color: 'green' }}>
                {maindata.bugSum}
              </span>
            </Col>
          </Row>
        </Card>
        <List
          dataSource={info1}
          bordered
          renderItem={(item: any) =>
            item.value && (
              <List.Item>
                <DetailItem
                  key={item.dataIndex}
                  title={item.title}
                  value={
                    item.dataIndex == 'attachmentList'
                      ? renderList(item.value)
                      : item.value
                  }
                  contentstyle={{
                    color: rendercolor('Productstatus', item.value),
                  }}
                />
              </List.Item>
            )
          }
        />
        <List
          style={{ marginTop: 24 }}
          footer={
            renderAction ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {renderAction()}
              </div>
            ) : (
              false
            )
          }
          bordered
          dataSource={info2}
          renderItem={(item: any) =>
            item.value && (
              <List.Item>
                <DetailItem
                  key={item.dataIndex}
                  title={item.title}
                  value={item.value}
                  contentstyle={{ color: '#666' }}
                />
              </List.Item>
            )
          }
        />
      </div>
    );
  };

  return renderdetail();
};

export default Productdetail;

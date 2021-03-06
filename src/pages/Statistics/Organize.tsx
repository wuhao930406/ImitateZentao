import React, { useEffect, useState, useMemo } from 'react';
import { connect, history } from 'umi';
import Container from '@material-ui/core/Container';
import { Card, Row, Col } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import styles from './style.less';
import AutoTable from '@/components/AutoTable';
import TaskFinish from './components/TaskFinish';
import Bug from './components/Bug';

let Organize = (props: any) => {
  let [curindex, changecur] = useState(0);

  let col = { xs: 24, sm: 24, md: 6, lg: 5, xl: 4, xxl: 4 },
    cols = { xs: 24, sm: 24, md: 18, lg: 19, xl: 20, xxl: 20 },
    menu = ['开发统计表', '测试统计表'];

  return (
    <Container maxWidth="xl">
      <Row gutter={24}>
        <Col {...col}>
          <Card title="统计报表" style={{ marginBottom: 12 }}>
            {menu.map((item: any, i: any) => {
              return (
                <IconButton
                  key={i}
                  style={{ borderRadius: 0, width: '100%' }}
                  onClick={() => {
                    changecur(i);
                  }}
                >
                  <p
                    title={item}
                    className={curindex == i ? styles.cur : styles.text}
                  >
                    <i></i>
                    {item}
                  </p>
                </IconButton>
              );
            })}
          </Card>
        </Col>
        <Col {...cols}>
          <Card>
            {curindex == 0 ? (
              <TaskFinish></TaskFinish>
            ) : curindex == 1 ? (
              <Bug></Bug>
            ) : null}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Organize;

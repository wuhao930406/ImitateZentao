import React, { useEffect, useState } from 'react';
import { Tree, Card, Empty } from 'antd';

let DetailItem = (props: any) => {
  let { title, value, width, titlestyle, contentstyle, hdClick } = props;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <div style={{ ...titlestyle, width: width ? width : 110, fontSize: 16 }}>
        {title} :
      </div>
      <div style={{ ...contentstyle, flex: 1 }} onClick={hdClick}>
        {value}
      </div>
    </div>
  );
};

export default DetailItem;

import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { DeploymentUnitOutlined } from '@ant-design/icons';


interface BtnPopUpMsgProps {
  title:string; 
  msg: string;
  btnContent: string;
}


const btnPopUpMsg: React.FC<BtnPopUpMsgProps> = ({
    title,
    msg,
    btnContent,
}) => {
  

  return (
    <Popconfirm
      placement="bottomRight"
      title={title}
      description={ msg }
      okText={btnContent}
      cancelText="ביטול"
    >
    </Popconfirm>
  );
};

export default btnPopUpMsg;

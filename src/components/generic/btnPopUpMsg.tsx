import React from 'react';
import { Popconfirm } from 'antd';

type BtnPopUpMsgProps = {
  title: string;
  msg: string;
  btnContent: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
};

const BtnPopUpMsg: React.FC<BtnPopUpMsgProps> = ({
  title,
  msg,
  btnContent,
  isOpen,
  onConfirm,
  onCancel,
  children,
}) => {
  return (
        <Popconfirm
          placement="bottomRight"
          title={title}
          description={msg}
          okText={btnContent}
          cancelText="ביטול"
          onCancel={onCancel}
          onConfirm={onConfirm}
          open={isOpen}
        >
          {children}
        </Popconfirm>
  );
};

export default BtnPopUpMsg;

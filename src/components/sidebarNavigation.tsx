import React from 'react';
import { Layout, Menu, Tooltip } from 'antd';
import { TbBus } from 'react-icons/tb';
import { BiSupport } from 'react-icons/bi';
import marpeLogo from '../assets/marpeLogo.png';
const { Sider } = Layout;

const SidebarNavigation: React.FC = () => {
  return (
    <Sider className="sidebar-navigation">
      <img className="sidebar-navigation--image" src={marpeLogo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<TbBus />}></Menu.Item>
      </Menu>

      <div className="sidebar-navigation--helper">
        <Tooltip title="צרו איתנו קשר 08-9902397">
          <BiSupport className="sidebar-navigation--helper-icon" />
        </Tooltip>
      </div>
    </Sider>
  );
};

export default SidebarNavigation;

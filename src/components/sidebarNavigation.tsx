import React from 'react';
import { Layout, Menu } from 'antd';
import { TbBus } from 'react-icons/tb';
import marpeLogo from '../../public/assets/marpeLogo.png';
const { Sider } = Layout;

const SidebarNavigation: React.FC = () => {
  return (
    <Sider>
      <img className="sidebar-navigation--image" src={marpeLogo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<TbBus />}></Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarNavigation;

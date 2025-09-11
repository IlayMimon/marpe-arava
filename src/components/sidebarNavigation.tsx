import React from "react";
import { Layout, Menu } from "antd";
import { TbBus } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import marpeLogo from "../assets/marpeLogo.png";
const { Sider } = Layout;

type SidebarProps = {
  onStayInTouch: () => void;
};

const SidebarNavigation: React.FC<SidebarProps> = ({ onStayInTouch }) => {
  return (
    <Sider className="sidebar-navigation">
      <img className="sidebar-navigation--image" src={marpeLogo} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<TbBus />}></Menu.Item>
      </Menu>

      <div className="sidebar-navigation--helper" onClick={onStayInTouch}>
        <BiSupport className="sidebar-navigation--helper-icon" />
      </div>
    </Sider>
  );
};

export default SidebarNavigation;

import React, { Fragment } from "react";
import {
  FileOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "../../../component/Header/HeaderAdmin";
const { Content, Footer, Sider } = Layout;


const { SubMenu } = Menu;

export default function AdminTemplate({ component }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" style={{ textAlign: "center", padding: 16 }}>
          <NavLink to={"/admin"}>
            <img
              className="mx-auto"
              src="./netflix.png"
              alt="Netflix Logo"
              style={{ width: 50 }}
            />
          </NavLink>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          // items={items}
        >
          {/* <SubMenu key="1" icon={<TeamOutlined />} title="Quản Lý Người Dùng">
            <Menu.Item key="1-1">
              <NavLink to="/admin/users">User</NavLink>
            </Menu.Item>
            <Menu.Item key="1-2">Lấy Thông Tin Tài Khoản</Menu.Item>
          </SubMenu> */}
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/admin/users">User</NavLink>
          </Menu.Item>
          <SubMenu key="sub1" icon={<TeamOutlined />} title="Films">
            <Menu.Item key="10" icon={<FileOutlined />}>
              <NavLink to="/admin/films">Films</NavLink>
            </Menu.Item>
            <Menu.Item key="11" icon={<FileOutlined />}>
              <NavLink to="/admin/films/addnew">Add new</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <NavLink to="/admin/show-times">Show Time</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
          <HeaderAdmin />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {component}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

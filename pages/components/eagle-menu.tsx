import React from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  SwapOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("全部", "all", <FileImageOutlined />),
  getItem("未标签", "notTag", <FileUnknownOutlined />),
  getItem("随机模式", "random", <SwapOutlined />),
  getItem("标签管理", "tags", <TagsOutlined />),
  getItem("回收站", "recycle", <DeleteOutlined />),
];

const App: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["all"]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
};

export default App;

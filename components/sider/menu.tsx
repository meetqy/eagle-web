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
import { useRouter } from "next/router";

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
  getItem("未标签", "not-tag", <FileUnknownOutlined />),
  getItem("随机模式", "random", <SwapOutlined />),
  getItem("标签管理", "tags", <TagsOutlined />),
  getItem("回收站", "recycle", <DeleteOutlined />),
];

const SiderMenu: React.FC = () => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push("/" + e.key);
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

export default SiderMenu;

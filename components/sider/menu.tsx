import React, { useState } from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  SwapOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Badge, Button, MenuProps, Tag } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";
import countStore from "@/store/count";

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

const SiderMenu = observer(() => {
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    router.push("/" + e.key);
  };

  const items: MenuProps["items"] = [
    getItem(
      <span
        style={{
          display: "inline-flex",
          width: "80%",
          justifyContent: "space-between",
        }}
      >
        <span>全部</span>
        <span style={{ color: "#a3a4a8" }}>{countStore.all}</span>
      </span>,
      "all",
      <FileImageOutlined />
    ),
    getItem("未标签", "not-tag", <FileUnknownOutlined />),
    getItem("随机模式", "random", <SwapOutlined />),
    getItem("标签管理", "tags", <TagsOutlined />),
    getItem("回收站", "recycle", <DeleteOutlined />),
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["all"]}
        mode="vertical"
        theme="dark"
        items={items}
      />
    </>
  );
});

export default SiderMenu;

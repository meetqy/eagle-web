import React, { useState } from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  SwapOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Menu, theme } from "antd";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { themeState, totalState } from "@/store";

const { useToken } = theme;

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

const SiderMenu = () => {
  const themeMode = useRecoilValue(themeState);
  const total = useRecoilValue(totalState);
  const { token } = useToken();
  const router = useRouter();

  const items: MenuProps["items"] = [
    getItem(
      <span
        style={{
          display: "inline-flex",
          width: "85%",
          justifyContent: "space-between",
        }}
      >
        <span>全部</span>
        <span
          style={{
            color: token.colorTextDescription,
          }}
        >
          {total.all}
        </span>
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
        style={{ height: "100%", width: "100%" }}
        onClick={(e) => {
          router.push("/" + e.key);
        }}
        defaultSelectedKeys={["all"]}
        mode="vertical"
        theme={themeMode}
        items={items}
      />
    </>
  );
};

export default SiderMenu;

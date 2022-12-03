import React from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  SwapOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Badge, Button, MenuProps } from "antd";
import { Menu } from "antd";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { totalState } from "@/store/total";

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
  const router = useRouter();
  const total = useRecoilValue(totalState);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push("/" + e.key);
  };

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
        <span style={{ color: "rgba(255,255,255,.5)" }}>{total.all}</span>
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
};

export default SiderMenu;

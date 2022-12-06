import React from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState, themeState, totalState } from "@/store";

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
  const [_menu, setMenu] = useRecoilState(activeMenuState);
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
        <label>全部</label>
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
    getItem(
      <span>
        <label>未标签</label>
      </span>,
      "not-tag",
      <FileUnknownOutlined />
    ),
    getItem(
      <span>
        <label>随机模式</label>
      </span>,
      "random",
      <SwapOutlined />
    ),
    getItem(
      <span>
        <label>标签管理</label>
      </span>,
      "tags",
      <TagsOutlined />
    ),
    getItem(
      <span>
        <label>回收站</label>
      </span>,
      "recycle",
      <DeleteOutlined />
    ),
  ];

  return (
    <>
      <Menu
        style={{ height: "100%", width: "100%" }}
        onClick={(e) => {
          const name = (e.domEvent.target as HTMLElement).querySelector(
            "label"
          )?.innerText;

          setMenu({
            name: name || "",
            key: e.key,
          });
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

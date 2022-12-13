import React, { useEffect, useMemo, useState } from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, MenuProps, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeImageState,
  activeMenuState,
  themeState,
  totalState,
} from "@/store";

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

function handleLabel(name: string, desc: number) {
  return (
    <Row justify={"space-between"}>
      <Col flex={1}>{name}</Col>
      <Col>
        <Typography.Text type="secondary">{desc}</Typography.Text>
      </Col>
    </Row>
  );
}

const SiderMenu = () => {
  const [activeMenu, setActiveMenu] = useRecoilState(activeMenuState);
  const [_activeImage, setActiveImage] = useRecoilState(activeImageState);
  const themeMode = useRecoilValue(themeState);
  const total = useRecoilValue(totalState);
  const router = useRouter();

  const [items, setItems] = useState<MenuProps["items"]>();

  useEffect(() => {
    setItems([
      getItem(handleLabel("全部", total.all), "all", <FileImageOutlined />),
      getItem(
        handleLabel("未标签", total["not-tag"]),
        "not-tag",
        <FileUnknownOutlined />
      ),
      getItem(handleLabel("标签管理", total.tags), "tags", <TagsOutlined />),
      getItem(
        handleLabel("回收站", total.recycle),
        "recycle",
        <DeleteOutlined />
      ),
    ]);
  }, [total]);

  const selectedKeys = useMemo(
    () => (activeMenu?.key ? [activeMenu.key.toString()] : []),
    [activeMenu]
  );
  useEffect(() => {
    const route = router.route.replace("/", "") || "all";

    if (route != activeMenu?.key && items) {
      const index = items.findIndex(
        (item) => item?.key && route.includes(item?.key?.toString())
      );

      setActiveMenu(items[index]);
    }
  }, [items, router]);

  return (
    <>
      <Menu
        style={{ width: "100%", padding: 10 }}
        mode="inline"
        theme={themeMode}
        items={items}
        selectedKeys={selectedKeys}
        onSelect={(e) => {
          const item = items?.find((item) => item?.key === e.key);
          setActiveMenu(item);
          setActiveImage(undefined);

          if (e.key === "tags") {
            router.push("/" + e.key + "/label");
          } else {
            router.push("/" + e.key);
          }
        }}
      />
    </>
  );
};

export default SiderMenu;

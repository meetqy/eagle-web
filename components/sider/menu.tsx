import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row, theme } from "antd";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeMenuState, themeState, Total, totalState } from "@/store";

const { useToken } = theme;

const SiderMenu = () => {
  const [activeMenu, setActiveMneu] = useRecoilState(activeMenuState);
  const themeMode = useRecoilValue(themeState);
  const total = useRecoilValue(totalState);
  const { token } = useToken();
  const router = useRouter();

  const [items, setItems] = useState<EagleWeb.MenuItem[]>([
    {
      key: "all",
      name: "全部",
      route: "all",
      icon: <FileImageOutlined />,
      count: total.all,
      basic: false,
    },
    {
      key: "notTag",
      name: "未标签",
      route: "not-tag",
      icon: <FileUnknownOutlined />,
      count: total.notTag,
      basic: false,
    },
    {
      key: "tags",
      name: "标签管理",
      route: "tags",
      icon: <TagsOutlined />,
      count: total.tags,
      basic: true,
    },
    {
      key: "recycle",
      name: "回收站",
      route: "recycle",
      icon: <DeleteOutlined />,
      count: total.recycle,
      basic: false,
    },
  ]);

  useEffect(() => {
    const route = router.route.replace("/", "") || "all";

    const index = items.findIndex((item) => route.includes(item.route));

    const item = {
      ...items[index],
      count: total[items[index].key as keyof Total],
    };

    items[index] = item;

    setActiveMneu(item);
    setItems([...items]);
  }, [total]);

  return (
    <>
      <Menu
        style={{ height: "100%", width: "100%", padding: 10 }}
        mode="vertical"
        theme={themeMode}
        selectedKeys={activeMenu ? [activeMenu.key] : []}
        onSelect={(item) => {
          const menu = items.find((v) => v.key === item.key);
          setActiveMneu(menu);
          router.push("/" + menu?.route);
        }}
        items={items.map((item) => {
          return {
            key: item.key,
            icon: item.icon,
            label: (
              <Row
                style={{
                  display: "inline-flex",
                  width: "85%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col> {item.name}</Col>
                <Col>
                  <span
                    style={{
                      color: token.colorTextDescription,
                    }}
                  >
                    {item.count}
                  </span>
                </Col>
              </Row>
            ),
          };
        })}
      />
    </>
  );
};

export default SiderMenu;

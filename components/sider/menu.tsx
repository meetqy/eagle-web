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
      basic: false,
    },
    {
      key: "notTag",
      name: "未标签",
      route: "not-tag",
      icon: <FileUnknownOutlined />,
      basic: false,
    },
    {
      key: "tags",
      name: "标签管理",
      route: "tags",
      icon: <TagsOutlined />,
      basic: true,
    },
    {
      key: "recycle",
      name: "回收站",
      route: "recycle",
      icon: <DeleteOutlined />,
      basic: false,
    },
  ]);

  useEffect(() => {
    const route = router.route.replace("/", "") || "all";
    if (route != activeMenu?.route) {
      const index = items.findIndex((item) => route.includes(item.route));

      setActiveMneu(items[index]);
    }
  }, [router.route, setActiveMneu, items, activeMenu]);

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

          if (menu?.route === "tags") {
            router.push("/" + menu?.route + "/label");
          } else {
            router.push("/" + menu?.route);
          }
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
                    {total[item.key as keyof Total]}
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

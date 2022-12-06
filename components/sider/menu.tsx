import React, { useEffect } from "react";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileUnknownOutlined,
  SwapOutlined,
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

  const items: EagleWeb.MenuItem[] = [
    {
      key: "all",
      name: "全部",
      route: "all",
      icon: <FileImageOutlined />,
      count: total.all,
    },
    {
      key: "notTag",
      name: "未标签",
      route: "not-tag",
      icon: <FileUnknownOutlined />,
      count: total.notTag,
    },
    {
      key: "random",
      name: "随机模式",
      route: "random",
      icon: <SwapOutlined />,
      count: 0,
    },
    {
      key: "tags",
      name: "标签管理",
      route: "tags",
      icon: <TagsOutlined />,
      count: total.tags,
    },
    {
      key: "recycle",
      name: "回收站",
      route: "recycle",
      icon: <DeleteOutlined />,
      count: total.recycle,
    },
  ];

  useEffect(() => {
    const route = router.route.replace("/", "");
    const menu = items.find((item) => item.route === route);
    setActiveMneu(menu);
  }, [router]);

  return (
    <>
      <Menu
        style={{ height: "100%", width: "100%" }}
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
      >
        {/* {items.map((item) => (
          <Menu.Item key={item.key}>
            <label style={{ width: "80%", display: "inline-flex" }}>
              <span style={{ marginRight: 10 }}>{item.icon}</span>
              {item.name}
            </label>
            <span
              style={{
                color: token.colorTextDescription,
              }}
            >
              {item.count}
            </span>
          </Menu.Item>
        ))} */}
      </Menu>
    </>
  );
};

export default SiderMenu;

import {
  AppstoreAddOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Col, Menu, Row, theme } from "antd";

const TagsMenu = () => {
  const { token } = theme.useToken();

  const items: {
    icon: JSX.Element;
    title: string;
    key: string;
    count: number;
  }[] = [
    {
      icon: <AppstoreAddOutlined />,
      title: "标签管理",
      key: "label",
      count: 0,
    },
    {
      icon: <QuestionCircleOutlined />,
      title: "未分类",
      key: "not-category",
      count: 0,
    },
    {
      icon: <StarOutlined />,
      title: "常用标签",
      key: "starred-tags",
      count: 0,
    },
  ];

  const group = [
    {
      icon: <StarOutlined />,
      title: "常用标签",
      key: "starred-tags",
      count: 0,
    },
  ];

  return (
    <>
      <Menu
        style={{ padding: 10 }}
        items={items.map((item) => {
          return {
            key: item?.key,
            icon: item?.icon,
            label: (
              <Row
                style={{
                  display: "inline-flex",
                  width: "85%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col> {item.title}</Col>
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
      <p style={{ padding: "5px 10px", fontWeight: "bold" }}>标签群组(1)</p>
      <Menu
        style={{ padding: 10 }}
        items={group.map((item) => {
          return {
            key: item?.key,
            icon: item?.icon,
            label: (
              <Row
                style={{
                  display: "inline-flex",
                  width: "85%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Col> {item.title}</Col>
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

export default TagsMenu;

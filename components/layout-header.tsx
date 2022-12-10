import { activeMenuState } from "@/store";
import {
  CaretDownOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Input,
  Layout,
  Popover,
  Row,
  Select,
  Slider,
  theme,
  Typography,
} from "antd";
import { useRecoilValue } from "recoil";

const LayoutHeader = () => {
  const { token } = theme.useToken();
  const activeMenu = useRecoilValue(activeMenuState);

  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: token.colorBgContainer,
        zIndex: 999,
        height: 72,
        padding: "0 20px",
        lineHeight: "36px",
      }}
    >
      <Row justify="space-between" align="middle" style={{ height: 32 }}>
        <Col>
          <Button type="text" size="small" style={{ fontWeight: "bold" }}>
            {activeMenu?.name}
          </Button>
        </Col>

        <Col>
          <Slider max={12} min={1} style={{ width: 120 }} />
        </Col>

        <Col>
          <Row gutter={[10, 0]}>
            <Col>
              <Popover
                trigger="click"
                content={
                  <Select
                    size="small"
                    style={{ width: 100 }}
                    placeholder="排序方式"
                    options={[
                      {
                        value: "jack",
                        label: "创建日期",
                      },
                      {
                        value: "lucy",
                        label: "修改日期",
                      },
                      {
                        value: "tom",
                        label: "创建日期",
                      },
                    ]}
                  />
                }
              >
                <Button
                  icon={<SwapOutlined rotate={90} />}
                  type="text"
                  size="small"
                />
              </Popover>
            </Col>
            <Col>
              <Input
                placeholder="搜索"
                size="small"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row style={{ height: 32 }} align="middle">
        {[
          "标签",
          "文件夹",
          "形状",
          "评分",
          "添加日期",
          "尺寸",
          "大小",
          "注释",
          "链接",
        ].map((item) => (
          <Col key={item}>
            <Popover
              placement="bottom"
              title={item}
              content={item}
              trigger="click"
            >
              <Button size="small" type="text">
                {item} <CaretDownOutlined style={{ fontSize: 10 }} />
              </Button>
            </Popover>
          </Col>
        ))}
      </Row>
    </Layout.Header>
  );
};

export default LayoutHeader;

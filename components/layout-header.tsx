import { activeMenuState, orderState, sortState } from "@/store";
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
  Radio,
  Row,
  Select,
  Slider,
  Switch,
  theme,
} from "antd";
import { useRecoilState, useRecoilValue } from "recoil";

const LayoutHeader = () => {
  const { token } = theme.useToken();
  const activeMenu = useRecoilValue(activeMenuState);
  const [order, setOrder] = useRecoilState(orderState);
  const [sort, setSort] = useRecoilState(sortState);

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
          <Slider max={12} min={1} style={{ width: 120 }} disabled />
        </Col>

        <Col>
          <Row gutter={[10, 0]}>
            <Col>
              <Popover
                trigger="click"
                content={
                  <Row style={{ width: 100 }} gutter={[0, 10]}>
                    <Col flex={1} style={{ textAlign: "center" }}>
                      <Radio.Group
                        optionType="button"
                        size="small"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        buttonStyle="solid"
                        options={[
                          { label: "升序", value: "asc" },
                          { label: "降序", value: "desc" },
                        ]}
                      />
                    </Col>

                    <Col flex={1}>
                      <Select
                        size="small"
                        style={{ width: 100 }}
                        value={sort}
                        onChange={setSort}
                        placeholder="排序方式"
                        options={[
                          {
                            value: "modificationTime",
                            label: "添加日期",
                          },
                          {
                            value: "mtime",
                            label: "修改日期",
                          },
                          {
                            value: "btime",
                            label: "创建日期",
                          },
                        ]}
                      />
                    </Col>
                  </Row>
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
                disabled
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
              <Button size="small" type="text" disabled>
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

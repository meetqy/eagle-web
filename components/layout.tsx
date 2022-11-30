import { Layout, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import SiderMenu from "./sider/menu";

const { Sider, Content } = Layout;

export default function App({ children }: { children: JSX.Element }) {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ width: "100%", height: "100%" }}>
        <Sider width={240} style={{ padding: 10 }}>
          <SiderMenu />
        </Sider>
        <Content>
          <Layout>{children}</Layout>
        </Content>
        <Sider width={240}>right</Sider>
      </Layout>
    </ConfigProvider>
  );
}

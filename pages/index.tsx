import { Layout } from "antd";
import EagleMenu from "./components/eagle-menu";

const { Sider, Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ width: "100%", height: "100%" }}>
      <Sider width={240}>
        <EagleMenu />
      </Sider>
      <Content>
        <Layout></Layout>
      </Content>
      <Sider width={240}></Sider>
    </Layout>
  );
}

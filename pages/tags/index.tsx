import TagsContent from "@/components/tags/content";
import TagsHeader from "@/components/tags/header";
import TagsMenu from "@/components/tags/menu";
import { themeState } from "@/store";
import { Layout, theme } from "antd";
import { useRecoilValue } from "recoil";

const { Header, Sider, Content } = Layout;

export default function RandomPage() {
  const themeMode = useRecoilValue(themeState);
  const { token } = theme.useToken();

  return (
    <>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            height: 40,
            backgroundColor: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorder}`,
            padding: 0,
          }}
        >
          <TagsHeader />
        </Header>

        <Layout>
          <Sider width={240} theme={themeMode}>
            <TagsMenu />
          </Sider>
          <Content>
            <TagsContent />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

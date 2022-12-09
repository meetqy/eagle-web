import { selectMetadata, selectTags } from "@/hooks";
import { activeMenuState, metadataState, tagsState, themeState } from "@/store";
import { Layout, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SiderBasic from "./sider/basic";
import SiderMenu from "./sider/menu";

const { Sider, Content } = Layout;

export default function App({ children }: { children: JSX.Element }) {
  const themeMode = useRecoilValue(themeState);
  const [tags, setTags] = useRecoilState(tagsState);
  const [metadata, setMetadata] = useRecoilState(metadataState);
  const activeMenu = useRecoilValue(activeMenuState);

  useEffect(() => {
    if (!tags) {
      selectTags()
        .then((res) => res.json())
        .then((res) => setTags(res));
    }

    if (!metadata) {
      selectMetadata()
        .then((res) => res.json())
        .then((res) => setMetadata(res));
    }
  }, [tags, metadata, setTags, setMetadata]);

  return (
    <>
      <Head>
        <title>rao.pics</title>
        <meta property="og:title" content="rao.pics" key="title" />
      </Head>

      <ConfigProvider locale={zhCN}>
        <Layout
          style={{
            width: "100%",
            height: "100%",
          }}
          hasSider
        >
          <Sider width={240} theme={themeMode} className="sider-menu">
            <SiderMenu />
          </Sider>
          <Content
            className="scroll-bar main"
            style={{
              position: "relative",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {children}
          </Content>
          <Sider
            className="sider-basic"
            collapsed={activeMenu?.basic}
            collapsedWidth={0}
            width={240}
            theme={themeMode}
          >
            <SiderBasic />
          </Sider>
        </Layout>
      </ConfigProvider>
    </>
  );
}

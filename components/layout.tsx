import { selectTags } from "@/hooks";
import { activeMenuState, tagsState, themeState } from "@/store";
import { Layout, ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SiderBasic from "./sider/basic";
import SiderMenu from "./sider/menu";

const { Sider, Content } = Layout;

export default function App({ children }: { children: JSX.Element }) {
  const themeMode = useRecoilValue(themeState);
  const [tags, setTags] = useRecoilState(tagsState);
  const activeMenu = useRecoilValue(activeMenuState);

  useEffect(() => {
    if (tags) return;
    selectTags()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTags(res);
      });
  }, [tags]);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout
        style={{
          width: "100%",
          height: "100%",
        }}
        hasSider
      >
        <Sider width={240} style={{ padding: 10 }} theme={themeMode}>
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
          collapsed={activeMenu?.basic}
          collapsedWidth={0}
          width={240}
          theme={themeMode}
        >
          <SiderBasic />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
}

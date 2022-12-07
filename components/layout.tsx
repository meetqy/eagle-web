import { selectTags } from "@/hooks";
import { tagsState, themeState } from "@/store";
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
      <Layout style={{ width: "100vw", height: "100vh" }}>
        <Sider width={240} style={{ padding: 10 }} theme={themeMode}>
          <SiderMenu />
        </Sider>
        <Content
          className="scroll-bar"
          style={{
            position: "relative",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {children}
        </Content>
        <Sider width={240} theme={themeMode}>
          <SiderBasic />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
}

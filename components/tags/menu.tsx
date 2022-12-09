import { metadataState, tagsState } from "@/store";
import {
  AppstoreAddOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  TagFilled,
} from "@ant-design/icons";
import { Col, Menu, Row, theme } from "antd";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface TagItem {
  title: string;
  key: string;
  count: number;
  icon: JSX.Element;
}

const TagsMenu = () => {
  const tags = useRecoilValue(tagsState);
  const metadata = useRecoilValue(metadataState);
  const { token } = theme.useToken();
  const [active, setActive] = useState<string[]>();
  const router = useRouter();

  const { name } = router.query;

  useEffect(() => {
    if (name != active) {
      setActive([name as string]);
    }
  }, [name]);

  // 已分类标签
  const [categoryTags, setCategoryTags] = useState<string[]>([]);

  // 标签群组
  const [tagsGroupsMenu, setTagsGroupsMenu] = useState<TagItem[]>();

  useEffect(() => {
    if (metadata) {
      const { tagsGroups } = metadata;
      let temp: string[] = [];

      tagsGroups.forEach((item) => {
        temp = temp.concat(item.tags);
      });
      setCategoryTags(temp);

      setTagsGroupsMenu(
        tagsGroups.map((item) => ({
          title: item.name,
          key: item.id,
          count: item.tags.length,
          icon: <TagFilled style={{ color: item.color }} />,
        }))
      );
    }
  }, [metadata]);

  const [items, setItems] = useState<TagItem[]>();

  useEffect(() => {
    if (categoryTags && tags) {
      const { historyTags, starredTags } = tags;

      setItems([
        {
          icon: <AppstoreAddOutlined />,
          title: "标签管理",
          key: "label",
          count: historyTags.length - starredTags.length,
        },
        {
          icon: <QuestionCircleOutlined />,
          title: "未分类",
          key: "not-category",
          count: historyTags.length - categoryTags.length - starredTags.length,
        },
        {
          icon: <StarOutlined />,
          title: "常用标签",
          key: "starred-tags",
          count: starredTags.length,
        },
      ]);
    }
  }, [tags, categoryTags]);

  const goTags = (key: string) => {
    setActive([key]);
    router.push(`/tags/${key}`);
  };

  // 标签群组
  const tagsGroupsElement = () => {
    if (!tagsGroupsMenu) return null;

    return (
      <>
        <p style={{ padding: "5px 10px", fontWeight: "bold" }}>
          标签群组({tagsGroupsMenu.length})
        </p>
        <Menu
          selectedKeys={active}
          onSelect={(e) => goTags(e.key)}
          style={{ padding: 10 }}
          items={tagsGroupsMenu.map((item) => {
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

  return (
    <>
      <Menu
        selectedKeys={active}
        onSelect={(e) => goTags(e.key)}
        style={{ padding: 10 }}
        items={
          items
            ? items.map((item) => {
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
              })
            : []
        }
      />
      {tagsGroupsElement()}
    </>
  );
};

export default TagsMenu;

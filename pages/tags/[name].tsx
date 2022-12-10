import TagsLayout from "@/components/tags/layout";
import { pinyin } from "@/hooks";
import { metadataState, tagsState } from "@/store";
import { Button, Col, Divider, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";

const { Title, Text } = Typography;

type routeName = "label" | "not-category" | "starred-tags";

export default function TagsPageName() {
  const router = useRouter();
  const name = router.query.name as routeName;
  const group = router.query.group || false;
  const tags = useRecoilValue(tagsState);
  const metadata = useRecoilValue(metadataState);
  const [tagsCollection, setTagsCollection] = useState<{
    [key in routeName]: { [key: string]: string[] } | undefined;
  }>({
    label: undefined,
    "not-category": undefined,
    "starred-tags": undefined,
  });

  // 标签管理
  useEffect(() => {
    if (tagsCollection?.label) return;

    if (tags && name === "label") {
      const { historyTags, starredTags } = tags;

      setTagsCollection({
        ...tagsCollection,
        label: tagsArrayToJson(historyTags, starredTags),
      });
    }
  }, [name, tags, tagsCollection]);

  // 未分类
  useEffect(() => {
    if (tagsCollection["not-category"]) return;

    if (tags && name === "not-category" && metadata) {
      const { historyTags } = tags;
      const { tagsGroups } = metadata;

      // 所有已分类的tag
      let allTagCategory: string[] = [];
      tagsGroups.forEach((item) => {
        allTagCategory = allTagCategory.concat(item.tags);
      });

      setTagsCollection({
        ...tagsCollection,
        "not-category": tagsArrayToJson(historyTags, allTagCategory),
      });
    }
  }, [tags, metadata, name, tagsCollection]);

  // 常用标签
  useEffect(() => {
    if (tagsCollection["starred-tags"]) return;

    if (tags && name === "starred-tags") {
      setTagsCollection({
        ...tagsCollection,
        "starred-tags": {
          常用标签: tags.starredTags,
        },
      });
    }
  }, [name, tags, tagsCollection]);

  // 标签群组
  const tagGroup = useMemo(() => {
    if (metadata && group) {
      const { tagsGroups } = metadata;
      const item = tagsGroups.find((item) => item.id === name);
      if (item) {
        let json: { [key: string]: string[] } = {};
        json[item.name] = item.tags;
        return json;
      }

      return;
    }

    return;
  }, [metadata, name, group]);

  /**
   * 数组转json 首字母开头作为分组
   * @param tags 完整tags
   * @param exclude 需要排除的tags
   * @returns { [key: string]: string[] }
   */
  const tagsArrayToJson = (tags: string[], exclude: string[]) => {
    const json: { [key: string]: string[] } = {};
    tags
      .filter((item) => !exclude.includes(item))
      .forEach((item) => {
        const first = (
          pinyin.getCamelChars(item) as string
        )[0].toLocaleUpperCase();

        // 是数字的放在其他中
        if (!isNaN(Number(first))) {
          json.number ? json.number.push(item) : (json.number = [item]);
        } else {
          json[first] ? json[first].push(item) : (json[first] = [item]);
        }
      });

    return json;
  };

  // 渲染tags列表
  const tagsContentElement = (tagJson: { [key: string]: string[] }) => {
    const result = Object.keys(tagJson);
    if (!result.length) return;

    return result.map((k, index) => {
      const item = tagJson[k];
      return (
        <div key={k}>
          <Row>
            <Col>
              <Title level={3} style={{ textTransform: "capitalize" }}>
                {k === "number" ? "#" : k}{" "}
                <Text type="secondary">({item.length})</Text>
              </Title>
            </Col>
          </Row>
          <Row gutter={[10, 10]}>
            {item.map((tag) => (
              <Col key={tag}>
                <Button size="small" shape="round">
                  {tag}
                </Button>
              </Col>
            ))}
          </Row>
          {result.length - 1 > index && <Divider />}
        </div>
      );
    });
  };

  return (
    <TagsLayout>
      <>
        {tagsContentElement(tagGroup ? tagGroup : tagsCollection[name] || {})}
      </>
    </TagsLayout>
  );
}

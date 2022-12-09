import TagsLayout from "@/components/tags/layout";
import { pinyin } from "@/hooks";
import { tagsState } from "@/store";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type routeName = "label" | "not-category" | "starred-tags";

export default function TagsPageName() {
  const router = useRouter();
  const name = router.query.name as routeName;
  const tags = useRecoilValue(tagsState);
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

      let json: { [key: string]: string[] } = {};

      historyTags
        .filter((item) => !starredTags.includes(item))
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

      setTagsCollection({
        ...tagsCollection,
        label: json,
      });
    }
  }, [name, tags, tagsCollection]);

  const tagsContentElement = () => {
    const tagJson = tagsCollection[name] || {};
    const result = Object.keys(tagJson);
    if (!result.length) return;

    return result.map((i) => {
      const item = tagJson[i];
      return (
        <div key={i}>
          <Row>
            <Col>{i}</Col>
          </Row>
          <Row>
            {item.map((tag) => (
              <Col key={tag}>{tag}</Col>
            ))}
          </Row>
        </div>
      );
    });
  };

  return (
    <TagsLayout>
      <>{tagsContentElement()}</>
    </TagsLayout>
  );
}

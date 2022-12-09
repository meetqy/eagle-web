import { tagsState, totalState } from "@/store";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const TagsHeader = () => {
  const tags = useRecoilValue(tagsState);
  const [total, setTotal] = useRecoilState(totalState);

  useEffect(() => {
    if (tags && total.tags != tags.historyTags.length) {
      setTotal({
        ...total,
        tags: tags.historyTags.length,
      });
    }
  }, [tags]);

  return (
    <Row gutter={[10, 0]} style={{ padding: "0 20px" }}>
      <Col>标签管理({tags?.historyTags.length})</Col>
    </Row>
  );
};

export default TagsHeader;

import { tagsState, totalState } from "@/store";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
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
    <Row gutter={[10, 0]} style={{ padding: "0 10px" }}>
      <Col>
        <Button icon={<LeftOutlined />} type="text"></Button>
        <Button icon={<RightOutlined />} type="text"></Button>
      </Col>
      <Col>标签管理({tags?.historyTags.length})</Col>
    </Row>
  );
};

export default TagsHeader;

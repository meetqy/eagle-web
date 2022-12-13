import { tagsState, totalState } from "@/store";
import { Breadcrumb, Button, Col, Row, Typography } from "antd";
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
  }, [setTotal, tags, total]);

  return (
    <Breadcrumb separator=">" style={{ padding: "0 20px", lineHeight: "36px" }}>
      <Breadcrumb.Item>
        <Typography.Text strong>
          标签管理({tags?.historyTags.length})
        </Typography.Text>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default TagsHeader;

import { useEffect, useState } from "react";
import justifyLayout from "justified-layout";
import { selectImages } from "@/hooks";
import { Layout } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderState, sortState, totalState } from "@/store";
import LayoutHeader from "@/components/layout-header";
import LayoutContent from "@/components/layout-content";

const Page = () => {
  const [total, setTotal] = useRecoilState(totalState);
  const [loading, setLoading] = useState(false);
  const [layoutPos, setLayoutPos] = useState<any>();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<EagleWeb.Image[]>([]);
  const sort = useRecoilValue(sortState);
  const order = useRecoilValue(orderState);

  // 请求第一页数据，设置图片总数
  useEffect(() => {
    onLoadMore(1, (notTag) => {
      setTotal({
        ...total,
        "not-tag": notTag,
      });
    });
  }, []);

  // 加载更多
  const onLoadMore = (_page: number, fn?: (notTag: number) => void) => {
    setLoading(true);
    // tags_null 查询未标签的图片 json-server自定义API
    selectImages({ _page, rules: `tags_null`, _sort: sort, _order: order })
      .then((res) => {
        const totalCount = Number(res.headers.get("X-Total-Count"));
        fn && fn(totalCount);
        return res.json();
      })
      .then((v) => {
        setData((d) => d.concat(v));
        setPage(_page);
        setLoading(false);
      });
  };

  // 通过data获取图片位置
  useEffect(() => {
    setLayoutPos(
      justifyLayout([...data], {
        containerWidth: document.body.clientWidth - 480,
        targetRowHeight: 260,
        boxSpacing: {
          horizontal: 10,
          vertical: 20,
        },
      })
    );
  }, [data]);

  return (
    <Layout>
      <LayoutHeader />
      <LayoutContent
        layoutPos={layoutPos}
        data={data}
        onLoadmore={() => onLoadMore(page + 1)}
        loading={loading}
      />
    </Layout>
  );
};

export default Page;

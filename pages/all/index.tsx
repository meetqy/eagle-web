import { useEffect, useMemo, useState } from "react";
import justifyLayout from "justified-layout";
import { selectImages } from "@/hooks";
import { Empty, Layout } from "antd";
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
  const [keywords, setKeywords] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  // 请求第一页数据，设置图片总数
  useEffect(() => {
    find(1, "", (all) => {
      setTotal({
        ...total,
        all,
      });
    });
  }, [sort, order]);

  // 查询
  const find = (_page: number, rules?: string, fn?: (all: number) => void) => {
    setLoading(true);
    if (_page === 1) {
      setLayoutPos(undefined);
    }

    selectImages({ _page, _sort: sort, _order: order, rules })
      .then((res) => {
        const totalCount = Number(res.headers.get("X-Total-Count"));
        console.log(rules);
        setSearchCount(rules ? totalCount : 0);

        fn && fn(totalCount);
        return res.json();
      })
      .then((v) => {
        setData(_page === 1 ? v : (d) => d.concat(v));
        setPage(_page);
        setLoading(false);
      });
  };

  // 通过data获取图片位置
  useEffect(() => {
    if (!data.length) return;
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
    <Layout style={{ height: "100%" }}>
      <LayoutHeader
        onSearch={(e) => {
          const key = e ? `name_like=${e}` : "";
          find(1, key);
          setKeywords(key);
        }}
        searchCount={searchCount}
      />
      {data.length > 0 ? (
        <LayoutContent
          layoutPos={layoutPos}
          data={data}
          onLoadmore={() => find(page + 1, keywords)}
          loading={loading}
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Empty />
        </div>
      )}
    </Layout>
  );
};

export default Page;

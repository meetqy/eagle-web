import { useEffect, useState } from "react";
import justifyLayout from "justified-layout";
import { handleImageSrc, selectImages } from "@/hooks";
import Image from "next/image";
import { Button, Card } from "antd";
import { useRecoilState } from "recoil";
import { totalState } from "@/store/total";

const Page = () => {
  const [total, setTotal] = useRecoilState(totalState);
  const [loading, setLoading] = useState(false);
  const [layoutPos, setLayoutPos] = useState<any>();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<API.Image[]>([]);
  const [init, setInit] = useState(true);

  // 请求第一页数据，设置图片总数
  useEffect(() => {
    if (!init) return;

    onLoadMore(1, (all) => {
      setTotal({
        ...total,
        all,
      });
    });
    setInit(false);
  }, [init, setTotal, total]);

  // 加载更多
  const onLoadMore = (_page: number, fn?: (all: number) => void) => {
    setLoading(true);
    selectImages({ _page })
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
        containerWidth: document.querySelector(".ant-layout-content.main")
          ?.clientWidth,
        targetRowHeight: 260,
        boxSpacing: {
          horizontal: 10,
          vertical: 20,
        },
      })
    );
  }, [data]);

  const loadMore = (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => onLoadMore(page + 1)}
        type="link"
        disabled={loading}
      >
        加载更多
      </Button>
    </div>
  );

  if (!data || !layoutPos) return <></>;

  return (
    <>
      <div
        style={{
          height: layoutPos.containerHeight,
        }}
      >
        {layoutPos.boxes.map((item: any, i: number) => {
          const image = data[i];

          return (
            <Card
              hoverable
              key={i}
              style={{
                ...item,
                position: "absolute",
                background: `rgb(${image.palettes[0].color}, .25)`,
                overflow: "hidden",
              }}
              cover={
                <Image
                  width={item.width}
                  height={item.height}
                  src={handleImageSrc(image, true)}
                  alt={handleImageSrc(image, true)}
                />
              }
            />
          );
        })}
      </div>

      <div style={{ paddingBottom: 20 }}>{loadMore}</div>
    </>
  );
};

export default Page;

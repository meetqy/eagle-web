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

  useEffect(() => {
    selectImages({ _page: page })
      .then((res) => {
        setTotal({
          ...total,
          all: Number(res.headers.get("X-Total-Count")),
        });
        // countStore.setAll(Number(res.headers.get("X-Total-Count")));
        return res.json();
      })
      .then((v) => {
        setData((d) => d.concat(v));
        setLoading(false);
      });
  }, [page]);

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

  const onLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const loadMore = (
    <div style={{ textAlign: "center" }}>
      <Button onClick={onLoadMore} type="link" disabled={loading}>
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

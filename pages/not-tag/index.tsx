import { useEffect, useState } from "react";
import justifyLayout from "justified-layout";
import { handleImageSrc, imageLoader, selectImages } from "@/hooks";
import Image from "next/image";
import { Button, Card, theme } from "antd";
import { useRecoilState } from "recoil";
import { totalState, activeImageState } from "@/store";

const { useToken } = theme;

const Page = () => {
  const { token } = useToken();

  const [total, setTotal] = useRecoilState(totalState);
  const [_activeImage, setActiveImage] = useRecoilState(activeImageState);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [layoutPos, setLayoutPos] = useState<any>();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<EagleWeb.Image[]>([]);
  const [init, setInit] = useState(true);

  // 请求第一页数据，设置图片总数
  useEffect(() => {
    if (!init) return;

    onLoadMore(1, (notTag) => {
      setTotal({
        ...total,
        "not-tag": notTag,
      });
    });
    setInit(false);
  }, [init, setTotal, total]);

  // 加载更多
  const onLoadMore = (_page: number, fn?: (notTag: number) => void) => {
    setLoading(true);
    // tags_null 查询未标签的图片 json-server自定义API
    selectImages({ _page, rules: `tags_null` })
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

  const loadMore = total["not-tag"] > data.length && (
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
                ...(active === i
                  ? {
                      outline: `4px solid ${token.colorPrimary}`,
                      border: 0,
                    }
                  : {}),
              }}
              bodyStyle={{ padding: 0, ...item }}
              onClick={() => {
                setActive(i);
                setActiveImage(data[i]);
              }}
            >
              <Image
                priority
                width={0}
                height={0}
                loader={imageLoader}
                src={handleImageSrc(image, true)}
                alt={`${image.id}/${image.name}/${image.ext}`}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </Card>
          );
        })}
      </div>

      <div style={{ paddingBottom: 20 }}>{loadMore}</div>
    </>
  );
};

export default Page;

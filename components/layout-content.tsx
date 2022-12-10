import { Button, Card, Layout, theme } from "antd";
import { handleImageSrc, imageLoader } from "@/hooks";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeImageState, Total, totalState } from "@/store";
import { useRouter } from "next/router";

interface Props {
  layoutPos: any;
  data: EagleWeb.Image[];
  onLoadmore: () => void;
  loading: boolean;
}

const LayoutContent = ({ layoutPos, data, onLoadmore, loading }: Props) => {
  const [activeImage, setActiveImage] = useRecoilState(activeImageState);
  const { token } = theme.useToken();
  const total = useRecoilValue(totalState);
  const router = useRouter();
  const route = router.route.replace("/", "") as keyof Total;

  const loadMore = total[route] > data.length && (
    <div style={{ textAlign: "center" }}>
      <Button onClick={onLoadmore} type="link" disabled={loading}>
        加载更多
      </Button>
    </div>
  );

  if (!data || !layoutPos) return null;

  return (
    <Layout.Content style={{ position: "relative" }}>
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
              key={image.id}
              style={{
                ...item,
                position: "absolute",
                background: `rgb(${image.palettes[0].color}, .25)`,
                overflow: "hidden",
                ...(activeImage?.id === image.id
                  ? {
                      outline: `4px solid ${token.colorPrimary}`,
                      border: 0,
                    }
                  : {}),
              }}
              bodyStyle={{ padding: 0, ...item }}
              onClick={() => setActiveImage(data[i])}
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
    </Layout.Content>
  );
};

export default LayoutContent;

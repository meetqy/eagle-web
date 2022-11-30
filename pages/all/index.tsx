import { useEffect, useState } from "react";
import { selectImages } from "../../hooks/api";
import justifyLayout from "justified-layout";
import { handleImageSrc } from "../../hooks";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState<API.Image[]>();
  const [layoutPos, setLayoutPos] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    selectImages({})
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLayoutPos(justifyLayout(data));
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      {justifyLayout(data, {
        containerWidth: document.querySelector(".ant-layout-content.main")
          ?.clientWidth,
        targetRowHeight: 200,
      }).boxes.map((item, i) => (
        <div
          key={data[i].id}
          style={{
            ...item,
            position: "absolute",
            background: `rgb(${data[i].palettes[0].color})`,
          }}
        >
          <Image
            src={handleImageSrc(data[i])}
            width={item.width}
            height={item.height}
            alt={data[i].id}
          />
        </div>
      ))}
    </>
  );
}

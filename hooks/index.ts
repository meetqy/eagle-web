import getConfig from "next/config";

const { api }: { api: API.Env } = getConfig().publicRuntimeConfig;

export const handleImageSrc = (data: API.Image, thumbnail: boolean = false) => {
  const prefix = `${api.host}/static/${data.id}.info/${data.name}`;

  // 有些图片没有缩略图，具体规则未知
  if (thumbnail && !data.noThumbnail) {
    return `${prefix}_thumbnail.png`;
  }

  return `${prefix}.${data.ext}`;
};

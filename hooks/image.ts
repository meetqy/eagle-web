import getConfig from "next/config";
import { ImageLoaderProps } from "next/image";

const { env }: { env: EagleWeb.Env } = getConfig().publicRuntimeConfig;

export const handleImageSrc = (
  data: EagleWeb.Image,
  thumbnail: boolean = false
) => {
  const prefix = `${env.images_protocol}://${env.images_hostname}:${env.images_port}/static/${data.id}.info/${data.name}`;

  // 有些图片没有缩略图，具体规则未知
  if (thumbnail && !data.noThumbnail) {
    return `${prefix}_thumbnail.png`;
  }

  return `${prefix}.${data.ext}`;
};

export const imageLoader = ({ src }: ImageLoaderProps) => {
  return `${src}`;
};

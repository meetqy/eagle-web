import getConfig from "next/config";

const { api }: { api: API.Env } = getConfig().publicRuntimeConfig;

export const handleImageSrc = (data: API.Image) => {
  return `${api.host}/static/${data.id}.info/${data.name}.${data.ext}`;
};

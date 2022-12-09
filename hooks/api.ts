import getConfig from "next/config";

interface SelectImagesParam {
  _page?: number;
  _limit?: number;
  rules?: string;
}

const { env }: { env: EagleWeb.Env } = getConfig().publicRuntimeConfig;

// 查询images
export const selectImages = ({
  _page = 1,
  _limit = env.limit,
  rules,
}: SelectImagesParam) => {
  return fetch(`${env.host}/images?_page=${_page}&_limit=${_limit}&${rules}`);
};

// 查询标签
export const selectTags = () => {
  return fetch(`${env.host}/tags`);
};

// 查询metadata
export const selectMetadata = () => {
  return fetch(`${env.host}/metadata`);
};

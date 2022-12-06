import getConfig from "next/config";

interface SelectImagesParam {
  _page?: number;
  _limit?: number;
}

const { env }: { env: EagleWeb.Env } = getConfig().publicRuntimeConfig;

export const selectImages = ({
  _page = 1,
  _limit = env.limit,
}: SelectImagesParam) => {
  return fetch(`${env.host}/images?_page=${_page}&_limit=${_limit}`);
};

export const selectTags = () => {
  return fetch(`${env.host}/tags`);
};

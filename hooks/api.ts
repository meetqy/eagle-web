import getConfig from "next/config";

interface SelectImagesParam {
  _page?: number;
  _limit?: number;
}

const { api }: { api: API.Env } = getConfig().publicRuntimeConfig;

export const selectImages = ({
  _page = 1,
  _limit = api.limit,
}: SelectImagesParam) => {
  return fetch(`${api.host}/images?_page=${_page}&_limit=${_limit}`);
};

export const selectTags = () => {
  return fetch(`${api.host}/tags`);
};

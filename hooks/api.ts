import getConfig from "next/config";

interface SelectImagesParam {
  _page?: number;
  _limit?: number;
  rules?: string;
  _order?: string;
  _sort?: string;
}

const { env }: { env: EagleWeb.Env } = getConfig().publicRuntimeConfig;

// 查询images
export const selectImages = (props: SelectImagesParam) => {
  const { _page = 1, _limit = env.limit } = props;

  const rules = props.rules ? "&" + props.rules : "";
  const order = props._order ? "&_order=" + props._order : "";
  const sort = props._sort ? "&_sort=" + props._sort : "";

  return fetch(
    `${env.host}/images?_page=${_page}&_limit=${_limit}${rules}${order}${sort}`
  );
};

// 查询标签
export const selectTags = () => {
  return fetch(`${env.host}/tags`);
};

// 查询metadata
export const selectMetadata = () => {
  return fetch(`${env.host}/metadata`);
};

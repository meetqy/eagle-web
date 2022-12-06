import { atom } from "recoil";

// 图片数量
export const totalState = atom({
  key: "totalState",
  default: {
    all: 0,
    notTag: 0,
    tags: 0,
    recycle: 0,
  },
});

// 当前选中图片
export const activeImageState = atom({
  key: "activeImageState",
  default: undefined as API.Image | undefined,
});

// 主题
export const themeState = atom({
  key: "themeState",
  default: "light" as "light" | "dark",
});

// 所有标签
export const tagsState = atom({
  key: "tagsState",
  default: undefined as API.Tags | undefined,
});

// 当前选中的菜单
export const activeMenuState = atom({
  key: "activeMenuState",
  default: {
    key: "all",
    name: "全部",
  },
});

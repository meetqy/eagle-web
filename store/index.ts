import { atom } from "recoil";

// 当前选中图片
export const activeImageState = atom({
  key: "activeImageState",
  default: undefined as EagleWeb.Image | undefined,
});

// 主题
export const themeState = atom({
  key: "themeState",
  default: "light" as "light" | "dark",
});

// 所有标签
export const tagsState = atom({
  key: "tagsState",
  default: undefined as EagleWeb.Tags | undefined,
});

// metadata
export const metadataState = atom({
  key: "metadataState",
  default: undefined as EagleWeb.Metadata | undefined,
});

export interface Total {
  all: number;
  notTag: number;
  tags: number;
  recycle: number;
}
// 图片数量
export const totalState = atom({
  key: "totalState",
  default: {
    all: 0,
    notTag: 0,
    tags: 0,
    recycle: 0,
  } as Total,
});

// 当前选中的菜单  基础信息中需要显示菜单标题
export const activeMenuState = atom({
  key: "activeMenuState",
  default: undefined as EagleWeb.MenuItem | undefined,
});

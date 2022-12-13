import { ItemType } from "antd/es/menu/hooks/useItems";
import { atom } from "recoil";

// 菜单 menu 相关 >>>
export type allMenus = "all" | "not-tag" | "tags" | "recycle";
export const menusState = atom({
  key: "menusState",
  default: {
    all: "全部",
    "not-tag": "未标签",
    tags: "标签管理",
    recycle: "回收站",
  } as { [key in allMenus]: string },
});
// 当前选中的菜单  基础信息中需要显示菜单标题
export const activeMenuState = atom({
  key: "activeMenuState",
  default: undefined as ItemType | undefined,
});
// end >>>

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

export type Total = { [key in allMenus]: number };
// 图片数量
export const totalState = atom({
  key: "totalState",
  default: {
    all: 0,
    "not-tag": 0,
    tags: 0,
    recycle: 0,
  } as Total,
});

// 菜单为单位 排序规则
export const sortState = atom({
  key: "sortState",
  default: "modificationTime",
});

// 升序 降序
// asc 升序
// desc 降序
export const orderState = atom({
  key: "orderState",
  default: "desc" as "asc" | "desc",
});

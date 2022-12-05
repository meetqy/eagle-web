import { atom } from "recoil";

export const totalState = atom({
  key: "totalState",
  default: {
    all: 0,
    notTag: 0,
    tags: 0,
    recycle: 0,
  },
});

export const activeImageState = atom({
  key: "activeImageState",
  default: undefined as API.Image | undefined,
});

export const themeState = atom({
  key: "themeState",
  default: "light" as "light" | "dark",
});

export const tagsState = atom({
  key: "tagsState",
  default: undefined as API.Tags | undefined,
});

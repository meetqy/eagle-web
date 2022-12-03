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

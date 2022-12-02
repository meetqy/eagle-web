import { makeAutoObservable } from "mobx";

class CountStore {
  all: number | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAll(num: number) {
    this.all = num;
  }
}

const countStore = new CountStore();

export default countStore;

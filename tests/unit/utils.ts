import { shallowMount, VueWrapper } from "@vue/test-utils";

export const wrapHook = (): VueWrapper<any> => {
  return shallowMount({
    setup() {},
  });
};

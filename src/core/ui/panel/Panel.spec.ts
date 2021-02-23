import Panel from "@/core/ui/panel/Panel.vue";
import { shallowMount, VueWrapper } from "@vue/test-utils";

describe("Panel", () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(Panel);
  });

  it("should be display", () => {
    expect(wrapper.exists()).toBe(true);
  });
});

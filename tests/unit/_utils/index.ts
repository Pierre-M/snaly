import Vue from "vue";
import {
    shallowMount as _shallowMount,
    createLocalVue,
    VueClass,
    ThisTypedShallowMountOptions, Wrapper
} from "@vue/test-utils";
import simulant from "simulant";
import Portal from "portal-vue";

const localVue = createLocalVue();
localVue.use(Portal);

export function shallowMount<V extends Vue>(component: VueClass<V>, options?: ThisTypedShallowMountOptions<V>): Wrapper<V> {
    return _shallowMount(component, {
        localVue,
        ...options
    });
};

export function triggerDOMEvent(el: HTMLElement, event: string) {
    simulant.fire(el, event);
};

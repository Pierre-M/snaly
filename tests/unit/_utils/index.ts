import Vue from "vue";
import {
    createLocalVue,
    shallowMount as _shallowMount,
    ThisTypedShallowMountOptions,
    VueClass,
    Wrapper
} from "@vue/test-utils";
import simulant from "simulant";
import Portal from "portal-vue";

const localVue = createLocalVue();
localVue.use(Portal);

export function shallowMount<V extends Vue>(
    component: VueClass<V>,
    options?: ThisTypedShallowMountOptions<V>
): Wrapper<V> {
    return _shallowMount(component, {
        localVue,
        mocks: {
            $t(key: string) {
                return key;
            },
            $store: {
                dispatch: jest.fn(),
                commit: jest.fn()
            }
        },
        ...options
    });
}

export function triggerDOMEvent(el: HTMLElement | Document, event: string, payload?: any) {
    simulant.fire(el, event, { target: el, ctrlKey: false, shiftKey: false, metaKey: false, ...payload });
}

export function clearDom() {
    document.body.innerHTML = "";
}

export function insertInDom(...elements: HTMLElement[]) {
    elements.forEach(el => {
        document.body.insertAdjacentElement("beforeend", el);
    });
}

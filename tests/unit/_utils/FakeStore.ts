"use strict";

import { AppState, StoreConfiguration } from "@/store/store";

export class FakeStore {
    state: AppState;
    getters: Record<string, any>;
    commit = jest.fn();
    dispatch = jest.fn();

    constructor() {
        this.state = this.buildFakeState();
        this.getters = this.buildFakeGetters();
    }

    resetState() {
        this.state = this.buildFakeState();
    }

    private buildFakeState(): AppState {
        const storeModules = StoreConfiguration.modules as Record<string, any>;

        return Object.keys(storeModules).reduce((state: Record<string, any>, moduleName: string) => {
            state[moduleName] = { ...storeModules[moduleName].state };

            return state;
        }, {}) as AppState;
    }

    private buildFakeGetters(): Record<string, any> {
        const storeModules = StoreConfiguration.modules as Record<string, any>;

        const allModulesGetters = Object.keys(storeModules).reduce(
            (getters: Record<string, any>, moduleName: string) => {
                const moduleGetters = storeModules[moduleName].getters;

                if (!moduleGetters) {
                    return getters;
                }

                getters = { ...getters, ...moduleGetters };

                return Object.keys(getters).reduce((acc: any, curr: string) => {
                    return { ...acc, [curr]: () => {} };
                }, {});
            },
            {}
        );

        return {
            ...allModulesGetters,
            ...StoreConfiguration.getters
        };
    }
}

export const fakeStore = new FakeStore();

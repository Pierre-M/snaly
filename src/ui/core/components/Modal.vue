<template>
    <portal to="modalContainer">
        <div class="modal" v-if="displayed" v-scroll-lock="displayed" v-hotkey="keymap">
            <fade-transition @after-leave="hide">
                <div class="backdrop" v-show="opened"></div>
            </fade-transition>

            <div class="wrapper">
                <slide-y-down-transition>
                    <section class="panel bg-white" v-show="opened" v-click-outside="close">
                        <header class="header">
                            <h2 class="title">{{ title }}</h2>
                        </header>

                        <div class="body">
                            <slot />

                            <footer class="actions">
                                <slot name="footer" />
                            </footer>
                        </div>
                    </section>
                </slide-y-down-transition>
            </div>
        </div>
    </portal>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { bus, Events } from "@/ui/core/events";
import { ModalEventPayload } from "@/ui/core/vue-plugins/ModalPlugin";

@Component
export default class Modal extends Vue {
    @Prop({ type: String, required: true })
    id!: string;

    @Prop({ type: String, required: true })
    title!: string;

    get keymap() {
        return {
            esc: {
                keyup: () => this.close()
            }
        };
    }

    displayed: boolean = false;
    opened: boolean = false;

    created() {
        bus.$on(Events.OPEN_MODAL, this.displayIfNeeded);
        bus.$on(Events.CLOSE_MODAL, this.hideIfNeeded);
    }

    beforeDestroy() {
        bus.$off(Events.OPEN_MODAL, this.displayIfNeeded);
        bus.$off(Events.CLOSE_MODAL, this.hideIfNeeded);
    }

    async displayIfNeeded(payload: ModalEventPayload) {
        if (payload.id !== this.id) {
            return;
        }

        this.displayed = true;
        await Vue.nextTick();
        this.opened = true;
    }

    hideIfNeeded(payload: ModalEventPayload) {
        if (payload.id !== this.id) {
            return;
        }

        this.hide();
    }

    hide() {
        this.displayed = false;
    }

    close() {
        this.opened = false;
    }
}
</script>

<template>
    <portal to="panelContainer">
        <fade-transition :duration="150">
            <div
                v-show="isOpened"
                class="fixed inset-0 backdrop-blur bg-backdrop text-white p-6 overflow-auto flex flex-col"
            >
                <div class="flex-1">
                    <slide-y-up-transition>
                        <div v-if="isOpened" class="h-full">
                            <slot />
                        </div>
                    </slide-y-up-transition>
                </div>

                <slide-y-down-transition>
                    <div v-show="isOpened" class="flex justify-center">
                        <icon-btn
                            icon="close"
                            :label="closeLabel"
                            :bordered="true"
                            :quiet="true"
                            @click="handlePanelClosing()"
                        />
                    </div>
                </slide-y-down-transition>
            </div>
        </fade-transition>
    </portal>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { Action, State } from "vuex-class";
import { AppState } from "@/store/store";
import { Nullable } from "@/types/app";
import { UIModuleActions } from "@/store/module/ui.module";

@Component({
    components: { IconBtn }
})
export default class BackdropPanel extends Vue {
    @Prop({ type: String, required: true })
    id!: string;

    @Prop({ type: String, required: true })
    closeLabel!: string;

    @State((state: AppState) => state.uiModule.openedPanel)
    openedPanel!: Nullable<string>;

    @Action(UIModuleActions.CLOSE_PANEL)
    closePanel!: () => void;

    get isOpened(): boolean {
        return this.openedPanel === this.id;
    }

    @Watch("isOpened")
    triggerState(isOpened: boolean) {
        this.$emit(isOpened ? "opened" : "closed");
    }

    handlePanelClosing() {
        this.closePanel();
    }
}
</script>

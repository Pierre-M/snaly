<template>
    <div>
        <icon-btn :icon="icon" :label="label" @click="toggleSideNav" />

        <backdrop-panel :show="sideNavIsOpened" :close-label="$t('navPanel.closeLabel')" @close="closeSideNav">
            <panel-section v-show="sideNavIsOpened" :title="$t('shortcuts.title')">
                <shortcut-list-widget />
            </panel-section>
        </backdrop-panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action, Getter } from "vuex-class";
import { UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";
import PanelSection from "@/ui/layout/PanelSection.vue";
import ShortcutListWidget from "@/ui/shortcuts/ShortcutListWidget.vue";
@Component({
    components: { ShortcutListWidget, PanelSection, SharingCta, BackdropPanel, IconBtn }
})
export default class NavWidget extends Vue {
    @Action(UIModuleActions.TOGGLE_SIDE_NAV)
    toggleSideNav!: () => void;

    @Action(UIModuleActions.CLOSE_SIDE_NAV)
    closeSideNav!: () => void;

    @Getter(UIModuleGetter.IS_SIDE_NAV_OPENED)
    sideNavIsOpened!: boolean;

    get icon(): string {
        return this.sideNavIsOpened ? "menu_open" : "menu";
    }

    get label(): string {
        return this.sideNavIsOpened ? "Close menu" : "Open menu";
    }
}
</script>

<style lang="scss" scoped></style>

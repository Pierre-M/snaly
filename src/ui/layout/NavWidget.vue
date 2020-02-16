<template>
    <div>
        <icon-btn icon="menu" :label="$t('navPanel.openLabel')" @click="openPanel(navId)" />

        <backdrop-panel :id="navId" :close-label="$t('navPanel.closeLabel')">
            <panel-section :title="$t('shortcuts.title')">
                <shortcut-list-widget />
            </panel-section>
        </backdrop-panel>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action } from "vuex-class";
import { NAV_WIDGET_ID, UIModuleActions } from "@/store/module/ui.module";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";
import PanelSection from "@/ui/layout/PanelSection.vue";
import ShortcutListWidget from "@/ui/shortcuts/ShortcutListWidget.vue";

@Component({
    components: { ShortcutListWidget, PanelSection, SharingCta, BackdropPanel, IconBtn }
})
export default class NavWidget extends Vue {
    @Action(UIModuleActions.OPEN_PANEL)
    openPanel!: (id: string) => void;

    navId: string = NAV_WIDGET_ID;
}
</script>

<style lang="scss" scoped></style>

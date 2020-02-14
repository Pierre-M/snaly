<template>
    <div>
        <icon-btn :icon="icon" :label="label" @click="toggleSideNav" />

        <portal to="panelContainer">
            <fade-transition>
                <backdrop-panel v-show="sideNavIsOpened">
                    <sharing-cta />
                    <section>
                        <header>
                            <h2 class="font-title text-4xl">Shortcuts</h2>
                        </header>
                    </section>
                </backdrop-panel>
            </fade-transition>
        </portal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action, Getter } from "vuex-class";
import { UIModuleActions, UIModuleGetter } from "@/store/module/ui.module";
import BackdropPanel from "@/ui/layout/BackdropPanel.vue";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";
@Component({
    components: { SharingCta, BackdropPanel, IconBtn }
})
export default class NavWidget extends Vue {
    @Action(UIModuleActions.TOGGLE_SIDE_NAV)
    toggleSideNav!: () => void;

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

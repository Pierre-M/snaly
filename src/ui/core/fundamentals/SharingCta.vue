<template>
    <icon-btn v-if="canShare" icon="share" @click="share" :label="$t('share.ctaLabel')" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "./IconBtn.vue";
import { AppState } from "@/store/store";
import { Action, State } from "vuex-class";
import { UIModuleActions } from "@/store/module/ui.module";

@Component({
    components: { IconBtn }
})
export default class SharingCta extends Vue {
    @State((state: AppState) => state.uiModule.canShare)
    canShare!: boolean;

    @Action(UIModuleActions.SHARE)
    share!: () => Promise<void>;
}
</script>

<style lang="scss" scoped></style>

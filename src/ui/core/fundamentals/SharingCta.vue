<template>
    <icon-btn v-if="canShare" icon="share" @click="share" :label="$t('share.ctaLabel')" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "./IconBtn.vue";
import { AppState } from "@/store/store";
import { Action, State } from "vuex-class";
import { StoreAction } from "@/store/actions";

@Component({
    components: { IconBtn }
})
export default class SharingCta extends Vue {
    @State((state: AppState) => state.uiModule.canShare)
    canShare!: boolean;

    @Action(StoreAction.SHARE)
    share!: () => Promise<void>;
}
</script>

<style lang="scss" scoped></style>

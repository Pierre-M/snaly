<template>
    <icon-btn icon="share" @click="share" :label="$t('share.ctaLabel')" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "./IconBtn.vue";
import { Action } from "vuex-class";
import { StoreAction } from "@/store/actions";

@Component({
    components: { IconBtn }
})
export default class SharingCta extends Vue {
    @Action(StoreAction.SHARE)
    share!: () => Promise<void>;
}
</script>

<style lang="scss" scoped></style>

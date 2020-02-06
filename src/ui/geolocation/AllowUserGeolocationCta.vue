<template>
    <icon-btn icon="geolocation" @click="requestGeolocation" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
import { Action } from "vuex-class";
import { LocalizationModuleAction } from "@/store/module/localization.module";

@Component({
    components: { IconBtn }
})
export default class AllowUserGeolocationCta extends Vue {
    @Action(LocalizationModuleAction.REQUEST_GEOLOCATION)
    requestGeolocation!: () => void;
}
</script>

<template>
    <icon-btn icon="geolocation" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";

@Component({
    components: { IconBtn }
})
export default class AllowUserGeolocationCta extends Vue {}
</script>

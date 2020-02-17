<template>
    <div class="bg-white text-black text-2xl font-light rounded-lg p-6">
        <p>{{ location.name }}</p>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FavoriteLocation } from "@/business/favorite-locations/FavoriteLocationsService";

@Component
export default class FavoriteLocationWidget extends Vue {
    @Prop({ type: Object, required: true })
    location!: FavoriteLocation;
}
</script>

<style lang="scss" scoped></style>

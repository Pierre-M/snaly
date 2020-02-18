<template>
    <div
        @click="$emit('click')"
        class="flex items-center justify-between bg-white text-black text-2xl font-light rounded-lg p-6"
    >
        <p>{{ location.name }}</p>
        <favorite-location-toggle @click.stop class="text-gray-600" :location="location" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { FavoriteLocation } from "@/business/favorite-locations/FavoriteLocationsService";
import FavoriteLocationToggle from "@/ui/favorite-locations/FavoriteLocationToggle.vue";

@Component({
    components: { FavoriteLocationToggle }
})
export default class FavoriteLocationWidget extends Vue {
    @Prop({ type: Object, required: true })
    location!: FavoriteLocation;
}
</script>

<style lang="scss" scoped></style>

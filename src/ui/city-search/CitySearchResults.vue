<template>
    <fade-transition>
        <slide-y-down-transition
            v-show="shown"
            group
            tag="ul"
            class="bg-white text-gray-700 rounded-lg overflow-auto"
            id="citySearchResults"
        >
            <li
                v-for="city in results"
                :key="city.name"
                class="flex items-center justify-between p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                @click="triggerSelection(city)"
            >
                {{ city.name }}
                <favorite-location-toggle :location="city" @click.stop />
            </li>
        </slide-y-down-transition>
    </fade-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Location } from "@/business/location-search/LocationSearchService";
import FavoriteLocationToggle from "@/ui/favorite-locations/FavoriteLocationToggle.vue";
@Component({
    components: { FavoriteLocationToggle }
})
export default class CitySearchResults extends Vue {
    @Prop({ type: Array, required: true })
    results!: Location[];

    get shown(): boolean {
        return !!this.results.length;
    }

    triggerSelection(selection: Location) {
        this.$emit("select", selection);
    }
}
</script>

<style lang="scss" scoped></style>

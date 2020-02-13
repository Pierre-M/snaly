<template>
    <fade-transition>
        <slide-y-down-transition v-show="shown" group tag="ul" class="bg-white text-gray-700 rounded-lg overflow-auto">
            <li
                v-for="city in results"
                :key="city.name"
                class="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-100"
                @click="triggerSelection(city)"
            >
                {{ city.name }}
            </li>
        </slide-y-down-transition>
    </fade-transition>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { City } from "@/business/city-search/CitySearchService";

@Component
export default class CitySearchResults extends Vue {
    @Prop({ type: Array, required: true })
    results!: City[];

    get shown(): boolean {
        return !!this.results.length;
    }

    triggerSelection(selection: City) {
        this.$emit("select", selection);
    }
}
</script>

<style lang="scss" scoped></style>

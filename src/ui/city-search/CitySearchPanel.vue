<template>
    <portal to="citySearchContainer">
        <fade-transition :duration="150">
            <div v-show="opened" class="fixed inset-0 bg-backdrop text-white">
                city search !
            </div>
        </fade-transition>
    </portal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { UIModuleGetter } from "@/store/module/ui.module";

@Component
export default class CitySearchPanel extends Vue {
    @Getter(UIModuleGetter.IS_CITY_SEARCH_OPENED)
    opened!: boolean;
}
</script>

<style lang="scss" scoped></style>

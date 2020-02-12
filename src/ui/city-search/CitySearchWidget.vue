<template>
    <div>
        <icon-btn icon="search" :label="$t('citySearch.openLabel')" @click="open" />
        <city-search-panel />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action } from "vuex-class";
import { UIModuleActions } from "@/store/module/ui.module";
import CitySearchPanel from "@/ui/city-search/CitySearchPanel.vue";

@Component({
    components: { CitySearchPanel, IconBtn }
})
export default class CitySearchWidget extends Vue {
    @Action(UIModuleActions.OPEN_CITY_SEARCH)
    open!: () => void;
}
</script>

<style lang="scss" scoped></style>

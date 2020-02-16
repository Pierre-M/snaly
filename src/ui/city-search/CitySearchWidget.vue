<template>
    <div>
        <icon-btn
            icon="search"
            :label="$t('citySearch.openLabel')"
            @click="open(citySearchPanelId)"
            id="openCitySearch"
        />
        <city-search-panel :id="citySearchPanelId" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import IconBtn from "../core/fundamentals/IconBtn.vue";
import { Action } from "vuex-class";
import { CITY_SEARCH_WIDGET_ID, UIModuleActions } from "@/store/module/ui.module";
import CitySearchPanel from "@/ui/city-search/CitySearchPanel.vue";

@Component({
    components: { CitySearchPanel, IconBtn }
})
export default class CitySearchWidget extends Vue {
    @Action(UIModuleActions.OPEN_PANEL)
    open!: (id: string) => void;

    citySearchPanelId: string = CITY_SEARCH_WIDGET_ID;
}
</script>

<style lang="scss" scoped></style>

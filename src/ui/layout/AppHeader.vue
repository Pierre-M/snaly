<template>
    <div class="flex justify-between items-center text-white">
        <div class="w-20">
            <sharing-cta />
        </div>
        <slide-y-up-transition>
            <p v-if="title" class="text-2xl font-semibold">
                {{ title }}
            </p>
        </slide-y-up-transition>
        <div class="w-20 flex justify-end">
            <city-search-widget />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Nullable } from "@/types/app";
import { Getter } from "vuex-class";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";
import CitySearchWidget from "@/ui/city-search/CitySearchWidget.vue";

@Component({
    components: { CitySearchWidget, SharingCta }
})
export default class AppHeader extends Vue {
    @Getter("shortenedLocation")
    title!: Nullable<string>;
}
</script>

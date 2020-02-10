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
            <allow-user-geolocation-cta />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Nullable } from "@/types/app";
import { Getter } from "vuex-class";
import AllowUserGeolocationCta from "@/ui/geolocation/AllowUserGeolocationCta.vue";
import SharingCta from "@/ui/core/fundamentals/SharingCta.vue";

@Component({
    components: { SharingCta, AllowUserGeolocationCta }
})
export default class AppHeader extends Vue {
    @Getter("shortenedLocation")
    title!: Nullable<string>;
}
</script>

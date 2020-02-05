<template>
    <div class="app-header">
        <div class="app-header__actions"></div>
        <p v-if="title" class="app-header__title">
            {{ title }}
        </p>
        <div class="app-header__actions right">
            <allow-user-geolocation-cta />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Nullable } from "@/types/app";
import { Getter } from "vuex-class";
import AllowUserGeolocationCta from "@/ui/geolocation/AllowUserGeolocationCta.vue";

@Component({
    components: { AllowUserGeolocationCta }
})
export default class AppHeader extends Vue {
    @Getter("shortenedLocation")
    title!: Nullable<string>;
}
</script>

<style lang="scss" scoped>
.app-header {
    @include boxAlign(space-between);
    width: 100%;
    height: 50px;
    padding: 15px;
    font-size: 20px;
    font-weight: 500;
    color: $snaly-c-white;

    &__title {
        flex: 1;
        text-align: center;
    }

    &__actions {
        @include boxAlign;
        width: 100px;

        &.right {
            @include boxAlign(right);
        }
    }
}
</style>

<template>
    <div class="app-header">
        <p v-if="title" class="app-header__title">
            {{ title }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Nullable } from "@/types/app";
import { Getter } from "vuex-class";

@Component
export default class AppHeader extends Vue {
    @Getter("shortenedLocation")
    title!: Nullable<string>;
}
</script>

<style lang="scss" scoped>
.app-header {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 15px;
    font-size: 20px;
    font-weight: 500;
    color: $snaly-c-white;
}
</style>

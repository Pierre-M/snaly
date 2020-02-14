<template>
    <dl class="flex items-center">
        <dt class="border border-white border-solid py-3 px-4 rounded-md font-semibold uppercase">
            {{ resume.def.key }}
        </dt>
        <dd class="ml-4 font-light text-sm">{{ resume.description }}</dd>
    </dl>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ShortcutResume } from "@/core/browser/ShorcutService";

@Component
export default class ShortcutResumeWidget extends Vue {
    @Prop({ type: Object, required: true })
    resume!: ShortcutResume;
}
</script>

<style lang="scss" scoped></style>

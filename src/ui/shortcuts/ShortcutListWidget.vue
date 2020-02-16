<template>
    <div>
        <ul>
            <li v-for="shortcut in shortcuts" :key="shortcut.description" class="mt-4 first:mt-0">
                <shortcut-resume-widget :resume="shortcut" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import { ShortcutResume } from "@/core/browser/ShorcutService";
import ShortcutResumeWidget from "@/ui/shortcuts/ShortcutResumeWidget.vue";
import { AppState } from "@/store/store";

@Component({
    components: { ShortcutResumeWidget }
})
export default class ShortcutListWidget extends Vue {
    @State((state: AppState) => state.uiModule.shortcuts)
    shortcuts!: ShortcutResume[];
}
</script>

<style lang="scss" scoped></style>

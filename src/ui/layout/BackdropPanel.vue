<template>
    <portal to="panelContainer">
        <fade-transition :duration="150">
            <div
                v-show="show"
                class="fixed inset-0 backdrop-blur bg-backdrop text-white p-6 overflow-auto flex flex-col"
            >
                <div class="flex-1">
                    <slot />
                </div>

                <slide-y-down-transition>
                    <div v-show="show" class="flex justify-center">
                        <icon-btn
                            icon="close"
                            :label="closeLabel"
                            :bordered="true"
                            :quiet="true"
                            @click="$emit('close')"
                        />
                    </div>
                </slide-y-down-transition>
            </div>
        </fade-transition>
    </portal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import IconBtn from "@/ui/core/fundamentals/IconBtn.vue";
@Component({
    components: { IconBtn }
})
export default class BackdropPanel extends Vue {
    @Prop({ type: Boolean, default: false })
    show!: boolean;

    @Prop({ type: String, required: true })
    closeLabel!: string;
}
</script>

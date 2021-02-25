<template>
    <IconButton icon="mdi:crosshairs-gps" label="get location" @click="handleClick" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconButton from "../../core/ui/icon-button/IconButton.vue";
import useGeolocation from "@/geolocation/hooks/useGeolocation";

export default defineComponent({
    name: "GeolocationButton",
    components: { IconButton },
    emits: ["updated"],
    setup(_, { emit }) {
        const { getCurrentLocation } = useGeolocation();
        const handleClick = async () => {
            emit("updated", await getCurrentLocation());
        };

        return { handleClick };
    }
});
</script>

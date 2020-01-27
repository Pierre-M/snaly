<template>
    <i :class="iconClasses" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Icon extends Vue {
    @Prop({ type: String, required: true })
    icon!: string;

    get iconClasses(): string[] {
        return ["icon", `icon-${this.icon}`];
    }
}
</script>

<style lang="scss" scoped>
    $icomoon-font-family: "snaly-icons" !default;
    $icomoon-font-path: "../../assets/fonts" !default;

    $icon-wi-sunrise: "\e90e";
    $icon-wi-sunset: "\e90f";
    $icon-wi-fog: "\e900";
    $icon-wi-night-alt-snow: "\e901";
    $icon-wi-day-snow: "\e902";
    $icon-wi-night-alt-lightning: "\e903";
    $icon-wi-day-lightning: "\e904";
    $icon-wi-night-alt-rain: "\e905";
    $icon-wi-day-rain: "\e906";
    $icon-wi-showers: "\e907";
    $icon-wi-cloud: "\e908";
    $icon-wi-cloudy: "\e909";
    $icon-wi-night-alt-cloudy: "\e90a";
    $icon-wi-day-cloudy: "\e90b";
    $icon-wi-night-clear: "\e90c";
    $icon-wi-day-sunny: "\e90d";

@font-face {
    font-family: '#{$icomoon-font-family}';
    src:  url('#{$icomoon-font-path}/#{$icomoon-font-family}.eot?eiecfg');
    src:  url('#{$icomoon-font-path}/#{$icomoon-font-family}.eot?eiecfg#iefix') format('embedded-opentype'),
    url('#{$icomoon-font-path}/#{$icomoon-font-family}.ttf?eiecfg') format('truetype'),
    url('#{$icomoon-font-path}/#{$icomoon-font-family}.woff?eiecfg') format('woff'),
    url('#{$icomoon-font-path}/#{$icomoon-font-family}.svg?eiecfg##{$icomoon-font-family}') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
}

[class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: '#{$icomoon-font-family}' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-wi-sunrise {
    &:before {
        content: $icon-wi-sunrise;
    }
}
.icon-wi-sunset {
    &:before {
        content: $icon-wi-sunset;
    }
}
.icon-wi-fog {
    &:before {
        content: $icon-wi-fog;
    }
}
.icon-wi-night-alt-snow {
    &:before {
        content: $icon-wi-night-alt-snow;
    }
}
.icon-wi-day-snow {
    &:before {
        content: $icon-wi-day-snow;
    }
}
.icon-wi-night-alt-lightning {
    &:before {
        content: $icon-wi-night-alt-lightning;
    }
}
.icon-wi-day-lightning {
    &:before {
        content: $icon-wi-day-lightning;
    }
}
.icon-wi-night-alt-rain {
    &:before {
        content: $icon-wi-night-alt-rain;
    }
}
.icon-wi-day-rain {
    &:before {
        content: $icon-wi-day-rain;
    }
}
.icon-wi-showers {
    &:before {
        content: $icon-wi-showers;
    }
}
.icon-wi-cloud {
    &:before {
        content: $icon-wi-cloud;
    }
}
.icon-wi-cloudy {
    &:before {
        content: $icon-wi-cloudy;
    }
}
.icon-wi-night-alt-cloudy {
    &:before {
        content: $icon-wi-night-alt-cloudy;
    }
}
.icon-wi-day-cloudy {
    &:before {
        content: $icon-wi-day-cloudy;
    }
}
.icon-wi-night-clear {
    &:before {
        content: $icon-wi-night-clear;
    }
}
.icon-wi-day-sunny {
    &:before {
        content: $icon-wi-day-sunny;
    }
}
</style>

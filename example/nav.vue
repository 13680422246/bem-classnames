<template>
    <div v-classnames="[]">
        <!-- nav__item -->
        <div v-classnames="['item']">item1</div>
        <!-- nav__item nav__item--diabled -->
        <div
            v-classnames="[
                'item',
                {
                    disabled: true,
                },
            ]"
        >
            item2
        </div>
    </div>
</template>

<script lang="ts">
import generateBemClassNames from "bem-classnames/lib/vue";
// step 1: global options
const bemClassNames = generateBemClassNames();
// step 2: register local directives
export default {
    data() {
        return {};
    },
    directives: {
        classnames: bemClassNames("nav"),
    },
    methods: {},
};
</script>

<style lang="scss" >
.nav {
    &__item {
        color: red;
        &--disabled {
            color: blue;
            opacity: 0.1;
        }
    }
}
</style>

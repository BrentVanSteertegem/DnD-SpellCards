<template>
    <ul class="flex flex-col">
        <li class="list-none flex gap-2" v-for="[className, number] in filter?.spellsPerClass" :key="className">
            <input type="checkbox" :id="className" :value="className" @change="updateSelectedClasses"/>
            <label :for="className">{{className}} ({{number}})</label>
        </li>
      </ul>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue'
    import { filter } from '@/types'

    const props = {
        filter: {
            type: Object as () => filter,
            required: true
        }
    }

    export default defineComponent({
        name: 'FilterComponent',
        props,
        methods: {
            updateSelectedClasses($event: Event) {
                this.$emit('passSelectedClass', ($event.target as HTMLInputElement).value)
            }
        }
    })

</script>
<template>
    <h1>{{ spell.name }}</h1>
</template>

<script lang='ts'>
  import { defineProps } from 'vue'
  import { Spell } from '@/types'

  export default {
    name: 'SpellCard',
    props: {
      spell: defineProps<Spell>()
    }
  }
</script>

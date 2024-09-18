<template>
  <li v-for="spell in spells" :key="spell.index">
    <SpellCard :spell="spell"/>
  </li>
</template>

<script lang='ts'>
  import { SpellCard } from '@/components'
  import { getAllSpells } from '@/data/getAllSpells'
  import { Spell } from '@/types'

  export default {
    name: 'App',
    components: {
      SpellCard,
    },
    data() {
      return {
        spells: [] as Spell[]
      }
    },
    mounted() {
      const fetchSpells = async () => {
        const savedSpells = localStorage.getItem('spells')
        if (savedSpells) {
          this.spells = JSON.parse(savedSpells)
        }

        const apiSpells = await getAllSpells()
        if (apiSpells) {
          this.spells = apiSpells
          localStorage.setItem('spells', JSON.stringify(apiSpells))
        }
      }

      fetchSpells()
    }
  }
</script>
<template>
  <ul class="flex flex-wrap gap-4 justify-center p-4">
    <li class="list-none" v-for="spell in spells" :key="spell.index">
      <SpellCard :spell="spell"/>
    </li>
  </ul>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue'
  import { Spell } from '@/types'
  import { getAllSpells } from '@/data/getAllSpells'
  import { SpellCard } from '@/components'

  export default defineComponent({
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
  })
</script>
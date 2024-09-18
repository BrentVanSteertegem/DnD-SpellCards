<template>
  <li v-for="spell in spells" :key="spell.id">
    <SpellCard :name="spell.name"/>
  </li>
</template>

<script>
  import { SpellCard } from './components/index.ts'
  import { getAllSpells } from './data/getAllSpells.ts'

  export default {
    name: 'App',
    components: {
      SpellCard,
    },
    data() {
      return {
        spells: []
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
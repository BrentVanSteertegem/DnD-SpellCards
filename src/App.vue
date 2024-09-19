<template>
  <section>
    <Filter :filter="filter" @passSelectedClass="updateSelectedClasses($event)"/>
    <ul class="flex flex-wrap gap-4 justify-center p-4">
      <li class="list-none" v-for="spell in selectedSpells" :key="spell.index">
        <SpellCard :spell="spell"/>
      </li>
    </ul>
  </section>
</template>

<script lang='ts'>
  import { defineComponent } from 'vue'
  import { Spell } from '@/types'
  import { getAllSpells } from '@/data/getAllSpells'
  import { Filter, SpellCard } from '@/components'

  export default defineComponent({
    name: 'App',
    components: {
      Filter,
      SpellCard,
    },
    data() {
      return {
        selectedClasses: [] as string[],
        spells: [] as Spell[],
        selectedSpells: [] as Spell[],
        filter: {
          spellsPerClass: new Map<string, number>()
        }
      }
    },
    methods: {
      updateSelectedSpells() {
        const newSelectedSpells = this.spells.filter((spell: Spell) => {
          return spell.classes.some((classItem) => this.selectedClasses.includes(classItem.index))
        })
        this.selectedSpells = newSelectedSpells.length ? newSelectedSpells : this.spells
      },
      updateSelectedClasses(selectedClass: string) {
        if (this.selectedClasses.includes(selectedClass)) {
          this.selectedClasses = this.selectedClasses.filter((classItem) => classItem !== selectedClass)
        } else {
          this.selectedClasses.push(selectedClass)
        }

        this.updateSelectedSpells()
      }
    },
    mounted() {
      const initializespellsPerClass = (spells: Spell[]) => {
        spells.forEach((spell: Spell) => {
          spell.classes.forEach((classItem) => {
            if (this.filter.spellsPerClass.get(classItem.index)) {
              this.filter.spellsPerClass.set(classItem.index, this.filter.spellsPerClass.get(classItem.index)! + 1)
            } else {
              this.filter.spellsPerClass.set(classItem.index, 1)
            }
          })
        })
      }

      const fetchSpells = async () => {
        const savedSpells = localStorage.getItem('spells')
        if (savedSpells) {
          this.spells = JSON.parse(savedSpells)
          initializespellsPerClass(JSON.parse(savedSpells))
        }

        const apiSpells = await getAllSpells()
        if (apiSpells) {
          this.spells = apiSpells
          localStorage.setItem('spells', JSON.stringify(apiSpells))
          this.filter.spellsPerClass = new Map<string, number>()
          initializespellsPerClass(apiSpells)
        }
      }

      fetchSpells()

      this.selectedSpells = this.spells
    }
  })
</script>
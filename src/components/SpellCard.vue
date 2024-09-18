<template>
  <div class="spellcard w-80 p-8 rounded-3xl text-base">
    <section class="flex-col gap-4 h-96 overflow-auto">
      <div>
          <h2 class="text-xl uppercase">{{spell!.name}}</h2>
          <i>
              {{spell!.level > 0 ? "Level " + spell!.level + " " : ""}}
              {{spell!.school.name}}
              {{spell!.level === 0 ? " cantrip" : ""}}
          </i>
      </div>
      <section class="flex-col gap-1">
        <section v-if="spell!.casting_time" class="items-center gap-2.5">
            <b class="text-lg">Casting time:</b>
            <p>{{spell!.casting_time}}</p>
        </section>
        <section v-if="spell!.range" class="items-center gap-2.5">
            <b class="text-lg">Range:</b>
            <p>{{spell!.range}}</p>
        </section>
        <section v-if="spell!.components" class="items-center gap-2.5">
            <b class="text-lg">Components:</b>
            <p>{{spell!.components.join(", ")}}</p>
        </section>
        <section v-if="spell!.duration" class="items-center gap-2.5">
            <b class="text-lg">Duration:</b>
            <p>{{spell!.duration}}</p>
        </section>
      </section>
      <p v-if="spell!.desc" class="desc">{{typeof(spell!.desc) == "object" ? spell!.desc[0] : spell!.desc}}</p>
  </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"
  import { Spell } from "@/types"

  const props = {
    spell: {
      type: Object as () => Spell,
      required: true
    }
  }

  export default defineComponent({
    name: "SpellCard",
    props,
  })
</script>

<style scoped>
  .spellcard {
    background: url("/src/assets/images/spellcard_background.jpg");
    height: 28rem;

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 4px #582D3088; 
      border-radius: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      background: #582D3099;
      border-radius: 0.5rem;
    }

    &:hover {
      ::-webkit-scrollbar-thumb {
        background: #582D30dd;
      }
    }
  }

  .spellcard h2 {
    color: #582D30;
  }
</style>
export type Spell = {
    index: string,
    name: string,
    level: number,
    school: {
        name: string,
    },
    casting_time: string,
    range: string,
    components: string[],
    duration: string,
    desc: string,
    classes: Class[],
    url: string,
}

export type Class = {
    index: string,
    name: string,
    url: string,
}

export type filter = {
    spellsPerClass: Map<string, number>,
}
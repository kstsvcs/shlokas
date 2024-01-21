<script setup lang="ts">
  const chapterNo = ref()
  const verseNo = ref()
  const verse = ref()
  const available = ref(false)
  const show = ref(false)

  const versesInChapter = [46,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];

  function getRandomVerseNo(){
    //@TODO: combined verses
    chapterNo.value = Math.floor(Math.random() * 18) + 1;
    verseNo.value = Math.floor(Math.random() * versesInChapter[chapterNo.value-1]) + 1;
  }

  const getVerse = async () => {
    getRandomVerseNo()
    const { data } = await useFetch('/api/hello', {
    query: { chapterNo, verseNo}
    });
    verse.value = data.value
    available.value = true
  }
</script>

<template>
  <v-btn v-if="!available" @click="getVerse">Get a Random Verse from BG</v-btn>
  <v-alert v-if="available" :text="`Do you know the verse BG ${ chapterNo } . ${ verseNo } ?`"></v-alert>
  <v-btn v-if="available && !show" @click="show = !show">Show</v-btn>
  <v-btn v-if="available && show" @click="show = !show; available = !available; getVerse()">Get Another</v-btn>
  <v-expansion-panels v-if="available && show" >
  <v-expansion-panel
    title="Devanagri"
    :text="verse.devanagri"
  >
  </v-expansion-panel>
  <v-expansion-panel
    title="Text"
    :text="verse.verse"
  >
  </v-expansion-panel>
  <v-expansion-panel
    title="Synonyms"
    :text="verse.synonyms"
  >
  </v-expansion-panel>
  <v-expansion-panel
    title="Translation"
    :text="verse.translation"
  >
  </v-expansion-panel>
  <v-expansion-panel
    title="Purport"
    :text="verse.purport"
  >
  </v-expansion-panel>
</v-expansion-panels>
</template>

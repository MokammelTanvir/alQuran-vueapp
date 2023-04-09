
<template>
  <div class="min-h-screen bg-gray-100">
  
  <div class="container my-6">
  <div class="flex items-center mb-3 bg-blue-200 shadow rounded py-5">
  <div class="basis-6/12 ml-5">
  <img class="h-14 w-14"  src="./assets/quran-2.png" alt="">    
  </div>
  <h2 class="basis-6/12 text-4xl font-bold">AL QURAN - القرأن</h2>
  
  </div>

  

  <div class="bg-white p-4 shadow rounded">
  <div class="flex -mx-4 items-center mb-6">
  <div class="flex-1 px-4">
  <select  @change="getSpecificSurah" class="quran-input" name="" >
  <option value="">Select Surah</option>
  <option v-for="surah in surahs" :value="surah.number">
  {{ surah.englishName }} - {{ surah.name }}
  </option>
  </select>
  </div>
  <div class="flex-1 px-4 text-center">
  <h3 class="font-bold mb-1 text-lg">{{ currentSurah.name }} - {{ currentSurah.englishName }}</h3>
  
  <p>{{ currentSurah.englishNameTranslation }} | {{ currentSurah.revelationType }} | Ayah: {{ currentSurah.numberOfAyahs }}</p>
  </div>
  <div class="flex-1 px-4">
  <button class="quran-btn">Play</button>

  </div>
    </div>
    <div v-if="loading" class="flex">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>
Loding...
</div>

    <div v-else class="text-4xl transition">
    <p class="mb-5 transition duration-300" v-if="currentSurah.hasOwnProperty('ayahs')" v-for="ayah in currentSurah.ayahs">
    <span class="text-xs inline-block w-5 h-5 border rounded-full text-center mr-4">{{ ayah.numberInSurah }}</span> {{ ayah.text }}</p>
    </div>
  </div>

  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      surahs: [],
      currentSurah: [],
      loading: true
  }
},
  mounted() {
    axios.get('https://api.alquran.cloud/v1/surah')
    .then(response => {
      this.surahs = response.data.data
    })
    
    this.querySpecificSurah(1);

  },
  methods: {
    getSpecificSurah(e) {
      this.querySpecificSurah(e.target.value);
  },

  querySpecificSurah(surahNumber) {
    this.loading = true;
    axios.get(`https://api.alquran.cloud/v1/surah/`+ surahNumber)
    .then(response => {
      this.currentSurah = response.data.data;
      this.loading = false;
    })
  }
}

};
</script>

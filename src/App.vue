<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <header class="bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-900 dark:to-blue-700 text-white shadow-lg">
      <div class="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between">
          <div class="flex items-center mb-3 sm:mb-0">
            <div class="relative">
              <div class="absolute inset-0 bg-white dark:bg-blue-300 rounded-full opacity-20 blur-md"></div>
              <img class="h-14 w-14 mr-3 rounded-full shadow-lg border-2 border-white transform hover:scale-110 transition-transform duration-300 relative z-10" src="./assets/al-quran.png" alt="Quran Logo">
            </div>
            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold ml-2 text-white drop-shadow-md">AL QURAN - القرأن</h1>
          </div>
          <div class="flex items-center mt-2 sm:mt-0">
            <button @click="toggleTheme" class="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-white">
              <svg v-if="darkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto my-6 px-4 sm:px-6 lg:px-8">
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <!-- Surah Selection and Info -->
        <div class="p-4 md:p-6">
          <div
            class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4"
          >
            <div class="w-full md:w-1/3">
              <div class="relative">
                <select
                  id="surah-select"
                  @change="getSpecificSurah"
                  class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Surah</option>
                  <option
                    v-for="surah in surahs"
                    :key="surah.number"
                    :value="surah.number"
                  >
                    {{ surah.number }}. {{ surah.englishName }} -
                    {{ surah.name }}
                  </option>
                </select>
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    class="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 text-center">
              <h3
                class="text-lg md:text-xl font-bold text-gray-800 dark:text-white"
              >
                <span v-if="currentSurah.name"
                  >{{ currentSurah.name }} -
                  {{ currentSurah.englishName }}</span
                >
                <span v-else>Select a Surah</span>
              </h3>
              <p
                v-if="currentSurah.englishNameTranslation"
                class="text-sm text-gray-600 dark:text-gray-300 mt-1"
              >
                {{ currentSurah.englishNameTranslation }} |
                {{ currentSurah.revelationType }} | Ayahs:
                {{ currentSurah.numberOfAyahs }}
              </p>
            </div>

            <div
              class="w-full md:w-1/3 flex justify-center md:justify-end space-x-3"
            >
              <button
                @click="playAudio"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                :disabled="audioLoading"
              >
                <svg
                  v-if="audioLoading"
                  class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <svg
                  v-else-if="audioPlaying"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {{
                  audioLoading ? "Loading..." : audioPlaying ? "Pause" : "Play"
                }}
              </button>
              <button
                @click="downloadSurah"
                class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg
                  v-if="isInstallable || (isIOS && !isIOSPWA)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 00-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {{
                  isInstallable || (isIOS && !isIOSPWA)
                    ? "Install App"
                    : "Download"
                }}
              </button>
            </div>
          </div>

          <!-- Audio Player -->
          <div
            v-if="audioSrc"
            class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="flex flex-col space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{
                  formatTime(currentTime)
                }}</span>
                <div
                  class="flex-1 mx-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                >
                  <div
                    class="h-full bg-blue-500 rounded-full relative"
                    :style="{ width: `${audioProgress}%` }"
                    @click="seekAudio"
                    ref="progressBar"
                  ></div>
                </div>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{
                  formatTime(duration)
                }}</span>
              </div>
              <div class="flex justify-center space-x-6">
                <button
                  @click="seekBackward"
                  class="p-2 rounded-full bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  @click="playAudio"
                  class="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 shadow-md transition-colors"
                >
                  <svg
                    v-if="audioPlaying"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  @click="seekForward"
                  class="p-2 rounded-full bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div class="flex justify-center space-x-4 mt-4">
                <select
                  @change="changeReciter"
                  v-model="currentReciter"
                  class="text-sm text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option
                    v-for="reciter in reciters"
                    :key="reciter.identifier"
                    :value="reciter.identifier"
                  >
                    {{ reciter.name }}
                  </option>
                </select>
                <button
                  @click="toggleRepeat"
                  class="p-2 rounded-md bg-gray-200 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-blue-900 transition-colors"
                  :class="{ 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900': repeat, 'text-gray-600 dark:text-gray-300': !repeat }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 dark:border-gray-700"></div>

        <!-- Content Area -->
        <div class="p-4 md:p-6">
          <!-- Loading State -->
          <div
            v-if="loading"
            class="flex flex-col items-center justify-center py-12"
          >
            <svg
              class="animate-spin h-10 w-10 text-blue-500 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Loading Surah...
            </p>

            <div v-if="loadingError" class="mt-4 text-center">
              <p class="text-red-500 mb-3">Failed to load Surah data</p>
              <button
                @click="retryLoading"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 inline-block mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Retry
              </button>
            </div>
          </div>

          <!-- Ayahs Content -->
          <div v-else>
            <div
              v-if="!currentSurah.ayahs || currentSurah.ayahs.length === 0"
              class="text-center py-12"
            >
              <p class="text-gray-600 dark:text-gray-300">
                Please select a Surah to view its content
              </p>
            </div>
            <div v-else class="space-y-6">
              <!-- Bismillah header except for Surah 9 -->
              <div v-if="currentSurah.number !== 9" class="text-center my-6">
                <p
                  class="text-2xl lg:text-3xl font-arabic text-gray-800 dark:text-white"
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>

              <div class="grid gap-6">
                <div
                  v-for="ayah in currentSurah.ayahs"
                  :key="ayah.number"
                  :data-ayah-number="ayah.numberInSurah"
                  class="group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div class="flex items-start md:items-center">
                    <div
                      class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mr-4"
                    >
                      {{ ayah.numberInSurah }}
                    </div>
                    <div class="flex-1">
                      <p
                        class="text-xl md:text-2xl lg:text-3xl font-arabic text-right leading-loose text-gray-800 dark:text-white mb-3"
                      >
                        {{ ayah.text }}
                      </p>
                      <p
                        v-if="showTranslation"
                        class="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base"
                      >
                        <span v-if="getTranslationLoadingState(ayah)">
                          <svg
                            class="animate-spin inline-block h-4 w-4 mr-2 text-blue-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          {{
                            translationLanguage === "en"
                              ? "Loading translation..."
                              : "অনুবাদ লোড হচ্ছে..."
                          }}
                        </span>
                        <span v-else>{{ getTranslation(ayah) }}</span>
                      </p>
                    </div>
                  </div>
                  <div
                    class="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      @click="copyAyah(ayah.text)"
                      class="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 p-1"
                      title="Copy Ayah"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </button>
                    <button
                      @click="toggleBookmark(ayah)"
                      class="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 p-1 ml-2"
                      :class="{
                        'text-blue-500 dark:text-blue-300': isBookmarked(ayah),
                      }"
                      title="Bookmark"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        :fill="isBookmarked(ayah) ? 'currentColor' : 'none'"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 shadow-inner mt-8">
      <div class="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            Data provided by
            <a
              href="https://alquran.cloud/"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              >Al Quran Cloud</a
            >
          </p>
          <div class="flex mt-3 md:mt-0">
            <button
              @click="toggleTranslation"
              class="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 px-3 py-1 rounded-md flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {{ showTranslation ? "Hide Translation" : "Show Translation" }}
            </button>
            <div class="relative ml-4 language-menu">
              <button
                @click="toggleLanguageMenu"
                class="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded flex items-center"
              >
                {{ translationLanguage === "en" ? "English" : "বাংলা" }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <div
                v-if="showLanguageMenu"
                class="absolute bottom-full mb-2 right-0 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10"
              >
                <div class="py-1">
                  <button
                    @click="setLanguage('en')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    :class="{
                      'bg-gray-100 dark:bg-gray-600':
                        translationLanguage === 'en',
                    }"
                  >
                    English
                  </button>
                  <button
                    @click="setLanguage('bn')"
                    class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    :class="{
                      'bg-gray-100 dark:bg-gray-600':
                        translationLanguage === 'bn',
                    }"
                  >
                    বাংলা
                  </button>
                </div>
              </div>
            </div>
            <div class="relative ml-4 bookmarks-menu">
              <button
                @click="toggleBookmarksMenu"
                class="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded flex items-center"
              >
                Bookmarks
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span
                  v-if="bookmarkedAyahs.length > 0"
                  class="ml-1 bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5"
                  >{{ bookmarkedAyahs.length }}</span
                >
              </button>
              <div
                v-if="showBookmarksMenu"
                class="absolute bottom-full mb-2 right-0 w-72 max-h-96 overflow-y-auto bg-white dark:bg-gray-700 rounded-md shadow-lg z-10"
              >
                <div class="p-3">
                  <h3
                    class="text-sm font-medium text-gray-900 dark:text-white mb-2"
                  >
                    Saved Ayahs
                  </h3>
                  <div
                    v-if="bookmarkedAyahs.length === 0"
                    class="text-sm text-gray-500 dark:text-gray-400 py-2"
                  >
                    No bookmarks saved yet
                  </div>
                  <div v-else class="space-y-2">
                    <div
                      v-for="bookmark in sortedBookmarks"
                      :key="`${bookmark.surahNumber}-${bookmark.ayahNumber}`"
                      class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 last:border-0"
                    >
                      <div class="flex justify-between mb-1">
                        <div class="font-medium">
                          {{ bookmark.surahName }} ({{
                            bookmark.surahNumber
                          }}:{{ bookmark.ayahNumber }})
                        </div>
                        <button
                          @click.stop="removeBookmark(bookmark)"
                          class="text-gray-400 hover:text-red-500"
                          title="Remove bookmark"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div class="text-xs font-arabic text-right mb-1 truncate">
                        {{ bookmark.ayahText }}
                      </div>
                      <div class="flex justify-end">
                        <button
                          @click="goToBookmarkedAyah(bookmark)"
                          class="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Go to ayah
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-1 rounded ml-4"
            >
              Settings
            </button>
          </div>
        </div>
        <div
          class="text-center mt-4 pt-3 border-t border-gray-200 dark:border-gray-700"
        >
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Developed with <span class="text-red-500">❤</span> by
            <a
              href="https://github.com/mokammeltanvir"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              >Mokammel Tanvir</a
            >
          </p>
        </div>
      </div>
    </footer>

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg flex items-center transition-all duration-300 ease-in-out"
      :class="[
        toastType === 'success' ? 'bg-green-500 text-white' : '',
        toastType === 'error' ? 'bg-red-500 text-white' : '',
        toastType === 'info' ? 'bg-blue-500 text-white' : '',
      ]"
      style="z-index: 9999"
    >
      <div v-if="toastType === 'success'" class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="toastType === 'error'" class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 00-1.414-1.414L10 10l-1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="toastType === 'info'" class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p>{{ toastMessage }}</p>
      <button
        @click="hideToast"
        class="ml-4 text-sm opacity-70 hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      surahs: [],
      currentSurah: {},
      loading: false,
      loadingError: false,
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      showTranslation: true,
      translationLanguage: "en",
      translations: {},
      translationLoading: {},
      translationsLoading: {
        en: {},
        bn: {},
      },
      translationRetryCount: {
        en: {},
        bn: {},
      },
      audioSrc: null,
      audioPlayer: null,
      audioPlaying: false,
      audioLoading: false,
      audioProgress: 0,
      currentTime: 0,
      duration: 0,
      repeat: false,
      currentReciter: "abdul_basit_murattal",
      reciters: [
        {
          name: "Mishari Rashid al-Afasy",
          identifier: "mishaari_raashid_al_3afaasee",
        },
        { name: "Abdul Basit Abdul Samad", identifier: "abdul_basit_murattal" },
        { name: "Abu Bakr al-Shatri", identifier: "abu_bakr_ash-shaatree" },
        { name: "Hani ar-Rifai", identifier: "hani_ar_rifai" },
        { name: "Mohamed Siddiq al-Minshawi", identifier: "minshawi_murattal" },
      ],
      showToast: false,
      toastMessage: "",
      toastType: "success",
      toastTimeout: null,
      bookmarkedAyahs: [],
      showBookmarksMenu: false,
      deferredPrompt: null,
      isInstallable: false,
      isIOS: false,
      isIOSPWA: false,
    };
  },
  mounted() {
    this.loadUserPreferences();

    this.loadAllSurahs();
    this.querySpecificSurah(1);

    this.setupDarkModeListener();

    this.loadBookmarks();

    window.debugQuranApp = {
      showTranslations: () => {
        console.log("Current translation state:", {
          showTranslation: this.showTranslation,
          language: this.translationLanguage,
          englishTranslations: this.translations.en,
          banglaTranslations: this.translations.bn,
        });
      },
      forceEnglishTranslation: () => {
        this.translationLanguage = "en";
        this.showTranslation = true;
        this.loadEnglishTranslation(this.currentSurah.number);
      },
      forceBanglaTranslation: () => {
        this.translationLanguage = "bn";
        this.showTranslation = true;
        this.loadBanglaTranslation(this.currentSurah.number);
      },
    };

    this.isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    this.isIOSPWA = this.isIOS && window.navigator.standalone;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.isInstallable = true;
    });

    window.addEventListener("appinstalled", () => {
      console.log("App was installed");
      this.deferredPrompt = null;
      this.isInstallable = false;
      this.showToastMessage("App installed successfully!", "success");
    });
  },
  methods: {
    loadUserPreferences() {
      const savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode !== null) {
        this.darkMode = JSON.parse(savedDarkMode);
        this.applyDarkMode();
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        this.darkMode = prefersDark;
        this.applyDarkMode();
      }

      const savedTranslation = localStorage.getItem("showTranslation");
      if (savedTranslation !== null) {
        this.showTranslation = JSON.parse(savedTranslation);
      }

      const savedLanguage = localStorage.getItem("translationLanguage");
      if (savedLanguage !== null) {
        this.translationLanguage = savedLanguage;
      }
    },

    setupDarkModeListener() {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (localStorage.getItem("darkMode") === null) {
            this.darkMode = e.matches;
            this.applyDarkMode();
          }
        });
    },

    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
      this.applyDarkMode();
    },

    applyDarkMode() {
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    toggleTranslation() {
      this.showTranslation = !this.showTranslation;
      localStorage.setItem(
        "showTranslation",
        JSON.stringify(this.showTranslation)
      );

      this.showToastMessage(
        this.showTranslation
          ? this.translationLanguage === "en"
            ? "Showing English translation"
            : "বাংলা অনুবাদ দেখানো হচ্ছে"
          : "Translation hidden",
        "info"
      );

      if (this.showTranslation && this.currentSurah.number) {
        if (this.translationLanguage === "en") {
          this.loadEnglishTranslation(this.currentSurah.number);
        } else if (this.translationLanguage === "bn") {
          this.loadBanglaTranslation(this.currentSurah.number);
        }
      }
    },

    toggleLanguageMenu() {
      this.showLanguageMenu = !this.showLanguageMenu;

      if (this.showLanguageMenu) {
        setTimeout(() => {
          document.addEventListener("click", this.closeLanguageMenu);
        }, 0);
      }
    },

    closeLanguageMenu(e) {
      if (!e.target.closest(".language-menu")) {
        this.showLanguageMenu = false;
        document.removeEventListener("click", this.closeLanguageMenu);
      }
    },

    setLanguage(lang) {
      this.translationLanguage = lang;
      localStorage.setItem("translationLanguage", lang);
      this.showLanguageMenu = false;

      this.showToastMessage(
        lang === "en"
          ? "Switched to English translation"
          : "বাংলা অনুবাদে স্যুইচ করা হয়েছে",
        "info"
      );

      if (this.showTranslation && this.currentSurah.number) {
        if (lang === "en") {
          this.loadEnglishTranslation(this.currentSurah.number);
        } else {
          this.loadBanglaTranslation(this.currentSurah.number);
        }
      }
    },

    getTranslationLoadingState(ayah) {
      const surahNum = this.currentSurah.number;
      const lang = this.translationLanguage;

      if (!this.translations[lang]) this.translations[lang] = {};
      if (!this.translationsLoading[lang]) this.translationsLoading[lang] = {};

      if (
        this.translations[lang][surahNum] &&
        this.translations[lang][surahNum][ayah.numberInSurah]
      ) {
        return false;
      }

      return this.translationsLoading[lang][surahNum] === true;
    },

    getTranslation(ayah) {
      const surahNum = this.currentSurah.number;
      const ayahNum = ayah.numberInSurah;
      const lang = this.translationLanguage;

      if (!this.translations[lang]) this.translations[lang] = {};
      if (!this.translationsLoading[lang]) this.translationsLoading[lang] = {};

      if (
        this.translations[lang][surahNum] &&
        this.translations[lang][surahNum][ayahNum]
      ) {
        return this.translations[lang][surahNum][ayahNum];
      }

      if (!this.translationsLoading[lang][surahNum]) {
        this.loadTranslations(surahNum);
      }

      return lang === "en"
        ? `Translation not available for Ayah ${ayahNum}`
        : `আয়াত ${ayahNum} এর জন্য অনুবাদ উপলব্ধ নয়`;
    },

    loadTranslations(surahNumber) {
      const lang = this.translationLanguage;

      if (!this.translationsLoading[lang]) this.translationsLoading[lang] = {};
      if (!this.translationRetryCount[lang])
        this.translationRetryCount[lang] = {};
      if (!this.translations[lang]) this.translations[lang] = {};

      this.translationsLoading[lang][surahNumber] = true;

      this.translationRetryCount[lang][surahNumber] =
        this.translationRetryCount[lang][surahNumber] || 0;

      if (lang === "en") {
        this.loadEnglishTranslation(surahNumber);
      } else if (lang === "bn") {
        this.loadBanglaTranslation(surahNumber);
      }
    },

    loadEnglishTranslation(surahNumber) {
      console.log("Loading English translation for surah:", surahNumber);

      this.translationsLoading.en[surahNumber] = true;

      const currentRetryCount = this.translationRetryCount.en[surahNumber] || 0;
      this.translationRetryCount.en[surahNumber] = currentRetryCount + 1;

      if (currentRetryCount >= 2) {
        this.createPlaceholderTranslations("en", surahNumber);
        return;
      }

      axios
        .get(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.sahih`)
        .then((response) => {
          if (response.data && response.data.data && response.data.data.ayahs) {
            const translationData = {};
            response.data.data.ayahs.forEach((ayah) => {
              translationData[ayah.numberInSurah] = ayah.text;
            });

            this.translations.en[surahNumber] = translationData;
            this.translationsLoading.en[surahNumber] = false;

            console.log("English translation loaded successfully");
          } else {
            throw new Error("Unexpected API response format");
          }
        })
        .catch((error) => {
          console.error(
            "Error loading English translation from primary source:",
            error
          );

          this.loadEnglishTranslationFallback(surahNumber);
        });
    },

    loadEnglishTranslationFallback(surahNumber) {
      console.log("Trying alternative English translation source");

      axios
        .get(
          `https://api.quran.com/api/v4/quran/translations/20?chapter_number=${surahNumber}`
        )
        .then((response) => {
          const translationData = {};

          if (response.data && response.data.translations) {
            response.data.translations.forEach((ayah) => {
              const verseParts = ayah.verse_key.split(":");
              const ayahNumber = parseInt(verseParts[1]);
              translationData[ayahNumber] = ayah.text;
            });

            this.translations.en[surahNumber] = translationData;
            this.translationsLoading.en[surahNumber] = false;

            console.log("English translation loaded from fallback source");
          } else {
            throw new Error("Unexpected response format");
          }
        })
        .catch((error) => {
          console.error(
            "Error loading English translation from fallback source:",
            error
          );

          this.createPlaceholderTranslations("en", surahNumber);
        });
    },

    loadBanglaTranslation(surahNumber) {
      console.log("Loading Bangla translation for surah:", surahNumber);

      this.translationsLoading.bn[surahNumber] = true;

      const currentRetryCount = this.translationRetryCount.bn[surahNumber] || 0;
      this.translationRetryCount.bn[surahNumber] = currentRetryCount + 1;

      if (currentRetryCount >= 2) {
        this.createPlaceholderTranslations("bn", surahNumber);
        return;
      }

      axios
        .get(`https://api.alquran.cloud/v1/surah/${surahNumber}/bn.bengali`)
        .then((response) => {
          if (response.data && response.data.data && response.data.data.ayahs) {
            const translationData = {};
            response.data.data.ayahs.forEach((ayah) => {
              translationData[ayah.numberInSurah] = ayah.text;
            });

            this.translations.bn[surahNumber] = translationData;
            this.translationsLoading.bn[surahNumber] = false;

            console.log("Bangla translation loaded successfully");
          } else {
            throw new Error("Unexpected API response format");
          }
        })
        .catch((error) => {
          console.error(
            "Error loading Bangla translation from primary source:",
            error
          );

          this.loadBanglaTranslationFallback(surahNumber);
        });
    },

    loadBanglaTranslationFallback(surahNumber) {
      console.log("Trying alternative Bangla translation source");

      axios
        .get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ben-muhiuddinkhan/${surahNumber}.json`
        )
        .then((response) => {
          const translationData = {};

          if (response.data && response.data.verses) {
            response.data.verses.forEach((ayah) => {
              translationData[ayah.verse] = ayah.text;
            });

            this.translations.bn[surahNumber] = translationData;
            this.translationsLoading.bn[surahNumber] = false;

            console.log("Bangla translation loaded from fallback source");
          } else {
            throw new Error("Unexpected response format");
          }
        })
        .catch((error) => {
          console.error(
            "Error loading Bangla translation from fallback source:",
            error
          );

          this.createPlaceholderTranslations("bn", surahNumber);
        });
    },

    createPlaceholderTranslations(language, surahNumber) {
      console.log(
        `Creating placeholder translations for ${language}, surah ${surahNumber}`
      );

      const placeholderData = {};
      const message =
        language === "en"
          ? "Translation could not be loaded. Please try again later."
          : "অনুবাদ লোড করা যায়নি। দয়া করে পরে আবার চেষ্টা করুন।";

      if (this.currentSurah.ayahs) {
        this.currentSurah.ayahs.forEach((ayah) => {
          placeholderData[ayah.numberInSurah] = message;
        });
      }

      this.translations[language][surahNumber] = placeholderData;

      this.translationsLoading[language][surahNumber] = false;

      this.showToastMessage(
        language === "en"
          ? "Could not load translations. Check your internet connection."
          : "অনুবাদ লোড করা যায়নি। আপনার ইন্টারনেট সংযোগ পরীক্ষা করুন।",
        "error"
      );
    },

    loadAllSurahs() {
      axios
        .get("https://api.alquran.cloud/v1/surah")
        .then((response) => {
          this.surahs = response.data.data;
        })
        .catch((primaryError) => {
          console.error(
            "Error loading surahs from primary source:",
            primaryError
          );

          axios
            .get("https://api.quran.com/api/v4/chapters")
            .then((response) => {
              if (response.data && response.data.chapters) {
                this.surahs = response.data.chapters.map((chapter) => ({
                  number: chapter.id,
                  name: chapter.name_arabic,
                  englishName: chapter.name_simple,
                  englishNameTranslation: chapter.translated_name?.name || "",
                  numberOfAyahs: chapter.verses_count,
                  revelationType: chapter.revelation_place,
                }));
              } else {
                throw new Error("Unexpected data format from fallback API");
              }
            })
            .catch((secondaryError) => {
              console.error(
                "Error loading surahs from fallback source:",
                secondaryError
              );

              axios
                .get(
                  "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/info.json"
                )
                .then((response) => {
                  if (response.data && response.data.chapters) {
                    this.surahs = Object.entries(response.data.chapters).map(
                      ([number, chapter]) => ({
                        number: parseInt(number),
                        name: chapter.arabicName || `سورة ${number}`,
                        englishName: chapter.name || `Surah ${number}`,
                        englishNameTranslation: chapter.translation || "",
                        numberOfAyahs: chapter.totalVerses || 0,
                        revelationType: chapter.revelationType || "Unknown",
                      })
                    );
                  } else {
                    throw new Error("Unexpected data format from third source");
                  }
                })
                .catch((thirdError) => {
                  console.error(
                    "All sources failed for surah list:",
                    thirdError
                  );
                  this.showToastMessage(
                    "Failed to load Surah list. Please check your internet connection and try again later.",
                    "error"
                  );
                });
            });
        });
    },

    getSpecificSurah(e) {
      const surahNumber = e.target.value;
      if (surahNumber) {
        this.querySpecificSurah(surahNumber);

        if (this.audioPlaying) {
          setTimeout(() => {
            this.playAudio();
          }, 1000);
        }
      }
    },

    querySpecificSurah(surahNumber) {
      this.loading = true;
      this.loadingError = false;

      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlaying = false;
        this.audioSrc = null;
      }

      const loadSurahFromAPI = (source, endpoint) => {
        return axios.get(`${source}${endpoint}`);
      };

      loadSurahFromAPI("https://api.alquran.cloud/v1", `/surah/${surahNumber}`)
        .then((response) => {
          this.currentSurah = response.data.data;
          this.loading = false;
          this.loadingError = false;

          if (this.showTranslation) {
            this.loadTranslations(surahNumber);
          }

          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((error) => {
          console.error("Error loading surah from primary source:", error);

          loadSurahFromAPI(
            "https://api.quran.com/api/v4",
            `/chapters/${surahNumber}`
          )
            .then((response) => {
              if (response.data && response.data.chapter) {
                this.currentSurah = this.normalizeQuranComData(
                  response.data.chapter
                );
                this.loading = false;
                this.loadingError = false;

                if (this.showTranslation) {
                  this.loadTranslations(surahNumber);
                }

                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                throw new Error("Unexpected data format from fallback API");
              }
            })
            .catch((secondError) => {
              console.error(
                "Error loading surah from fallback source:",
                secondError
              );

              loadSurahFromAPI(
                "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1",
                `/editions/ara-quranacademy/${surahNumber}.json`
              )
                .then((response) => {
                  if (response.data && response.data.verses) {
                    const surahData = {
                      number: surahNumber,
                      name: `سورة ${surahNumber}`,
                      englishName: `Surah ${surahNumber}`,
                      englishNameTranslation: "",
                      revelationType: "",
                      numberOfAyahs: response.data.verses.length,
                      ayahs: response.data.verses.map((verse) => ({
                        number: verse.id || verse.verse,
                        text: verse.text,
                        numberInSurah: verse.verse,
                        juz: 0,
                        page: 0,
                      })),
                    };

                    this.currentSurah = surahData;
                    this.loading = false;
                    this.loadingError = false;

                    if (this.showTranslation) {
                      this.loadTranslations(surahNumber);
                    }
                  } else {
                    throw new Error(
                      "Unexpected data format from third API source"
                    );
                  }
                })
                .catch((thirdError) => {
                  console.error(
                    "All API sources failed for surah loading:",
                    thirdError
                  );
                  this.loading = false;
                  this.loadingError = true;
                  this.showToastMessage(
                    "Failed to load Surah. Please check your internet connection and try again later.",
                    "error"
                  );
                });
            });
        });
    },

    normalizeQuranComData(chapterData) {
      const surahNumber = chapterData.id || chapterData.chapter_number;

      const normalizedSurah = {
        number: surahNumber,
        name: chapterData.name_arabic || chapterData.name,
        englishName:
          chapterData.name_simple || chapterData.transliteration || "",
        englishNameTranslation: chapterData.translated_name?.name || "",
        revelationType: chapterData.revelation_place || "Unknown",
        numberOfAyahs: chapterData.verses_count || 0,
        ayahs: [],
      };

      this.loadAyahsForSurah(normalizedSurah);

      return normalizedSurah;
    },

    loadAyahsForSurah(surah) {
      axios
        .get(
          `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surah.number}`
        )
        .then((response) => {
          if (response.data && response.data.verses) {
            surah.ayahs = response.data.verses.map((verse) => ({
              number: verse.id,
              text: verse.text_uthmani,
              numberInSurah: verse.verse_number,
              juz: verse.juz_number || 0,
              page: verse.page_number || 0,
            }));

            this.currentSurah = { ...this.currentSurah };
          }
        })
        .catch((error) => {
          console.error("Error loading ayahs from Quran.com API:", error);

          this.loadAyahsFromFallback(surah);
        });
    },

    loadAyahsFromFallback(surah) {
      axios
        .get(
          `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranacademy/${surah.number}.json`
        )
        .then((response) => {
          if (response.data && response.data.verses) {
            surah.ayahs = response.data.verses.map((verse) => ({
              number: verse.id || verse.verse,
              text: verse.text,
              numberInSurah: verse.verse,
              juz: 0,
              page: 0,
            }));

            this.currentSurah = { ...this.currentSurah };
          }
        })
        .catch((error) => {
          console.error("Error loading ayahs from fallback source:", error);
          this.loadingError = true;
          this.showToastMessage(
            "Failed to load ayahs. Please try again later.",
            "error"
          );
        });
    },

    playAudio() {
      if (!this.currentSurah.number) {
        this.showToastMessage("Please select a Surah first", "info");
        return;
      }

      if (this.audioPlayer && this.audioPlaying) {
        this.audioPlayer.pause();
        this.audioPlaying = false;
        return;
      }

      if (this.audioSrc && this.audioPlayer) {
        this.audioPlayer.play();
        this.audioPlaying = true;
        return;
      }

      this.loadAndPlayAudio();
    },

    loadAndPlayAudio() {
      this.audioLoading = true;

      this.tryNextAudioSource(0);
    },

    tryNextAudioSource(sourceIndex) {
      const sources = [
        `https://download.quranicaudio.com/quran/${
          this.currentReciter
        }/${this.currentSurah.number.toString().padStart(3, "0")}.mp3`,

        `https://everyayah.com/data/${
          this.currentReciter
        }/${this.currentSurah.number.toString().padStart(3, "0")}.mp3`,

        `https://cdn.islamic.network/quran/audio-surah/128/${this.currentReciter}/${this.currentSurah.number}.mp3`,

        `https://verses.quran.com/AbdulBaset/${this.currentSurah.number
          .toString()
          .padStart(3, "0")}.mp3`,
      ];

      if (sourceIndex >= sources.length) {
        console.error("All audio sources failed");
        this.audioLoading = false;
        this.showToastMessage(
          "Failed to play audio. Please try a different surah or reciter.",
          "error"
        );
        return;
      }

      const audioUrl = sources[sourceIndex];
      console.log(`Trying audio source ${sourceIndex + 1}:`, audioUrl);

      if (!this.audioPlayer) {
        this.audioPlayer = new Audio();

        this.audioPlayer.addEventListener("timeupdate", this.updateProgress);
        this.audioPlayer.addEventListener("loadedmetadata", this.onAudioLoaded);
        this.audioPlayer.addEventListener("ended", this.onAudioEnded);
        this.audioPlayer.addEventListener("error", this.onAudioError);
      }

      this.audioSrc = audioUrl;
      this.audioPlayer.src = audioUrl;
      this.audioPlayer.load();

      const loadingTimeout = setTimeout(() => {
        if (this.audioLoading) {
          console.log("Audio loading timed out, trying next source");
          this.audioPlayer.pause();
          this.tryNextAudioSource(sourceIndex + 1);
        }
      }, 5000);

      this.audioPlayer
        .play()
        .then(() => {
          clearTimeout(loadingTimeout);
          this.audioPlaying = true;
          this.audioLoading = false;
        })
        .catch((error) => {
          clearTimeout(loadingTimeout);
          console.error(
            `Error playing audio from source ${sourceIndex + 1}:`,
            error
          );
          this.tryNextAudioSource(sourceIndex + 1);
        });
    },

    updateProgress() {
      if (this.audioPlayer) {
        this.currentTime = this.audioPlayer.currentTime;
        this.duration = this.audioPlayer.duration || 0;
        this.audioProgress = (this.currentTime / this.duration) * 100 || 0;
      }
    },

    onAudioLoaded() {
      this.audioLoading = false;
      this.duration = this.audioPlayer.duration;
    },

    onAudioEnded() {
      this.audioPlaying = false;
      this.currentTime = 0;
      this.audioProgress = 0;

      if (this.repeat) {
        setTimeout(() => {
          this.audioPlayer.play();
          this.audioPlaying = true;
        }, 1000);
      }
    },

    onAudioError() {
      this.audioLoading = false;
      this.audioPlaying = false;
      console.error("Error loading audio");
    },

    formatTime(seconds) {
      if (isNaN(seconds) || seconds === 0) return "0:00";
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
    },

    seekAudio(event) {
      if (!this.audioPlayer || !this.$refs.progressBar) return;

      const progressBar = this.$refs.progressBar.parentElement;
      const rect = progressBar.getBoundingClientRect();
      const position = (event.clientX - rect.left) / rect.width;

      if (position >= 0 && position <= 1) {
        this.audioPlayer.currentTime = position * this.duration;
      }
    },

    seekForward() {
      if (this.audioPlayer) {
        this.audioPlayer.currentTime = Math.min(
          this.audioPlayer.currentTime + 10,
          this.duration
        );
      }
    },

    seekBackward() {
      if (this.audioPlayer) {
        this.audioPlayer.currentTime = Math.max(
          this.audioPlayer.currentTime - 10,
          0
        );
      }
    },

    changeReciter() {
      const wasPlaying = this.audioPlaying;

      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlaying = false;
      }

      if (wasPlaying) {
        this.loadAndPlayAudio();
      }
    },

    toggleRepeat() {
      this.repeat = !this.repeat;
    },

    downloadSurah() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();

        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
            this.showToastMessage("Installing app...", "success");
          } else {
            console.log("User dismissed the install prompt");
            this.showToastMessage("Installation canceled", "info");
          }
          this.deferredPrompt = null;
        });
      } else if (this.isIOS && !this.isIOSPWA) {
        this.showIOSInstallInstructions();
      } else {
        this.showToastMessage(
          "App is already installed or cannot be installed on this device",
          "info"
        );
      }
    },

    showIOSInstallInstructions() {
      const message =
        'To install this app on iOS: tap the share icon, then "Add to Home Screen"';
      this.showToastMessage(message, "info", 6000);
    },

    copyAyah(text) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showToastMessage("Ayah copied to clipboard", "success");
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          this.showToastMessage("Failed to copy text", "error");
        });
    },

    showToastMessage(message, type = "success", duration = 3000) {
      if (this.toastTimeout) {
        clearTimeout(this.toastTimeout);
      }

      this.toastMessage = message;
      this.toastType = type;
      this.showToast = true;

      this.toastTimeout = setTimeout(() => {
        this.hideToast();
      }, duration);
    },

    hideToast() {
      this.showToast = false;
    },

    beforeUnmount() {
      if (this.audioPlayer) {
        this.audioPlayer.pause();
        this.audioPlayer.src = "";
        this.audioPlayer.removeEventListener("timeupdate", this.updateProgress);
        this.audioPlayer.removeEventListener(
          "loadedmetadata",
          this.onAudioLoaded
        );
        this.audioPlayer.removeEventListener("ended", this.onAudioEnded);
        this.audioPlayer.removeEventListener("error", this.onAudioError);
        this.audioPlayer = null;
      }
    },

    retryLoading() {
      if (this.currentSurah.number) {
        this.querySpecificSurah(this.currentSurah.number);
      } else {
        this.querySpecificSurah(1);
      }

      this.showToastMessage("Retrying...", "info");
    },

    loadBookmarks() {
      const savedBookmarks = localStorage.getItem("bookmarkedAyahs");
      if (savedBookmarks) {
        try {
          this.bookmarkedAyahs = JSON.parse(savedBookmarks);
        } catch (e) {
          console.error("Error loading bookmarks:", e);
          this.bookmarkedAyahs = [];
        }
      }
    },

    saveBookmarks() {
      localStorage.setItem(
        "bookmarkedAyahs",
        JSON.stringify(this.bookmarkedAyahs)
      );
    },

    isBookmarked(ayah) {
      return this.bookmarkedAyahs.some(
        (bookmark) =>
          bookmark.surahNumber === this.currentSurah.number &&
          bookmark.ayahNumber === ayah.numberInSurah
      );
    },

    toggleBookmark(ayah) {
      const isCurrentlyBookmarked = this.isBookmarked(ayah);

      if (isCurrentlyBookmarked) {
        this.bookmarkedAyahs = this.bookmarkedAyahs.filter(
          (bookmark) =>
            !(
              bookmark.surahNumber === this.currentSurah.number &&
              bookmark.ayahNumber === ayah.numberInSurah
            )
        );
        this.showToastMessage("Bookmark removed", "info");
      } else {
        this.bookmarkedAyahs.push({
          surahNumber: this.currentSurah.number,
          surahName: this.currentSurah.englishName,
          ayahNumber: ayah.numberInSurah,
          ayahText: ayah.text,
          timestamp: new Date().toISOString(),
        });
        this.showToastMessage("Ayah bookmarked", "success");
      }

      this.saveBookmarks();
    },

    toggleBookmarksMenu() {
      this.showBookmarksMenu = !this.showBookmarksMenu;

      if (this.showBookmarksMenu) {
        setTimeout(() => {
          document.addEventListener("click", this.closeBookmarksMenu);
        }, 0);
      }
    },

    closeBookmarksMenu(e) {
      if (!e.target.closest(".bookmarks-menu")) {
        this.showBookmarksMenu = false;
        document.removeEventListener("click", this.closeBookmarksMenu);
      }
    },

    removeBookmark(bookmark) {
      this.bookmarkedAyahs = this.bookmarkedAyahs.filter(
        (b) =>
          !(
            b.surahNumber === bookmark.surahNumber &&
            b.ayahNumber === bookmark.ayahNumber
          )
      );
      this.saveBookmarks();
      this.showToastMessage("Bookmark removed", "info");
    },

    goToBookmarkedAyah(bookmark) {
      this.showBookmarksMenu = false;

      if (this.currentSurah.number === bookmark.surahNumber) {
        this.scrollToAyah(bookmark.ayahNumber);
      } else {
        this.querySpecificSurah(bookmark.surahNumber);

        setTimeout(() => {
          this.scrollToAyah(bookmark.ayahNumber);
        }, 1000);
      }
    },

    scrollToAyah(ayahNumber) {
      const ayahElement = document.querySelector(
        `[data-ayah-number="${ayahNumber}"]`
      );
      if (ayahElement) {
        ayahElement.scrollIntoView({ behavior: "smooth", block: "center" });

        ayahElement.classList.add("bg-yellow-100", "dark:bg-yellow-900");
        setTimeout(() => {
          ayahElement.classList.remove("bg-yellow-100", "dark:bg-yellow-900");
        }, 2000);
      }
    },
  },
  computed: {
    sortedBookmarks() {
      return [...this.bookmarkedAyahs].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    },
  },
};
</script>

<style>
@media (prefers-color-scheme: dark) {
  html.dark {
    @apply bg-gray-900;
  }
}

.font-arabic {
  font-family: "Amiri", "Scheherazade New", serif;
  line-height: 2;
}
</style>

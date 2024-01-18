<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, watch, onUnmounted, onMounted, computed, nextTick } from 'vue';
import { sortValues, generateValues, getPopType } from '@/Utils/helpers';
import { GAME_STATES } from '@/Utils/constants';
import Button from 'primevue/button';
import Card from 'primevue/card';

const score = ref(0);
const points = 5;
const rowDonePoints = 8;
const maxNumbers = 7;
const range = 100;
const seconds = 60;

const popType = ref(null);
const setUpGame = () => {
  popType.value = getPopType();
};

const popButtons = ref(new Set());
const sorted = computed(() =>
  sortValues(popType.value, Array.from(popButtons.value))
);
const values = computed(() => generateValues(popType.value, range));

const generatePopButtons = () => {
  popButtons.value.clear();
  while (popButtons.value.size < maxNumbers) {
    const val = values.value[Math.floor(Math.random() * values.value.length)];
    popButtons.value.add(val);
  }
};

const handleClick = (popVal) => {
  if (popVal === sorted.value[0]) {
    score.value += points;
    sorted.value.shift();
    popButtons.value.delete(popVal);
  } else {
    generatePopButtons();
    return;
  }

  if (sorted.value.length === 0) {
    score.value += rowDonePoints;
    generatePopButtons();
  }
};

const time = ref(seconds);
let intervalId = null;

watch(
  time,
  (newValue) => {
    if (newValue <= 0) {
      clearInterval(intervalId);
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await nextTick();
  playGame();
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const playGame = () => {
  score.value = 0;
  time.value = seconds;
  setUpGame();
  generatePopButtons();
  intervalId = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    }
  }, 1000);
};

const gameState = computed(() =>
  time.value > 0 ? GAME_STATES.PLAYING : GAME_STATES.GAME_OVER
);
</script>

<template>
  <Head title="POP" />
  <div class="flex justify-center items-center h-screen">
    <Card style="width: 50em">
      <template #title>
        <div class="flex justify-between items-center">
          <span class="w-full">POP</span>
          <div v-if="gameState === GAME_STATES.PLAYING" class="w-full flex">
            <span class="mx-auto"> Score: {{ score }}</span>
          </div>
          <div class="w-full flex">
            <span class="ml-auto">Time: {{ time }}</span>
          </div>
        </div>
      </template>
      <template #content>
        <div
          v-if="gameState === GAME_STATES.PLAYING"
          class="flex justify-center"
        >
          <Button
            v-for="popBtn in popButtons"
            class="mr-2"
            :label="popBtn.toString()"
            @click="() => handleClick(popBtn)"
          />
        </div>
        <div v-else class="flex justify-between">
          <span class="font-bold text-3xl"> Final Score: {{ score }} </span>
          <Button label="Play Again" @click="playGame" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style></style>

<script setup>
const emit = defineEmits(["hit"]);

const getRandomImage = async () => {
  const searchTerms = [
    "cats",
    "dogs",
    "abstract",
    "cars",
    "mountains",
    "beach",
    "landscape",
    "object",
    "food",
    "flowers",
    "architecture",
    "yellow",
    "green",
    "blue",
    "orange",
    "black",
    "white",
    "brown",
    "red",
    "patterns",
    "animal",
    "code",
    "space",
  ];
  const randomWord = arrayRandom(searchTerms);
  const { data } = await useFetchData(
    `https://pixabay.com/api/?key=23208036-34604012b2ea604907f4bb000&q=${randomWord}`
  );
  const randomImage = arrayRandom(data.value.hits);
  emit("hit", randomImage.webformatURL);
};
</script>

<template>
  <div style="margin-bottom: 15px">
    <button @click.prevent="getRandomImage">Random Avatar</button>
    <br />
    <small style="opacity: 0.5">
      Powered by <a href="https://pixabay.com">Pixabay</a>
    </small>
  </div>
</template>

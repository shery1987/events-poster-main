<script setup></script>

<template>
  <main>
    <TheSwiper />
    <Calendar />
    <AboutUsBlock />
    <ShortStatistic />
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

main {
  width: 100%;
  min-height: 80vh;

  .mains-header {
    background-color: $gray-800;
    padding-left: 15px;

    h1 {
      color: $white;
    }
  }
}
</style>

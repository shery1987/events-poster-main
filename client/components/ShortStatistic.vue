<script setup></script>

<template>
  <div class="site-statistic">
    <div class="statistic-block">
      <div class="block-wrapper">
        <span class="number">
          <NuxtImg src="/images/purple-cross.svg" alt="plus" />20</span
        >
        <p>קטגוריות</p>
      </div>
    </div>

    <div class="statistic-block">
      <div class="block-wrapper">
        <span class="number">
          <!--<NuxtImg src="/images/blue-cross.svg" alt="plus" />-->24</span
        >
        <p>שעות ביממה של אירועים</p>
      </div>
    </div>

    <div class="statistic-block">
      <div class="block-wrapper">
        <span class="number"
          ><NuxtImg src="/images/purple-cross.svg" alt="plus" />55</span
        >
        <p>מקומות של אירועים</p>
      </div>
    </div>

    <div class="statistic-block">
      <div class="block-wrapper">
        <span class="number"
          ><NuxtImg src="/images/blue-cross.svg" alt="plus" />180
        </span>
        <p>אירועים</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.site-statistic {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-around;
  margin: -140px auto 100px auto;
  padding: 68px 62px;
  width: 1280px;
  border-radius: 30px;
  background-color: $light-gray;

  @media (max-width: 1380px) {
    width: 90%;
  }

  @media (max-width: 1280px) {
    width: 100%;
    border-radius: 0;
    margin: 50px auto;
  }

  @media (max-width: 980px) {
    flex-wrap: wrap;
    padding: 15px 32px;
  }

  @media (max-width: 510px) {
    flex-wrap: wrap;
    padding: 15px 10px;
  }

  .statistic-block {
    @media (max-width: 980px) {
      width: 40%;
      display: flex;
      justify-content: center;
      margin: 15px 0;
    }

    @media (max-width: 510px) {
      width: 47%;
    }

    .block-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 39px 0;
      width: 240px;
      background-color: $white;
      border-radius: 30px;

      @media (max-width: 1180px) {
        padding: 30px 0;
        width: 200px;
      }

      .number {
        font-size: 48px;
        font-weight: 600;

        @media (max-width: 1180px) {
          font-size: 40px;
        }

        img {
          width: 23px;
          margin: 5px;

          @media (max-width: 1180px) {
            margin: 3px;
          }
        }
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>

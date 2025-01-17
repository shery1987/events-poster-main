<script setup>
useHead({
  title: "Pickevent - ליצור את האירוע שלך",
  meta: [
    {
      name: "ליצור את האירוע שלך",
      content: "ליצור את האירוע שלך",
    },
  ],
});
</script>

<template>
  <div class="add-event-wrapper">
    <div class="slider">
      <div class="slider-container">
        <div
          class="slide"
          :style="{
            backgroundImage: 'url(/images/money.png)',
          }"
        >
          <TheHeader />
          <div class="slide-content">
            <div class="banner-text">
              <h2>אירועים</h2>
              <p>למידע נוסף על אירועים</p>
            </div>

            <div class="filter-social">
              <div class="social-icons">
                <NuxtImg src="/images/whatsapp.png" />
                <NuxtImg src="/images/instagram.png" />
                <NuxtImg src="/images/facebook.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateUpdateEventForm />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.add-event-wrapper {
  .slider {
    background-color: $black;

    .slider-container {
      .slide {
        position: relative;
        display: flex;
        flex-direction: column;
        background-size: cover;
        background-position: center;

        @media (max-width: 768px) {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 0;
            pointer-events: none;
          }
        }

        .slide-content {
          width: 100%;
          margin-top: 80px;
          display: flex;
          flex-direction: column;
          z-index: 1;

          @media (max-width: 768px) {
            margin-top: 0;
          }

          .banner-text {
            text-align: center;
            h2 {
              color: $white;
              font-size: 64px;
              margin: 0;
              line-height: 0.8;
              letter-spacing: 4px;

              @media (max-width: 768px) {
                font-size: 32px;
              }
            }

            p {
              color: $white;
              font-size: 32px;
              margin-bottom: 50px;

              @media (max-width: 768px) {
                margin-top: 15px;
                font-size: 8px;
                font-weight: 300;
              }
            }
          }
        }

        .filter-social {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          margin-bottom: 30px;
          width: 100%;

          @media (max-width: 1280px) {
            flex-direction: column-reverse;
          }

          .social-icons {
            display: flex;
            width: 35%;
            padding-right: 5%;

            @media (max-width: 1280px) {
              width: 100%;
              padding: 0 70% 40px 0;
            }

            @media (max-width: 768px) {
              display: none;
            }

            img {
              width: 55px;
              height: 55px;
              margin-left: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

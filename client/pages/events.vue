<script setup>
useHead({
  title: "Pickevent - כל האירועים הישראלים במקום אחד",
  meta: [
    {
      name: "description",
      content: "אתר עם כל אירועי התרבות בישראל",
    },
  ],
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

import { useAllEventsStore } from "~/stores/allEventsStore";

const { allEvents, currentFilteredEventCollection } = storeToRefs(
  useAllEventsStore()
);

const dataIsLoaded = ref(false);

const { data: events } = await useFetch(`${API_URL}/all-events`);

onMounted(() => {
  allEvents.value = events.value;
  dataIsLoaded.value = true;
});

const eventsAmount = ref(20);

// Get actual event collection for the view according to allEvents
const actualityCollection = computed(() => {
  return currentFilteredEventCollection.value.length > 0
    ? currentFilteredEventCollection.value
    : allEvents.value;
});

const displayedEvents = computed(() => {
  return actualityCollection.value.slice(0, eventsAmount.value);
});

const hasMoreEvents = computed(() => {
  return eventsAmount.value < actualityCollection.value.length;
});

function showNextEvents() {
  eventsAmount.value += 20;
}
</script>

<template>
  <div v-if="dataIsLoaded" class="all-events-wrapper">
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
          </div>

          <div class="filter-social">
            <div class="filter-block">
              <TheFilter />
            </div>
            <div class="social-icons">
              <NuxtImg src="/images/whatsapp.png" />
              <NuxtImg src="/images/instagram.png" />
              <NuxtImg src="/images/facebook.png" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="events-wrapper">
        <div
          class="event"
          v-for="event in displayedEvents"
          :key="event.Position"
        >
          <SingleEventComponent :single-event-data="event" />
        </div>
      </div>
      <div class="btn-wrapper" v-if="hasMoreEvents">
        <button @click="showNextEvents" class="events-show-btn">
          האירועים הבאים
        </button>
      </div>
    </div>
  </div>
  <div v-else class="preloader">
    <NuxtImg src="/animation-cat.gif" alt="event image" />
    <span>קבלת המידע...</span>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.preloader {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.all-events-wrapper {
  min-height: 60vh;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;

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
          justify-content: center;
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
      }

      .filter-social {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;

        @media (max-width: 1280px) {
          flex-direction: column-reverse;
        }

        .filter-block {
          width: 100%;
          border-radius: 40px 0 0 0;
          background-color: $pink;
          z-index: 3;

          @media (max-width: 1280px) {
            width: 100%;
            border-radius: 0;
          }
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

  .events-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 60px;

    @media (max-width: 768px) {
      flex-direction: column;
      align-content: center;
    }

    .event {
      margin-top: 50px;

      @media (max-width: 768px) {
        margin-top: 30px;
      }
    }
  }

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 50px;

    .events-show-btn {
      padding: 17px 46px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 2px;
      cursor: pointer;
      border-radius: 100px;
      text-align: center;
      background: linear-gradient(90deg, $blue 0%, $purple 100%);
      color: $white;
      border: none;
    }
  }
}
</style>

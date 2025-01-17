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

import { useCurrentEventStore } from "~/stores/currentEventStore";

const { currentEvent } = storeToRefs(useCurrentEventStore());

const additionalSingleEventData = ref(null);
const currentEventOriginalUrl = ref("");
const dataIsLoaded = ref(false);

onMounted(() => {
  loadCurrentEventData();
});

watch(currentEvent, () => {
  loadCurrentEventData();
});

onBeforeUnmount(() => {
  currentEvent.value = {};
});

// Функция для загрузки дополнительных данных события
async function loadCurrentEventData() {
  if (!currentEvent.value?.event_page) return;

  currentEventOriginalUrl.value = currentEvent.value.event_page;

  if (currentEvent.value.site_donor === "custom-event") {
    additionalSingleEventData.value = currentEvent.value;
    dataIsLoaded.value = true;
  } else {
    await fetchEventAdditionalData();
  }
}

function filterByEventPage(dataArray, url) {
  return dataArray.filter((item) => item.inputParameters.originUrl === url);
}

async function fetchEventAdditionalData() {
  if (!currentEvent.value.site_donor) {
    console.error("siteDonor is not defined in currentEvent");
    return;
  }

  const { data, error } = await useFetch(`${API_URL}/additional-event-data`, {
    method: "POST",
    body: {
      site_donor: currentEvent.value.site_donor,
      event_page: currentEventOriginalUrl.value,
    },
  });

  if (error.value) {
    console.error("Error fetching additional event data:", error.value);
    return;
  }

  additionalSingleEventData.value = filterByEventPage(
    data.value?.data || [],
    currentEventOriginalUrl.value
  );

  dataIsLoaded.value = true;
}
</script>

<template>
  <div class="single-event-page-wrapper">
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

    <div v-if="dataIsLoaded" class="single-event-wrapper">
      <h1 v-if="currentEvent.event_title" class="title">
        {{ currentEvent.event_title }}
      </h1>
      <div class="additional-info">
        <ul>
          <li v-if="currentEvent.event_date">
            <div class="additional-info-img">
              <NuxtImg src="/images/event-card/calendar.svg" />
            </div>
            <div class="additional-info-text">
              <span class="additional-info-title">תאריך</span>
              <span class="additional-info-description">{{
                currentEvent.event_date
              }}</span>
            </div>
          </li>
          <li v-if="currentEvent.event_time">
            <div class="additional-info-img">
              <NuxtImg src="/images/event-card/clock.svg" />
            </div>
            <div class="additional-info-text">
              <span class="additional-info-title">שעה</span>
              <span class="additional-info-description">{{
                currentEvent.event_time
              }}</span>
            </div>
          </li>

          <li
            v-if="
              currentEvent.event_price ||
              additionalSingleEventData[0]?.capturedTexts?.event_price
            "
          >
            <div class="additional-info-img">
              <NuxtImg src="/images/walet.png" />
            </div>
            <div class="additional-info-text">
              <span class="additional-info-title">עֲלוּת </span>
              <span class="additional-info-description">{{
                currentEvent.event_price ||
                additionalSingleEventData[0].capturedTexts.event_price
              }}</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="img-and-description">
        <div class="event-img">
          <NuxtImg
            v-if="
              currentEvent.event_image_blob ||
              currentEvent.event_image_url ||
              additionalSingleEventData[0]?.capturedTexts?.eventImage
            "
            :src="
              currentEvent.event_image_blob ||
              currentEvent.event_image_url ||
              additionalSingleEventData[0].capturedTexts.eventImage
            "
            alt="event image"
          />
          <NuxtImg
            v-else
            src="/images/about-us-block/concert.png"
            alt="event image"
          />

          <div
            v-if="
              currentEvent.event_page ||
              additionalSingleEventData[0].inputParameters.originUrl
            "
            class="btn-wrapper"
          >
            <NuxtLink
              class="action-btn"
              target="_blank"
              :to="
                currentEvent.event_page ||
                additionalSingleEventData[0].inputParameters.originUrl
              "
              >לרכישת כרטיסים</NuxtLink
            >
          </div>
        </div>
        <div class="event-main-info">
          <span v-if="currentEvent.event_title" class="main-info-title">{{
            currentEvent.event_title
          }}</span>
          <span v-if="currentEvent.location" class="location">{{
            currentEvent.location
          }}</span>
          <div
            v-if="
              currentEvent.event_description ||
              additionalSingleEventData[0].capturedTexts.eventDescription
            "
            class="description"
          >
            <div
              v-html="
                currentEvent.event_description ||
                additionalSingleEventData[0].capturedTexts.eventDescription
              "
            ></div>
          </div>
        </div>
      </div>

      <div class="btn-wrapper">
        <a class="back-btn" @click="$router.go(-1)">חזרה לכל לאירועים</a>
      </div>
    </div>
    <div v-else class="preloader">
      <NuxtImg src="/animation-cat.gif" alt="event image" />
      <span>קבלת המידע...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.single-event-page-wrapper {
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

  .preloader {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .single-event-wrapper {
    margin: 20px auto 100px auto;
    display: flex;
    flex-direction: column;
    width: 90%;

    .title {
      text-align: center;
      font-weight: 600;
      color: $black-1000;

      @media (max-width: 768px) {
        font-size: 22px;
      }
    }

    .additional-info {
      padding: 20px;
      background: $pink;
      border-radius: 30px;

      @media (max-width: 768px) {
        padding: 5px;
      }

      ul {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        li {
          display: flex;

          .additional-info-img {
            width: 25px;

            @media (max-width: 768px) {
              width: 20px;
            }

            @media (max-width: 768px) {
              width: 15px;
            }

            img {
              width: 100%;
            }
          }

          .additional-info-text {
            span {
              display: block;
              margin-right: 5px;
            }

            .additional-info-title {
              font-weight: 600;
              font-size: 18px;

              @media (max-width: 425px) {
                font-size: 15px;
              }
            }

            .additional-info-description {
              color: $gray-800;

              @media (max-width: 425px) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .img-and-description {
      width: 100%;
      margin: 10px auto 0 auto;
      padding: 40px;
      border: 1px solid $gray-300;
      display: flex;
      border-radius: 30px;
      background: $light-gray;
      justify-content: space-evenly;

      @media (max-width: 768px) {
        padding: 10px;
        flex-direction: column;
      }

      .event-img {
        width: 45%;

        @media (max-width: 768px) {
          width: 100%;
        }

        img {
          border-radius: 30px;
          width: 100%;
          height: auto;
        }
      }

      .btn-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40px;

        .action-btn {
          background: linear-gradient(90deg, $blue 0%, $purple 100%);
          border: none;
          color: $white;
          font-weight: 300;
          padding: 19px 55px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s;

          @media (max-width: 768px) {
            font-size: 8px;
            padding: 19px 85px;
          }
        }
      }

      .event-main-info {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        width: 50%;

        @media (max-width: 768px) {
          width: 90%;
          margin: 30px 0 20px 0;
        }

        .main-info-title {
          font-size: 18px;
          font-weight: 600;
          color: $black-1000;
        }

        .description {
          margin-top: 20px;
          font-weight: 300px;
        }
      }
    }

    .btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 40px;

      .back-btn {
        padding: 10px 100px;
        background: $white;
        border: 1px solid $black-1000;
        color: $black-1000;
        font-size: 18px;
        cursor: pointer;
        border-radius: 100px;

        @media (max-width: 768px) {
          padding: 10px 80px;
          font-weight: 600;
          font-size: 16px;
        }

        &:hover {
          background-color: $blue-200;
          color: $white;
        }
      }
    }
  }
}
</style>

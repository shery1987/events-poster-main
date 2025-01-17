<script setup>
import { useCurrentEventStore } from "~/stores/currentEventStore";
const props = defineProps({
  singleEventData: Object,
});

const { currentEvent } = storeToRefs(useCurrentEventStore());
const event = props.singleEventData;

function recordEventToStore(event) {
  currentEvent.value = event;

  // Get the site from which we will get data for the event additional page
  if (currentEvent.value.event_page.includes("ironit")) {
    currentEvent.value.site_donor = "ironit";
  } else if (currentEvent.value.event_page.includes("mishkan-ashdod")) {
    currentEvent.value.site_donor = "mishkanAshdod";
  } else if (currentEvent.value.event_page.includes("mevalim")) {
    currentEvent.value.site_donor = "mevalim";
  } else {
    currentEvent.value.site_donor = "custom-event";
  }
}
</script>

<template>
  <div class="single-event">
    <div class="event-img">
      <img
        v-if="event.event_image_blob || event.event_image_url"
        :src="event.event_image_blob || event.event_image_url"
        :alt="event.eventAltText"
      />
      <NuxtImg v-else src="/images/about-us-block/concert.png" alt="image" />
    </div>

    <div class="event-data">
      <div v-if="event.event_title" class="data-point">
        <span class="point-title">
          {{ event.event_title }}
        </span>
      </div>

      <div v-if="event.event_date" class="data-point">
        <div class="data-img">
          <NuxtImg src="/images/event-card/calendar.svg" alt="calendar" />
        </div>
        <span class="point-text">
          {{ event.event_date }}
        </span>
      </div>

      <div v-if="event.event_time" class="data-point">
        <div class="data-img">
          <NuxtImg src="/images/event-card/clock.svg" alt="clock" />
        </div>
        <span class="point-text">
          {{ event.event_time }}
        </span>
      </div>

      <div v-if="event.location" class="data-point">
        <div class="data-img">
          <NuxtImg src="/images/event-card/geo.svg" alt="geo" />
        </div>
        <span class="point-text">
          {{ event.location }}
        </span>
      </div>
    </div>

    <div class="btn-wrapper">
      <NuxtLink :to="event.event_page" class="buy-ticckets-link" target="_blank"
        >לרכישה</NuxtLink
      >

      <NuxtLink
        @click="recordEventToStore(event)"
        :to="'/event-page/' + event._id"
        class="additional-info-link"
        >מידע נוסף</NuxtLink
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.single-event {
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  height: 100%;
  background-color: $light-gray;

  .event-img {
    max-width: 100%;

    img {
      width: 100%;
      height: 200px;
      border-radius: 30px 30px 0 0;
    }
  }

  .event-data {
    display: flex;
    flex-direction: column;
    padding: 10px 12px 0 12px;

    .data-point {
      display: flex;
      align-items: flex-start;

      &:not(:first-child) {
        margin-top: 10px;
      }

      .point-title {
        font-size: 20px;
        font-weight: 600;
      }

      .data-img {
        display: flex;
        width: 16px;

        img {
          width: 16px;
        }
      }

      .point-text {
        margin-right: 10px;
        font-size: 15px;
        font-weight: 400;

        @media (max-width: 1220px) {
          font-size: 12px;
        }

        @media (max-width: 394px) {
          font-size: 10px;
        }
      }
    }
  }

  .btn-wrapper {
    display: flex;
    flex-direction: column;
    padding: 20px 50px 30px 50px;
    margin-top: auto;

    a {
      font-weight: 500;
      font-size: 14px;
      padding: 12px 0;
      cursor: pointer;
      border-radius: 100px;
      text-align: center;

      @media (max-width: 425px) {
        padding: 10px 30px;
      }
    }

    .additional-info-link {
      margin-top: 10px;
      background: $white;
      border: 1px solid $black-1000;
      color: $black-1000;
    }

    .buy-ticckets-link {
      background: linear-gradient(90deg, $blue 0%, $purple 100%);
      color: $white;
    }
  }
}
</style>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
import SuccessRequestWindow from "@/components/modals/SuccessWindow";
import { FORM_VALIDATION_PATTERNS } from "@/utils/constants";
import Compressor from "compressorjs";

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

const props = defineProps({
  eventId: {
    type: String,
    required: false,
    default: "",
  },
});

const authManager = useAuthStore();

const showSuccessWindow = ref(false);
const successData = props.eventId
  ? {
      header: "Your event updated successfully!",
    }
  : {
      header: "Your event created successfully!",
    };

const formButtonClicked = ref(false);
const imageFile = ref(null);

const eventData = ref({
  event_title: "",
  event_description: "",
  location: "",
  event_price: "",
  event_page: "",
  event_date: "",
  event_time: "",
  phone: "",
  email: "",
  event_image_url: "",
  event_image_blob: "",
  approved: "",
});

const validationRules = {
  event_title: "COMMON_NOT_EMPTY_PATTERN",
  event_description: "COMMON_NOT_EMPTY_PATTERN",
  location: "COMMON_NOT_EMPTY_PATTERN",
  event_page: "URL_PATTERN",
  event_date: "COMMON_NOT_EMPTY_PATTERN",
  phone: "PHONE_PATTERN",
  email: "EMAIL_PATTERN",
  event_time: "TIME_PATTERN",
  event_price: "COMMON_NOT_EMPTY_PATTERN",
};

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

async function handleImageUpload(event) {
  imageFile.value = event.target.files[0];
  if (imageFile.value) {
    try {
      new Compressor(imageFile.value, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 400,
        success(compressedResult) {
          fileToBase64(compressedResult).then((base64String) => {
            eventData.value.event_image_blob = base64String;
          });
        },
        error(err) {
          console.error("Error compressing image:", err);
        },
      });
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  }
}

async function getSingleEventData() {
  if (props.eventId) {
    const { data: singleEvent, error } = await useFetch(
      `${API_URL}/single-event/${props.eventId}`
    );

    if (singleEvent.value) {
      eventData.value = {
        event_title: singleEvent.value.event_title,
        event_description: singleEvent.value.event_description,
        location: singleEvent.value.location,
        event_price: singleEvent.value.event_price,
        event_page: singleEvent.value.event_page,
        event_date: singleEvent.value.event_date,
        event_time: singleEvent.value.event_time,
        phone: singleEvent.value.phone,
        email: singleEvent.value.email,
        event_image_url: singleEvent.value.event_image_url,
        event_image_blob: singleEvent.value.event_image_blob || "",
      };
    } else if (error.value) {
      console.log("something went wrong:", error.value);
    }
  }
}

function getErrorMessage(field) {
  const errorMessages = {
    event_title: "Invalid title.",
    event_description: "Invalid description.",
    location: "Invalid location.",
    event_page: "Invalid URL.",
    event_date: "Invalid date.",
    phone: "Invalid phone number.",
    email: "Invalid email.",
    event_time: "Invalid time format.",
  };
  return errorMessages[field] || "Invalid input.";
}

function getPlaceholder(field) {
  const placeholders = {
    event_title: "Event title *",
    event_description: "Event description *",
    location: "Event location *",
    event_page: "Event URL *",
    event_date: "Event date*",
    phone: "Your phone number",
    event_price: "Price",
    email: "Your email",
    event_time: "Event time (10:00, 18:15 etc.) *",
    event_image_url: "Image url",
    event_image_blob: "Event image",
  };
  return placeholders[field] || "Enter value *";
}

const isFieldValid = (field) => {
  const patternKey = validationRules[field];
  const pattern = FORM_VALIDATION_PATTERNS[patternKey];
  const fieldValue = eventData.value[field];

  return pattern ? pattern.test(fieldValue) : false;
};

const isFormValid = computed(() => {
  return Object.keys(validationRules).every((field) => isFieldValid(field));
});

async function createEvent() {
  formButtonClicked.value = true;
  eventData.value.approved = authManager.loggedIn;

  if (isFormValid.value) {
    console.log("Size of image blob:", eventData.value.event_image_blob.length);
    if (!imageFile.value) {
      eventData.value.event_image_blob = "";
    }

    try {
      console.log(eventData.value);
      const { data: newEventRequest, error } = await useFetch(
        `${API_URL}/create-event`,
        {
          method: "POST",
          body: JSON.stringify(eventData.value),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (newEventRequest.value) {
        eventData.value = {};
        formButtonClicked.value = false;
        showSuccessWindow.value = true;
      } else if (error.value) {
        console.log("something went wrong:", error.value);
      }
    } catch (err) {
      console.error("Error creating event:", err);
    }
  }
}

function hideSuccessWindow() {
  showSuccessWindow.value = false;
}

onMounted(() => {
  if (props.eventId) {
    getSingleEventData();
  }
});
</script>

<template>
  <div class="event-form-wrapper">
    <div class="event-form" v-if="!showSuccessWindow">
      <div class="form-title">
        <h1 v-if="props.eventId">
          עריכת אירוע: <span>{{ eventData.event_title }}</span>
        </h1>
        <h1 v-else>צור אירוע</h1>
      </div>

      <div class="event-form-content">
        <div
          class="input-wrapper"
          v-for="field in Object.keys(validationRules).filter(
            (f) => f !== 'event_description'
          )"
          :key="field"
        >
          <span
            v-if="!isFieldValid(field) && formButtonClicked"
            class="input-error-notification"
          >
            {{ getErrorMessage(field) }}
          </span>
          <input
            v-model="eventData[field]"
            :type="field === 'event_date' ? 'date' : 'text'"
            :placeholder="getPlaceholder(field)"
            :class="
              field === 'event_date' || field === 'event_time'
                ? 'date-input'
                : ''
            "
          />
        </div>

        <input
          v-model="eventData.event_image_url"
          type="text"
          :placeholder="getPlaceholder('event_image_url')"
          class="image-url-input"
        />

        <input type="file" @change="handleImageUpload" accept="image/*" />

        <div v-if="eventData.event_image_blob">
          <img
            :src="eventData.event_image_blob"
            alt="Event Image"
            style="max-width: 200px"
          />
        </div>
      </div>

      <textarea
        v-model="eventData.event_description"
        :placeholder="getPlaceholder('event_description')"
        rows="5"
        class="textarea-input"
      ></textarea>

      <button class="blue-btn" @click.prevent="createEvent">
        {{ props.eventId ? "עדכון האירוע" : "צור אירוע" }}
      </button>
    </div>

    <SuccessRequestWindow
      v-else
      @hide-success-window="hideSuccessWindow"
      :data="successData"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.event-form-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }

  .event-form {
    margin: 50px auto;
    width: 70%;
    padding: 40px 0;
    background-color: $light-gray;
    border-radius: 30px;
    text-align: center;

    @media (max-width: 1440px) {
      padding: 30px 100px;
    }

    @media (max-width: 768px) {
      width: 100%;
      padding: 40px 0;
      border-radius: 0;
    }

    .form-title {
      h1 {
        font-size: 48px;
        color: $black-1000;
        margin: 10px auto;
        font-weight: 300;

        @media (max-width: 1440px) {
          font-size: 48px;
          margin: 10px 0 0 0;
        }

        @media (max-width: 768px) {
          font-size: 20px;
        }

        span {
          height: 22px;
          font-weight: 500;
          overflow-wrap: break-word;
        }
      }
    }

    .event-form-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      margin-top: 40px;

      @media (max-width: 1440px) {
        margin-top: 20px;
      }

      @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
      }

      .input-wrapper {
        width: 45%;
        flex: 1 1 calc(50% - 10px);
        box-sizing: border-box;

        @media (max-width: 1024px) {
          width: 100%;
        }

        @media (max-width: 768px) {
          width: 95%;
        }
      }

      input,
      select {
        margin-bottom: 12px;
        border-radius: 30px;
      }

      input {
        border: 1px solid $gray-paragraph;
        width: 100%;
        padding: 20px 60px;
        color: $gray-paragraph;
        font-size: 14px;
        background-color: $white;

        @media (max-width: 768px) {
          width: 95%;
          padding: 15px 40px;
        }
      }

      .input-error-notification {
        float: left;
      }
    }

    textarea {
      border-radius: 30px;
      margin-top: 10px;
      padding: 20px 60px;

      @media (max-width: 768px) {
        width: 95%;
      }
    }

    .blue-btn {
      font-weight: 300;
      font-size: 14px;
      margin: 30px auto 0 auto;
      padding: 18px 0;
      border-radius: 100px;
      background: linear-gradient(90deg, $blue 0%, $purple 100%);
      width: 60%;
      color: $white;
      transition: transform 0.2s;

      @media (max-width: 768px) {
        width: 300px;
        padding: 15px 0;
        margin: 15px auto 0 auto;
      }
    }

    .confirm-information {
      img {
        width: 60px;
        margin-top: 25px;
      }
    }
  }
}
</style>

<script setup>
useHead({
  title: "Pickevent - event service registration",
  meta: [
    {
      name: "Event service registration",
      content: "Registration on pickevent, all type of events in one place",
    },
  ],
});

const config = useRuntimeConfig();
const API_URL = config.public.API_URL;

import { validateFormField } from "@/utils/index";

const formButtonClicked = ref(false);
const userCredentialsSentSuccessful = ref(false);

const userCreds = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

// VALIDATION
const isFirstNameValid = computed(() => {
  return validateFormField(
    userCreds.value.first_name,
    "COMMON_NOT_EMPTY_PATTERN"
  );
});

const isLastNameValid = computed(() => {
  return validateFormField(
    userCreds.value.last_name,
    "COMMON_NOT_EMPTY_PATTERN"
  );
});

const isEmailValid = computed(() => {
  return validateFormField(userCreds.value.email, "EMAIL_PATTERN");
});

const isPasswordValid = computed(() => {
  return validateFormField(userCreds.value.password, "PASSWORD_PATTERN");
});

function registerUser() {
  formButtonClicked.value = true;
  if (isFirstNameValid.value && isEmailValid.value && isPasswordValid.value) {
    createRequestToRegistrationApi();
  }
}

async function createRequestToRegistrationApi() {
  const { data: newUserCreating, error } = await useFetch(
    `${API_URL}/sign-up`,
    {
      method: "post",
      body: JSON.stringify(userCreds.value),
    }
  );

  if (newUserCreating.value) {
    console.log("Sign-up went successfully");
    userCredentialsSentSuccessful.value = true;
  } else if (error.value) {
    // should to think how better to show errors
    console.log("something really wrong:" + error.value);
  }
}
</script>

<template>
  <div class="sign-in-wrapper">
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

    <div class="content-wrapper">
      <div class="form-wrapper">
        <h1>הירשם</h1>

        <div
          v-if="!userCredentialsSentSuccessful"
          class="sign-up-field-section"
        >
          <span
            v-if="!isFirstNameValid && formButtonClicked"
            class="input-error-notification"
            >נא להזין שם חוקי.</span
          >
          <input
            id="first-name"
            v-model="userCreds.first_name"
            type="text"
            placeholder="שֵׁם *"
          />

          <span
            v-if="!isLastNameValid && formButtonClicked"
            class="input-error-notification"
            >נא להזין שם משפחה חוקי.</span
          >
          <input
            id="last-name"
            v-model="userCreds.last_name"
            type="text"
            placeholder="שֵׁם מִשׁפָּחָה *"
          />

          <span
            v-if="!isEmailValid && formButtonClicked"
            class="input-error-notification"
          >
            נא להזין כתובת אימייל חוקית.
          </span>
          <input
            id="email"
            v-model="userCreds.email"
            type="email"
            name="email"
            placeholder="אֶלֶקטרוֹנִי *"
          />

          <span
            v-if="!isPasswordValid && formButtonClicked"
            class="input-error-notification"
          >
            נא להזין סיסמה חוקית.
          </span>
          <input
            id="password"
            v-model="userCreds.password"
            type="password"
            name="password"
            placeholder="סיסמה (8 תווים או יותר) *"
          />

          <button class="blue-btn" @click="registerUser()">
            צור את החשבון שלי
          </button>
          <p>כבר יש לך חשבון? <NuxtLink to="/sign-in">התחבר</NuxtLink></p>
        </div>

        <div v-else class="confirm-information">
          <NuxtImg
            src="https://i.ibb.co/6HY86R7/checkmark.png"
            title="green-checkmark"
          />
          <h3>מזל טוב, יצרת חשבון.</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.sign-in-wrapper {
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
  .content-wrapper {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      width: 100%;
    }

    .form-wrapper {
      margin: 50px auto;
      padding: 40px 120px;
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
      }

      .sign-up-field-section {
        display: flex;
        flex-direction: column;
        margin-top: 40px;

        @media (max-width: 1440px) {
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          align-items: center;
        }

        input,
        select,
        textarea {
          margin-bottom: 12px;
        }

        input {
          border: 1px solid $gray-paragraph;
          width: 480px;
          border-radius: 30px;
          padding: 25px 60px 25px 0;
          color: $gray-paragraph;
          font-size: 14px;

          &:not(:first-child) {
            margin-top: 30px;
          }

          @media (max-width: 1440px) {
            width: 380px;
            padding: 15px 40px 15px 0;

            &:not(:first-child) {
              margin-top: 15px;
            }
          }

          @media (max-width: 420px) {
            width: 95%;
          }
        }

        .input-error-notification {
          float: left;
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

      p {
        margin-top: 20px;

        @media (max-width: 768px) {
          margin-top: 20px;
        }
        a {
          text-decoration: none;
          color: $blue;
          font-weight: 600;
        }
      }
    }
  }
}
</style>

<script setup>
import { iconCollection } from "~/utils/collections";
</script>

<template>
  <div class="about-us-block">
    <div class="content-wrapper">
      <div class="images-block">
        <span class="openair">
          <NuxtImg src="/images/about-us-block/openair.png" alt="openair" />
        </span>
        <span class="concert">
          <NuxtImg src="/images/about-us-block/concert.png" alt="concert" />
        </span>
        <span class="business-event">
          <NuxtImg
            src="/images/about-us-block/business-event.png"
            alt="business-event"
          />
        </span>
        <span class="fireshow">
          <NuxtImg src="/images/about-us-block/fireshow.png" alt="fireshow" />
        </span>
      </div>

      <div class="description-block">
        <p class="pre-header-block">אודותינו</p>
        <h2>כל האירועים במקום אחד</h2>
        <p class="short-description">
        Pickevent הוא אתר המרכז את כל האירועים במקום אחד.<br/><br/>
האתר מאפשר למשתמשים לגלות בקלות אירועים מגוונים, כולל פעילויות לילדים, הופעות, סדנאות ועוד.<br/><br/>
הממשק הנוח והידידותי מספק גישה מהירה לכל הפרטים החשובים על האירועים הקרובים.<br/><br/>
Pickevent שם דגש על חוויית משתמש איכותית ושקיפות במידע הניתן.<br/><br/>
הצטרפו אלינו והישארו מעודכנים בכל מה שקורה סביבכם!<br/><br/>
        </p>
        <div class="icons-container">
          <div
            v-for="(value, key) in iconCollection"
            :key="key"
            class="single-icon-block"
          >
            <NuxtImg
              :src="`/images/about-us-block/icons/${iconCollection[key]}.svg`"
            />
            <span>{{ key }}</span>
          </div>
          <NuxtLink class="link" to="/create-event"> צור אירוע</NuxtLink>
        </div>
      </div>

      <div class="mobile-images-block">
        <NuxtImg src="/images/about-us-block/concert.png" alt="concert" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.about-us-block {
  background-color: $pink;
  padding: 130px 0 260px 0;
  position: relative;

  @media (max-width: 1280px) {
    padding: 130px 0 120px 0;
  }

  @media (max-width: 768px) {
    padding: 40px 0;
  }

  .content-wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    .description-block {
      width: 45%;

      @media (max-width: 1280px) {
        width: 60%;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      @media (max-width: 768px) {
        width: 95%;
        text-align: center;
      }

      .pre-header-block {
        color: $purple;
        font-size: 20px;
        font-weight: 500;
        margin: 0;
      }

      h2 {
        margin: 10px 0;
        font-size: 48px;
        color: $black-1000;
        line-height: 50px;
        font-weight: 300;

        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 30px;
          margin-top: 10px 0;
        }
      }

      p {
        @media (max-width: 768px) {
          font-size: 10px;
          margin: 0;
        }
      }

      .short-description {
        color: $gray-paragraph;
      }

      .icons-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        .single-icon-block {
          margin-top: 60px;
          width: 30%;
          height: 50px;
          display: flex;

          @media (max-width: 768px) {
            margin-top: 35px;
            width: 30%;
          }

          @media (max-width: 445px) {
            margin-top: 35px;
            width: 45%;
          }

          span {
            color: $gray-paragraph;
            margin: auto 11px auto 0;

            @media (max-width: 768px) {
              margin: auto 5px auto 0;
              font-size: 10px;
            }
          }
        }
      }

      .link {
        background: linear-gradient(90deg, $blue 0%, $purple 100%);
        border: none;
        color: $white;
        font-weight: 300;
        padding: 19px 55px;
        border-radius: 100px;
        cursor: pointer;
        transition: transform 0.2s;
        margin-top: 80px;

        @media (max-width: 768px) {
          margin: 35px auto 0 auto;
          font-size: 8px;
          padding: 10px 35px;
        }
      }
    }

    .mobile-images-block {
      display: none;
      width: 100%;
      align-items: center;

      @media (max-width: 768px) {
        display: flex;
        justify-content: center;
      }

      img {
        position: inherit;
        width: 286px;
        border-radius: 20px;
        margin-bottom: 35px;
      }
    }

    .images-block {
      width: 45%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
      margin-top: 35px;

      @media (max-width: 1280px) {
        margin-top: 0;
        width: 35%;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      @media (max-width: 768px) {
        width: 100%;
      }

      img {
        border-radius: 20px;
        width: 256px;

        @media (max-width: 1400px) {
          width: 230px;
        }

        @media (max-width: 1280px) {
          width: 256px;
        }

        @media (max-width: 768px) {
          width: 286px;
        }
      }

      .openair {
        @media (max-width: 1280px) {
          display: none;
        }
      }

      .concert {
        margin-top: -35px;

        @media (max-width: 1280px) {
          margin-top: 0;
        }

        @media (max-width: 768px) {
          display: none;
        }
      }

      .business-event {
        margin-top: 15px;

        @media (max-width: 1280px) {
          display: none;
        }
      }

      .fireshow {
        margin-top: -105px;

        @media (max-width: 768px) {
          margin-top: 50px;
        }
      }
    }
  }
}
</style>

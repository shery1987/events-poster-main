<script setup>
useHead({
  title: "Pickevent - עלינו",
  meta: [
    {
      name: "description",
      content: "אתר עם כל אירועי התרבות בישראל",
    },
  ],
});
</script>

<template>
  <div class="about-us-wrapper">
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

    <div class="about-us-block">
      <div class="content-wrapper">
        <div class="images-block">
          <span class="dj">
            <NuxtImg src="/images/about-us-block/dj.png" alt="dj" />
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

          <span class="asia-girl">
            <NuxtImg
              src="/images/about-us-block/asia-girl.png"
              alt="asia-girl"
            />
          </span>
        </div>

        <div class="description-block">
          <p class="pre-header-block">עלינו</p>
          <h2>ברוכים הבאים לפלטפורמה המובילה לאירועים בעיר!</h2>
          <p>כאן תמצאו את כל מה שמתרחש בעיר, במקום אחד נוח ומרכזי.</p>

          <p>
            אנו אוספים עבורכם מידע ממגוון רחב של מקורות ומוסדות עירוניים, כדי
            שתהיו הראשונים לדעת על האירועים הכי חמים – מתערוכות ייחודיות, דרך
            הופעות מרגשות ועד סדנאות מעשירות ופעילויות לכל המשפחה.
          </p>

          <span class="mobile-images-block">
            <NuxtImg src="/images/about-us-block/dj.png" alt="dj" />
          </span>

          <span class="mobile-images-block mobile-concert">
            <NuxtImg
              src="/images/about-us-block/business-event.png"
              alt="business-event"
            />
          </span>

          <p>
            עם מנוע חיפוש חכם ומתקדם, אתם במרחק קליק מלמצוא את האירועים שמתאימים
            בדיוק לכם. חפשו לפי תאריך, מיקום או קהל יעד, וגילו את האפשרויות
            האינסופיות שהעיר מציעה.
          </p>
          <p>
            הצטרפו לאלפי המשתמשים שכבר הופכים את החיפוש אחר אירועים לחוויה מהנה
            ומדויקת, ותבטיחו לעצמכם שלא תפספסו אף רגע חשוב. כי אצלנו, כל רגע הוא
            הזדמנות לחוויה חדשה!
          </p>

          <div class="mobile-images-block">
            <NuxtImg src="/images/about-us-block/concert.png" alt="concert" />
          </div>

          <span class="mobile-images-block">
            <NuxtImg
              src="/images/about-us-block/asia-girl.png"
              alt="asia-girl"
            />
          </span>
          <div class="btn-wrapper">
            <NuxtLink class="link" to="/create-event"> קרא עוד </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="additional-info-block">
      <div class="content-wrapper">
        <p class="pre-header-block">התרבות שלנו</p>
        <h3>למידע נוסף על החברה שלנו</h3>

        <div class="additional-info-content">
          <div class="additional-info-block">
            <div class="h5-img">
              <div class="img-wrapper">
                <NuxtImg src="/images/additional-info/darts.png" alt="darts" />
              </div>
              <h5>הקריירה שלנו</h5>
            </div>
            <p>
              אנו אוספים עבורכם מידע ממגוון רחב של מקורות ומוסדות עירוניים, כדי
              שתהיו הראשונים לדעת על האירועים הכי חמים – מתערוכות ייחודיות, דרך
              הופעות מרגשות ועד סדנאות מעשירות ופעילויות לכל המשפחה.
            </p>
          </div>

          <div class="additional-info-block">
            <div class="h5-img">
              <div class="img-wrapper">
                <NuxtImg src="/images/additional-info/deal.png" alt="deal" />
              </div>
              <h5>הקריירה שלנו</h5>
            </div>
            <p>
              אנו אוספים עבורכם מידע ממגוון רחב של מקורות ומוסדות עירוניים, כדי
              שתהיו הראשונים לדעת על האירועים הכי חמים – מתערוכות ייחודיות, דרך
              הופעות מרגשות ועד סדנאות מעשירות ופעילויות לכל המשפחה.
            </p>
          </div>

          <div class="additional-info-block">
            <div class="h5-img">
              <div class="img-wrapper">
                <NuxtImg src="/images/additional-info/team.png" alt="team" />
              </div>
              <h5>הקריירה שלנו</h5>
            </div>
            <p>
              אנו אוספים עבורכם מידע ממגוון רחב של מקורות ומוסדות עירוניים, כדי
              שתהיו הראשונים לדעת על האירועים הכי חמים – מתערוכות ייחודיות, דרך
              הופעות מרגשות ועד סדנאות מעשירות ופעילויות לכל המשפחה.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";
.about-us-wrapper {
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

  .about-us-block {
    background-color: $pink;
    padding: 130px 0;
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
        width: 50%;

        @media (max-width: 1280px) {
          width: 65%;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        @media (max-width: 1280px) {
          width: 60%;
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

          @media (max-width: 1280px) {
            font-size: 38px;
          }

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

        .btn-wrapper {
          margin-top: 80px;
          padding: 20px 0;

          @media (max-width: 768px) {
            margin-top: 20px !important;
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

            @media (max-width: 768px) {
              font-size: 8px;
              padding: 19px 85px;
            }
          }
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
          width: 30%;
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

        .dj {
          @media (max-width: 1280px) {
            display: none;
          }
        }

        .concert {
          margin-top: -35px;

          @media (max-width: 1280px) {
            margin: 0 0 120px 0;
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

        .asia-girl {
          margin-top: -105px;

          @media (max-width: 768px) {
            display: none;
          }
        }
      }

      .mobile-images-block {
        display: none;
        width: 100%;
        align-items: center;
        margin-top: 30px;

        @media (max-width: 768px) {
          display: block;
          justify-content: center;
        }

        img {
          position: inherit;
          width: 286px;
          border-radius: 20px;
        }
      }

      .mobile-concert {
        margin-bottom: 30px;
      }
    }
  }

  .additional-info-block {
    background-color: $light-gray;
    padding: 100px 0;

    @media (max-width: 768px) {
      padding: 60px 0;
    }

    .content-wrapper {
      .pre-header-block {
        text-align: center;
        color: $purple;

        @media (max-width: 768px) {
          font-size: 10px;
          margin: 0;
        }
      }

      h3 {
        text-align: center;
        margin: 10px 0 60px 0;
        font-size: 48px;
        color: $black-1000;
        line-height: 50px;
        font-weight: 600;

        @media (max-width: 1280px) {
          font-size: 38px;
        }

        @media (max-width: 768px) {
          font-size: 20px;
          line-height: 30px;
          margin-bototm: 20px;
        }
      }

      .additional-info-content {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media (max-width: 768px) {
          flex-direction: column;
        }

        .additional-info-block {
          width: 30%;
          padding: 60px 40px;
          border-radius: 30px;
          background-color: $white;

          @media (max-width: 1024px) {
            width: 32%;
          }

          @media (max-width: 768px) {
            width: 90%;

            &:not(:first-child) {
              margin-top: 22px;
            }
          }

          .h5-img {
            display: flex;
            flex-direction: column;

            @media (max-width: 768px) {
              align-items: center;
              flex-direction: row;
            }

            .img-wrapper {
              @media (max-width: 440px) {
                width: 40%;
              }
              img {
                margin-left: 30px;
                width: 70px;
              }
            }

            h5 {
              font-size: 24px;
              margin: 10px 0;
            }
          }
        }
      }
    }
  }
}
</style>

<script setup>
import { useAuthStore } from "@/stores/useAuthStore";
const authManager = useAuthStore();

const mobileMenuVisibility = ref(false);

function showHideMobileMenu() {
  mobileMenuVisibility.value = mobileMenuVisibility.value === false;
}

function hideMobileMenu() {
  mobileMenuVisibility.value = false;
}
</script>

<template>
  <header>
    <nav>
      <div class="content-wrapper">
        <div class="logo">
          <div class="logo-wrapper">
            <NuxtLink to="/">
              <NuxtImg src="/images/logo.svg" />
            </NuxtLink>
          </div>
        </div>

        <ul class="desktop-nav">
          <li>
            <NuxtLink
              v-if="authManager.loggedIn"
              class="nav-link"
              to="/admin-panel"
              >פאנל ניהול</NuxtLink
            >
          </li>
          <li><NuxtLink class="nav-link" to="/about-us">אודות</NuxtLink></li>
          <li>
            <NuxtLink class="nav-link" to="/events">רשימת אירועים</NuxtLink>
          </li>
        </ul>

        <div class="nav-btn-wrapper">
          <NuxtLink class="create-event-link" to="/create-event"
            >צור אירוע</NuxtLink
          >
        </div>

        <NuxtImg
          v-if="!mobileMenuVisibility"
          src="/images/burger-menu.svg"
          class="menu-icon"
          @click="showHideMobileMenu"
        />
      </div>

      <div
        class="hidden-mobile-nav"
        :class="{ 'mobile-menu': mobileMenuVisibility }"
      >
        <div class="top-mobile-menu">
          <ul @click="hideMobileMenu">
            <li><NuxtLink to="/about-us">עלינו</NuxtLink></li>
            <li><NuxtLink to="/events">רשימת אירועים</NuxtLink></li>
            <li><NuxtLink to="/about-us">עלינו</NuxtLink></li>
            <li>
              <NuxtLink to="/create-event" class="create-event-link"
                >צור אירוע</NuxtLink
              >
            </li>
          </ul>
          <NuxtImg
            @click="showHideMobileMenu"
            src="/images/white-cross.svg"
            alt="cross"
          />
        </div>

        <div class="mobile-social-icons">
            <!-- <NuxtImg src="/images/whatsapp.png" />-->
            <a href="https://www.instagram.com/pickevent0/" target="_blank"><NuxtImg src="/images/instagram.png" /></a>
            <a href="https://www.facebook.com/groups/ashdodfun" target="_blank"><NuxtImg src="/images/facebook.png" /></a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/_variables.scss";

.content-wrapper {
  display: flex;
  justify-content: space-between;
}
header {
  z-index: 10;
  width: 100%;
  nav {
    padding: 30px 0;
    background-color: transparent;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
    }

    .hidden-mobile-nav {
      display: none;
    }

    .mobile-menu {
      z-index: 5;
      display: flex;
      flex-direction: column;
      position: absolute;
      background-color: $black-1000;
      width: 100%;
      top: 0px;
      align-items: flex-start;
      justify-content: space-between;
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.5);
      padding: 45px 45px 75vh 45px;

      .top-mobile-menu {
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: space-between;
        ul {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          li {
            margin-top: 30px;

            a {
              font-size: 20px;
              color: $white;

              &:hover {
                color: $purple;
              }
            }
          }
        }

        img {
          width: 22px;
        }
      }

      .mobile-social-icons {
        display: none;
        margin-top: 40px;

        @media (max-width: 768px) {
          display: block;
        }

        img {
          width: 55px;
          height: 55px;

          &:not(:first-child) {
            margin-right: 20px;
          }
        }
      }
    }

    .content-wrapper {
      justify-content: flex-start;
      align-items: center;

      @media (max-width: 768px) {
        justify-content: space-between;
      }

      .menu-icon {
        width: 38px;
        display: none;
        cursor: pointer;
        z-index: 3;

        @media (max-width: 768px) {
          display: block;
        }
      }

      .logo {
        width: 45%;

        @media (max-width: 768px) {
          width: 70%;
        }

        .logo-wrapper {
          position: relative;
          width: 200px;

          img {
            width: 100%;
          }
        }
      }

      .desktop-nav {
        display: flex;
        width: 25%;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 990px) {
          width: 25%;
        }

        @media (max-width: 768px) {
          display: none;
        }

        li {
          .nav-link {
            font-size: 18px;
            color: $white;
            font-weight: 600;
            &:hover {
              color: $purple;
            }
          }
        }
      }

      .nav-btn-wrapper {
        width: 25%;
        display: flex;
        justify-content: flex-end;

        @media (max-width: 768px) {
          display: none;
        }

        .create-event-link {
          background: linear-gradient(90deg, $blue 0%, $purple 100%);
          border: none;
          color: $white;
          font-weight: 300;
          font-size: 20px;
          padding: 19px 35px;
          border-radius: 100px;
          cursor: pointer;
          transition: transform 0.2s;
        }
      }
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="hero-page">
      <div class="hero-left">
        <img src="@/assets/UFood_LogoHero.svg" class="hero-logo" />
        <p style="color: #909090; margin-top: 1.875rem; margin-bottom: 2rem">
          From cozy cafes to upscale fine dining, we've got it all.
          <br />Find your next favorite spot with ease. Join UFood and let the
          feast begin!
        </p>

        <button class="rounded-button">Find a restaurant</button>
        <img src="@/assets/rating_stars.svg" />
        <p style="font-weight: 800; margin-top: 0.5rem">5 stars rating</p>
        <p style="color: var(--light-grey)">based on 1731 reviews</p>
      </div>
      <img src="@/assets/Hero_cover.svg" class="hero-img" />
    </div>
  </div>
</template>

<script></script>

<style>
.hero-page {
  width: 100%;
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
}
.hero-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-logo {
  width: 100%;
}
.hero-img {
  width: 40%;
  float: right;
}

.rounded-button {
  background-color: black;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--normal-font-size);
  cursor: pointer;
  border-radius: 12.5rem;
  padding: 0.6rem 1.3rem;
  margin-top: 1.875rem;
  margin-bottom: 3rem;
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 592px) {
  .hero-img {
    display: none;
  }
}

@media screen and (max-width: 320px) {
}
</style>

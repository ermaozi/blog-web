<template>
  <base-section id="404">
    <base-heading title="404" />

    <base-subheading
      class="primary--text"
      title="您请求的页面被大龙吃掉了"
    />

    <base-subheading
      space="8"
      title="目前正在教育大龙"
    />

    <!-- <base-img
      :src="require('@/assets/logo.svg')"
      class="mx-auto mb-12"
      contain
      height="350"
      width="250"
    /> -->

    <!-- <div class="text-center">
      <base-btn :to="{ name: 'Home' }">
        Get me Out of Here
      </base-btn>
    </div> -->
  </base-section>
</template>

<script>
  export default {
    name: 'FourOhFour',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>

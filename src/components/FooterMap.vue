<template>
  <div class="footer">
    <div class="google-map">
      <GmapMap
          :center="center"
          :zoom="14"
          :options="options"
          class="map-style"
        >
        <GmapMarker
          :icon="{
            url: require('../assets/images/pin.png'),
            scaledSize: { width: 40, height: 40 },
          }"
          :position="center"
          :clickable="false"
          :draggable="false"
        />
      </GmapMap>
      <div class="contact">
          <p>service@hexhotel.com</p>
          <p>+886 7 890 1234</p>
          <p>{{$t('footer.address')}}</p>
      </div>
    </div>
    <div class="owner-right">
        <span class="container">
          {{$t('footer.rights')}}<a href="https://challenge.thef2e.com/user/2760?schedule=3948#works-3948">Juniwu</a>
        </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      marker: { position: { lat: 22.6253594, lng: 120.2868338 }, infoText:<h3>Hello World</h3> },
      center: { lat: 22.6245137, lng: 120.2863006 },
      options: {
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUI: false,
        scrollwheel: false,
        clickableIcons: false,
        draggable:false,
        zoomControl:false,
        mapId: 'ae25603143cf1932',
      },
    };
  },
};
</script>

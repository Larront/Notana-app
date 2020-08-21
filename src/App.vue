<template>
  <div id="app">
    <div class="columns">
      <pdf-viewer class="column"></pdf-viewer>
      <div class="column">
          <init-tracker></init-tracker>
          <music-player></music-player>
      </div>
    </div>
  </div>
</template>

<script>
import PdfViewer from '@/components/PdfViewer'
import InitTracker from '@/components/InitTracker'
import MusicPlayer from '@/components/MusicPlayer'

export default {
  name: 'App',
  components: {
      PdfViewer,
      InitTracker,
      MusicPlayer,
    
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

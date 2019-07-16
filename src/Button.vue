<template>
  <div ref="idvpn-button"></div>
</template>

<script>
import appendButton from './Button/append';

export default {
  name: 'idvpn-button',
  props: {
    client: { type: Object, default: null },
    isLoggedIn: { type: Boolean, default: false }
  },
  mounted: function() {
    appendButton(this.$refs['idvpn-button'], this.isLoggedIn, this.client);
  },
  watch: {
    isLoggedIn: {
      handler: function() {
        appendButton(this.$refs['idvpn-button'], this.isLoggedIn, this.client);
      }
    }
  }
};
</script>

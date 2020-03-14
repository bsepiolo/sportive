module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/assets/css/scss/3_abstracts/_variables.scss";
        `
      }
    }
  }
};
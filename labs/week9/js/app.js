var app = new Vue({
  el: "#app",
  mounted: function() {
    axios.get("js/breakfast.json").then(response => {
      this.breakfastFoods = response.data.breakfastFoods;
    });
  },
  data: {
    breakfastFoods: []
  },
  methods: {}
});

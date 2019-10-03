Vue.component("student-card", {
  props: ["student", "isactive"],
  // toggles the true or false of active to make it appear and disappear in terms of styling
  template:
    "<div class='student' v-bind:class='{ cardActive:isactive, cardOut:!isactive }'>{{ student.name }} <br> skill level: {{ student.skill }} <br> fights won: {{student.fightsWon}} <br> Stand Name:  <br>{{ student.standName }}</div>"
});

var app = new Vue({
  el: "#app",
  data: {
    // array of students
    students: [
      { name: "Josuke", skill: 8, fightsWon: 8, standName: "Shining Diamond" },
      { name: "Koichi", skill: 6, fightsWon: 5, standName: "Reverb" },
      { name: "Okuyasu", skill: 7, fightsWon: 4, standName: "The Hand" }
    ],
    // declares the starting student and their starting info
    currentStudent: {
      name: "Josuke",
      skill: 8,
      fightsWon: 8,
      standName: "Shining Diamond"
    },
    // creates the starting number for the order of students to go through
    curStudentId: 0,
    // card appears if true
    cardActive: true
  },
  methods: {
    arrowClicked: function() {
      this.cardActive = !this.cardActive;

      setTimeout(() => {
        //adds one to the students skill
        this.currentStudent.skill++;

        // continues through each of the students in the array
        this.curStudentId++;

        // restarts the if loop if it goes past the length
        if (this.curStudentId >= this.students.length) {
          this.curStudentId = 0;
        }

        this.currentStudent = this.students[this.curStudentId];

        //animation trigger
        this.cardActive = !this.cardActive;
      }, 300);
    },

    arrowClickedBack: function() {
      this.cardActive = !this.cardActive;
      setTimeout(() => {
        this.currentStudent.fightsWon--;
        this.curStudentId--;
        if (this.curStudentId < 0) {
          this.curStudentId = 2;
        }

        this.currentStudent = this.students[this.curStudentId];

        this.cardActive = !this.cardActive;
      }, 300);
    }
  }
});

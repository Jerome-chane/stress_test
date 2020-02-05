let myBookStore = new Vue({
  el: "#myBookStore",
  data: {
    books: [],
    research: "",
    selectedLanguage: "",
    filtered: []
  },
  methods: {
    getData() {
      fetch("https://api.myjson.com/bins/zyv02")
        .then(response => response.json())
        .then(newData => {
          this.books = newData.books;
          this.filt();
        })
        .catch(error => console.log(`Oops, Error`, error.message));
    }, // End of fetch function

    filt() {
      this.filtered = [];
      for (let criteria in this.books) {
        if (this.research === "") {
          this.filtered.push(this.books[criteria]);
        } else if (
          this.books[criteria].language.includes(this.selectedLanguage)
        ) {
          if (
            this.books[criteria].description
              .toLowerCase()
              .includes(this.research.toLowerCase()) ||
            this.books[criteria].title
              .toLowerCase()
              .includes(this.research.toLowerCase())
          ) {
            this.filtered.push(this.books[criteria]);
          }
        }
      } // loop
      return this.filtered;
    }
  }, // End of Methods
  computed: {
    // filtered() {
    // return this.books.filter((book) => {                                            // active search bar filter
    // return book.description.toLowerCase().includes(this.research.toLowerCase())
    // })
    // }, // filtered
    // langFilter() {
    //     return this.books.filter((lang) => {
    //         console.log(this.language)                                      // active lang filter
    //         return lang.language.includes(this.selectedLanguage)
    //     })
    // },
  }, //  Computed

  created: function() {
    this.getData();
  } // Created
}); // End of Vue instance

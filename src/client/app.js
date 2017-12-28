const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

const nav = new Vue({
  el: '#nav',
  data: {
    title: 'Talmud',
    pages: [
      {text: 'Explore'},
      {text: 'Vote'}
    ]
  }
})

const urlBase = 'https://5ffb628063ea2f0017bdb0ef.mockapi.io/'


fetch(urlBase + '/users')
.then( response => response.json())
.then (data => console.log(data));
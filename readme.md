#Стартовый модуль React 2020

https://codesandbox.io/s/great-lovelace-6s3i5

https://codepen.io/hartzis/pen/VvNGZP

https://www.npmjs.com/package/react-images-upload
https://www.npmjs.com/package/react-image-crop


Обработка изображений ReactJS — NodeJS
https://habr.com/ru/post/491548/


"react-images-upload": "^1.2.8",

https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
http://jsfiddle.net/influenztial/qy7h5/


UI компоненты
mui, reakit, semantic ui, ant design, bootstrap, grommet, rebass, chakra,
Tailwind, fluent design

Юзаю 
материал или reakit
elastic ui
TailwindUI

плагин @fullhuman/postcss-purgecss который неиспользуемый выкидывает

npm i -D @fullhuman/postcss-purgecss
const purgecss = require('@fullhuman/postcss-purgecss')
postcss([
  purgecss({
    content: ['./src/**/*.html']
  })
])
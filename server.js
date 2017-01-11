const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)

app.use(require('connect-livereload')({
  port: 35729
}))

app.use(express['static']('./.www'))
app.use('/generated', express['static']('./.generated'))

const port = app.get('port')

app.listen(port, () => console.log('The app is running at: http://localhost:' + port))

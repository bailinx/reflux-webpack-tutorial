var koa = require('koa')
var body = require('koa-body')
var route = require('koa-route')
var static = require('koa-static')
var views = require('koa-views')
var gzip = require('koa-gzip')
var config = require('./config/')
var routes = require('./routes/')
var app = koa()

app.use(gzip())
app.use(body())
//app.use(favicon(__dirname + '/favicon.ico'))
app.use(views('views', {
    map: {
        html: 'ejs',
        js: 'ejs'
    }
}))
app.use(static('./public'))
routes(app)

app.on('error', function(err) {
    console.error('Internal Server Error', err)
})

app.listen(config.port, function() {
    console.info('Server listen at:', config.port)
})

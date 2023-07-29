const request = require('request')
const geoCodes = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

// Define Paths for Express config
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup Static directory to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Pathan'
    })
})
app.get('/about',(req,res)=> {
    res.render('about',{ 
        title: 'About',
        name: 'Pathan'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.adress){
        return res.send({
            error: 'Please provide adress'
        })
    }
    geoCodes(req.query.adress,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(err,resForecasr) => {
            if(err){
                return res.send({
                    error:err
                })
            }
            res.send({
                forecast: resForecasr,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})
app.get('/help',(req,res)=> {
    res.render('help',{
        helpText: 'This is some helpful notes',
        title: 'Help',
        name: 'Pathan'
    })
})
// app.com
// app.com/help
// app.com/about
app.get('/help/*',(req,res) => {
    res.render('pagenotfound',{
        title: '404',
        message: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('pagenotfound',{
        title: '404',
        message:'My 404 Page'
    })
})
app.listen(3000,() => {
    console.log('Server is up on port 3000')
})
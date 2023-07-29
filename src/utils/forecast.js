const request = require('request')
const forecast = (lat,long,callback) => {
    let url = 'http://api.weatherstack.com/current?access_key=06503b500bbe428e90aa154125cc586d&query=' + lat + ',' + long 
    request({url,json: true}, (error,{body}) => {
        if(error){
            callback('unable to find the location service',undefined)
        }
        else if (body.error){
            callback('Please provide valid adress',undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain')
        }
    })
}
module.exports = forecast
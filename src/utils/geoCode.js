const request = require('request')
const geocodes = (adress,callback) => {
    debugger
    const url = 'http://api.weatherstack.com/current?access_key=06503b500bbe428e90aa154125cc586d&query=' + encodeURIComponent(adress)
    request({url,json:true}, (error,{body}) => {
        console.log(body)
        if(error){
            callback('unable to connect to server',undefined)
        }
        else if(!body.location){
            callback('Unable to find location. Try another search',undefined)
        }
        else {
            callback(undefined,{
                latitude : body.location.lat,
                longitude : body.location.lon,
                location : body.location.name
            })
        }
    })
}


module.exports = geocodes
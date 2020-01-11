
const request=require('request')
 const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/a0e3616a2ceab85f73d20d8381c764f8/'+latitude+","+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
           callback('unable to connect to weather service',undefined)
        }else if(body.error){
           callback('unable to find location',undefined)
        }else{
           console.log(body.daily.data[0])
            callback(undefined,{
               summary: body.daily.data[0].summary + body.daily.data[0].temperatureLow +'.'+ body.daily.data[0].temperatureHigh
             
            })
        }
    })
 }
 module.exports=forecast
  
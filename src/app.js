const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')



const app=express()
//Define path of express config 
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
  res.render('index',{
      title:'vipin',
      name:'vipin tyagi'
  })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        name:'vipin',
        title:'About'
    })
})

app.get('/help',(req,res)=>{
res.render('help',{
    name:'vipin',
    title:'help'
})
})

app.get('/weather',(req,res)=>{
   
   if(!req.query.address){
      return res.send({
           error:'you must provide an address'
       })
   }
   console.log(req.query.address)
    
   geocode(req.query.address,(error,{latitude,logitude,location}={})=>{
  if(error){
      return res.send({error})
  }

  forecast(latitude,logitude,(error,forecastData)=>{
    if(error){
        return res.send({error})
    }

    res.send({
        forecast:forecastData,
        location,
        address:req.query.address
    })
  })
   })  
   

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'you must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
       products:[]
    })
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:'404',
         name:'vipin',
         errorMessage:'page not found'
     })
})

app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'vipin',
       errorMessage:'Page Not found'
   })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000')
})
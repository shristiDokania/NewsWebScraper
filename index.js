const   PORT =8000
const express= require('express')
const axios=require('axios')
const cheerio=require('cheerio')
const { response } = require('express')
const { contains } = require('cheerio/lib/static')

const app=express()
const newspapers =[
    {
        name:'TimesofIndia',
        address:'https://timesofindia.indiatimes.com/topic/climate-change',
        base:'https://timesofindia.indiatimes.com/'
    },
    {
        name:'Hindustantimes',
        address:'https://www.hindustantimes.com/ht-insight/climate-change',
        base:'https://www.hindustantimes.com/'
    },
    {
        name:'UN Org',
        address:'https://news.un.org/en/news/topic/climate-change',
        base:'https://news.un.org/en/'
    }
]
const article =[]

newspapers.forEach(newspaper=>{
    axios.get(newspaper.address)
    .then(response=>{
        const html=response.data
        const $ =cheerio.load(html)

        $('a:contains("Climate")',html).each(function() {
            const title = $(this).text()
            const url = $(this).attr('href')

            article.push({
                        title,
                       url: newspaper.base +url,
                       source: newspaper.name
                   })
        })
    })
})

app.get('/',(req ,res)=>{
    res.json('Welcome to my Climate change News API')
})

app.get('/news',(req ,res)=>{
    // axios.get('https://news.un.org/en/news/topic/climate-change')
    // .then((response)=>{
    //     const html = response.data
    //     const $=cheerio.load(html)

    //     $('a:contains("Climate")',html).each(function(){
    //         const title=$(this).text()
    //         const url = $(this).attr('href')
    //         article.push({
    //             title,
    //             url
    //         })
    //     })
    //     res.json(article)
    // }).catch((err)=>console.log(err))
    res.json(article)
})

app.get('/news/:newspaperId',async(req,res)=>{
    const newspaperId=req.params.newspaperId

    const newspaperAddress=newspapers.filter(newspaper => newspaper.name==newspaperId)[0].address
    const newspaperBase=newspapers.filter(newspaper => newspaper.name==newspaperId)[0].base
    console.log(newspaperAddress)
    axios.get(newspaperAddress)
    .then(response=>{
        const html=response.data
        const $=cheerio.load(html)
        const specificArticle=[]

        $('a:contains("climate")',html).each(function(){
            const title =$(this).text()
            const url =$(this).attr('href')

            specificArticle.push({
                title,
                url:newspaperBase+ url,
                source:newspaperId
            })
        })
        res.json(specificArticle)
    }).catch((err)=>console.log(err))
})

app.listen(PORT, ()=>console.log(`server is runing on port ${PORT}`))



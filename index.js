const   PORT =8000
const express= require('express')
const axios=require('axios')
const cheerio=require('cheerio')
const { response } = require('express')
const { contains } = require('cheerio/lib/static')
const { find } = require('cheerio/lib/api/traversing')

const app=express()
const jobs =[
    {
        name:'Indeed',
        address:'https://in.indeed.com/Engineering-jobs?vjk=09f2f20985058ce1',
        base:'https://in.indeed.com/'
    }
]
const article =[]

// jobs.forEach(job=>{
//     axios.get(job.address)
//     .then(response=>{
//         const html=response.data
//         const $ =cheerio.load(html)

//         $('.jobTitle:contains("Software")',html).each(function() {
//             const title = $(this).text()
//             //const url = $(this).attr('href')
//             console.log(title)

//             // article.push({
//             //             title,
//             //            url: job.base +url,
//             //            source: job.name
//             //        })
//         })
//     })
// })

app.get('/',(req ,res)=>{
    res.json('Welcome to my Job Search API')
})

app.get('/jobs',(req ,res)=>{
    axios.get('https://in.indeed.com/jobs?q&l=India&vjk=b51201aa966c74ea')
    .then((response)=>{
        const html = response.data
        const $=cheerio.load(html)

        $('#mosaic-provider-jobcards a',html).each(function(){
            const title=$(this).attr('id')
            const url = $(this).attr('href')
            const base='https://in.indeed.com/?r=us'
            article.push({
                title,
                url: base+url
            })
            console.log(article)
        })
        res.json(article)
    }).catch((err)=>console.log(err))
    //res.json(article)
})
/*
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
*/
app.listen(PORT, ()=>console.log(`server is runing on port ${PORT}`))



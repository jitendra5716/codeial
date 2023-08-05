module.exports.index = (req,res)=>{
    return res.json(200,{
        message:"List of posts of v2",
        posts:[]
    })
}
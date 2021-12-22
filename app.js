const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
 
app.use(express.static("private"));
app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    const f=req.body.fname;
    const l=req.body.lname;
    const email=req.body.email;
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME:f,
                    LNAME:l
                }
            }
        ]
    };
 const jsonData=JSON.stringify(data);

 const url="https://us5.api.mailchimp.com/3.0/lists/9ef85aa4e5";
const options ={
    method:"POST",
    auth:"mkjam007:e0ade7e545e8dc6fe8c0262328c4ea6d-us5"
}
const request = https.request(url,options,function(response){
    
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
    console.log(JSON.parse(data));
});
});
 request.write(jsonData);
 request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});
let port=process.env.PORT||3010;
app.listen(port,function(){
    console.log("server is running properly on 3010");

});
//e0ade7e545e8dc6fe8c0262328c4ea6d-us5

//uniq id--->9ef85aa4e5

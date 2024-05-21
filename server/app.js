const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const PORT = process.env.PORT || 3000;
let categoryList= require("./data").categoryList; 


console.log("categoryList: >>", categoryList);

app.get("/", (req, res) => {
    res.status(200).send({categoryList});
}); 

app.post("/subscriber/:categoryId", (req, res) => {
    if (req.params.categoryId && req.body.subscriber) {
        const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);

        if (!matchedCategory) return res.status(404).send({message: "Kategori bulunamadı"});

        matchedCategory.subscriberList.push(req.body.subscriber);

        return res.status(201).send({
            message: `Tebrikler! ${matchedCategory.title} kategorisine bir konu eklendiğinde ilk sizin haberiniz olucak `,
            category: {
                id: matchedCategory.id,
                    title:matchedCategory.title,
                }
            }); 

        }else {

            return res.status(400).send({message:"categoryId ve subscriber bilgisi zorunludur"});

        }
        

     });
    app.post("/send_notification/:categoryId",(req,res)=>{  
        

    });
 app.listen(PORT,()=>
    {
      
        console.log("Sunucu başarılı bir şekilde çalışıyor 3000");

    }); 
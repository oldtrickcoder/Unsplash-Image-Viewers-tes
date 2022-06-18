require('dotenv').config();
const fetch=require('node-fetch');
const env =require('dotenv');
const express=require('express');
const app=express();
const path = require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname+'/view'));

app.use(express.static('public'));
const SearchContent="west java tourism";
// console.log(process.env.API_KEY);
const SortingData =async (req,res)=>{
    var KumpulanFoto=[];
    var halaman=1
        await fetch(`https://api.unsplash.com/search/photos?page=${halaman}&query=${SearchContent}&orientation=landscape&per_page=100&client_id=${process.env.API_KEY}`)
       .then((response) => response.json())
       .then((json) => {
           for(i=0;i<json.results.length;i++){
      
            var rawDATA=json.results[i];
               var linkGAMBAR= rawDATA.urls;
               var gambarSmall=linkGAMBAR.small;
               var Likes=rawDATA.likes;
               var owner=rawDATA.user.name;
               var bio=rawDATA.user.bio;
               var TOTALfoto= rawDATA.user.total_photos;
               var instagram=rawDATA.user.instagram_username;
               var desc=rawDATA.description;
               var altdesc=rawDATA.alt_description;
               KumpulanFoto.push({gambarSmall,Likes,TOTALfoto,owner,bio,instagram,desc,altdesc})
            ;}

      }); //end of cobatarikdata variabel
   
    //   res.send("oke");
      res.render('index',{Array:KumpulanFoto,jumlahdata:KumpulanFoto.length,NextPage:halaman + 1 });
 
   }
  


// res.send("oke");
// console.log(KumpulanFoto);
        // res.render('index',{Array:KumpulanFoto,jumlahdata:KumpulanFoto.length});
        // res.send("oke");

const NextPage= async (req,res)=>{
var indikator=req.params.id
var KumpulanFoto=[];
await fetch(`https://api.unsplash.com/search/photos?page=${indikator}&query=${SearchContent}&orientation=landscape&per_page=100&client_id=${process.env.API_KEY}`)
.then((response) => response.json())
.then((json) => {
    for(i=0;i<json.results.length;i++){

     var rawDATA=json.results[i];
        var linkGAMBAR= rawDATA.urls;
        var gambarSmall=linkGAMBAR.small;
        var Likes=rawDATA.likes;
        var owner=rawDATA.user.name;
        var bio=rawDATA.user.bio;
        var TOTALfoto= rawDATA.user.total_photos;
        var instagram=rawDATA.user.instagram_username;
        var desc=rawDATA.description;
        var altdesc=rawDATA.alt_description;
        KumpulanFoto.push({gambarSmall,Likes,TOTALfoto,owner,bio,instagram,desc,altdesc})
     ;}

}); //end of cobatarikdata variabel

//   res.send("oke");
res.render('index',{Array:KumpulanFoto,jumlahdata:KumpulanFoto.length,NextPage:parseInt(indikator) + 1 });


}






app.get('/',SortingData);
app.get('/:id',NextPage);



var port=3000;
app.listen(port,(req,res)=>{
    console.log(`Server Online at http:\\localhost:${port}`);
})
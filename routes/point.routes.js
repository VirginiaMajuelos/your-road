const router = require("express").Router()
const Place = require("../models/Place.model")
const Point = require("../models/Point.model")
const fileUploader = require("../config/cloudinary.config")
const { isLoggedIn, checkRoles } = require("../middlewares")
/// Detalles point

router.get('/details/edit/:id', (req, res) => {
  const {id} = req.params
  Point.findById(id)
  .then((thePoint) => {
    console.log(id)
    res.render('place/point-details', thePoint)
  })
  .catch((err) => console.log(err));
})

router.post("/details/edit/:id", fileUploader.single('imageUrl'), (req, res) => {
  const {id} = req.params
  console.log(id)
  const { name, comments, tips, date,} = req.body;


  Point.findByIdAndUpdate(id, 
    { name, comments, tips, date, imageUrl: req.file?.path }, 
    
    { new: true })

  .then(DetailsPoint => {
      console.log(DetailsPoint)
      res.redirect("/")
    })
    .catch(error => console.log(`Error while creating details of points: ${error}`));


  })

  //// Delete


    router.get("/details/delete/:id", (req, res) =>{
        const { id } = req.params;
        Point.findByIdAndRemove(id)
        .then(() =>{res.redirect("/")
        })
    });


module.exports = router;
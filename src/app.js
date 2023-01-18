const mongoose = require("mongoose");
const validator = require("validator");

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://localhost:27017/KishanPlayList",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connection is sussecfull...."))
.catch((err)=>console.log(err));

//SCHEMA

const playlistSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique : true,
        uppercase:true,
        trim:true,
        minlength:[2,"enter min two letter"],
        maxlength:30
    },
    ctype : {
        type: String,
        required:true,
        lowercase:true,
        enum:["frontend", "backend", "database"]
    },
    videos:{
        type :Number,
        validate(value){
            if(value<0){
                throw new Error("videos count should not be negative")
            }
        }
    },
    auther: String,
    email : {
        type: String,
        required: true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    active : Boolean,
    date : {
        type : Date,
        default : Date.now         
    }
})

// Model  or collection creation

const Playlist = new mongoose.model("Playlist",playlistSchema);

// Create document or insert 

const createDocument  = async()=>{
    try{
        const jsPlaylist = new Playlist({
            name: "Java --",
            ctype : "Backend",
            videos: 10,
            auther: "kishan",
            email: "kishan@gmail.com",
            active : true,
        })

        // const mongoPlaylist = new Playlist({
        //     name: "MongoDB",
        //     ctype : "Database",
        //     videos: 20,
        //     auther: "kishan",
        //     active : true,
        // })

        // const mongoosePlaylist = new Playlist({
        //     name: "Mongoose",
        //     ctype : "Database",
        //     videos: 10,
        //     auther: "kishan",
        //     active : true,
        // })

        // const expressPlaylist = new Playlist({
        //     name: "ExpressJs",
        //     ctype : "Back end",
        //     videos: 10,
        //     auther: "kishan",
        //     active : true,
        // })
        
        // const result = await reactPlaylist.save();  // can insert only one document
        // const result = await Playlist.insertMany([jsPlaylist,mongoPlaylist,mongoosePlaylist,expressPlaylist]);// mau insert multiple doc at a time
        const result = await Playlist.insertMany([jsPlaylist]);
        console.log(result);
    }catch(err){
        console.log(err);
    }

}

createDocument();


//************to read the document ****************
const getDocument = async ()=>{
    try{
        // const result = await Playlist.find({ctype:"Front End"})
        // .select({name:1});
        // const result = await Playlist.find({$or : [{ctype: "Back End"},{auther:"kishan"}]}).select({name:1});
        // const result = await Playlist.find({$and : [{ctype: "Back End"},{auther:"kishan"}]}).select({name:1});
        // const result = await Playlist.find({$not : [{ctype:"Front End"}]}).select({name:1});
        // const result = await Playlist.find({$and : [{ctype: "Back End"},{auther:"kishan"}]}).select({name:1}).countDocuments();
        const result = await Playlist.find({auther:"kishan"}).select({name:1})
        .sort({name:-1});
        // .countDocuments();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
// getDocument();


// *********** TO UPDATE DOCUMENT *************************
const updateDocument = async (id)=>{
    try{
        // const result = await Playlist.updateOne({_id : id},{$set:{name:"MONGOOSE"}});

        const result = await Playlist.findByIdAndUpdate({_id : id},{$set:{name:"Mongoose"}});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
// updateDocument("63bdadeca813215273b394b4");


// ********* DELETE THE DOCUMENT *******************
const deleteDocument= async (_id)=>{
    try{
        // const result = await Playlist.deleteOne({_id});
        
        const result = await Playlist.findByIdAndDelete({_id});
        console.log(result);
    }catch(err){
        console.log(err)
    }
}



// deleteDocument("63bdadeca813215273b394b5");
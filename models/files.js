import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';


const FILES_PATH = path.join("/uploads/files");


const fileSchema = new mongoose.Schema({
  filePath:{
    type: String
  },
  originalName:{
    type: String
  } , 
  file:{
        type:String
    }
},{
    timestamps: true
});

    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", FILES_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


  fileSchema.statics.uploadedFile = multer({ storage: storage }).single("file");
  fileSchema.statics.filePath = FILES_PATH;



const Files = mongoose.model("Files", fileSchema);

module.exports = Files;
import mongoose from 'mongoose';
import express from 'express';


import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => { 
    try {
        const postMessages = await PostMessage.find();
                
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const View = async function (req, res) {
    console.log("view");
    console.log(req.params.file);
    let filePATH = await File.findOne({ file: req.params.file });
    console.log(filePATH);
    console.log(filePATH.filePath);
    const results = [];
    const header = [];
    fs.createReadStream(filePATH.filePath)
        .pipe(csv())
        .on('headers', (headers) => {
            headers.map((head) => {
                header.push(head);
            });
            console.log(header);
        })
        .on('data', (data) =>
            results.push(data))
        .on('end', () => {
            console.log(header);
            console.log(results.length);
            console.log(results);
            res.render("file", {
                title: filePATH.originalName,
                head: header,
                data: results,
                length: results.length
            });
        });
}

export const Upload = function (req, res) {
    try {
        //Use for uploading file with note
        File.uploadedFile(req, res, function (err) {
            if (err) {
                console.log("multer Error");
            }
            console.log(req.file);
            if (req.file && req.file.mimetype == "application/vnd.ms-excel" || req.file && req.file.mimetype == "text/csv") {
                console.log("true");
                console.log(req.file);
                File.create({
                    filePath: req.file.path,
                    originalName: req.file.originalname,
                    file: req.file.filename
                }, function (err) {
                    if (err) {
                        console.log(err)
                        return res.status(400).json({
                            message: "Error in creating Note or Uploading File"
                        });
                    }
                    // res.status(200).json({
                    //     message: "File Uploaded"

                    // });
                    return res.redirect("/");
                }
                );
            } else {
                console.log("Please Upload CSV Format file");

                // todo add alert
                return res.redirect("/");
            }

        });

    } catch (err) {
        console.log(err);
    }
}


export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}




export default router;
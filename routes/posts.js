import express from 'express';

import { View , Upload , getPosts,  createPost } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);

router.post('/', auth, createPost);


//router.get("/:file", View);
router.post("/", Upload);
router.use("/file", View);



export default router;
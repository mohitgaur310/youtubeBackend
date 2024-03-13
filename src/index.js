require('dotenv').config();
const express = require("express")
const dotenv =require("dotenv")
dotenv.config({path:"./env"})
const app=express();
const connectDb =require("../src/db/index")

connectDb()
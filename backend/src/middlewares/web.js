import express from "express";
import middleware from "./index.js";

const web = express();
web.use(middleware);

export default web;
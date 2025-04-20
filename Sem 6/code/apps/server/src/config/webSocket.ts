import ws from "ws";
import http from "http";
import app from "../app";

http.createServer(app);

const socketServer = new ws.Server({ noServer: true });

import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import ticketRoutes from "../src/interfaces/http/routes/ticketRoutes";
import authRoutes from "../src/interfaces/http/routes/authRoutes";
import commentRoutes from "../src/interfaces/http/routes/commentRoutes";
import knowledgeBaseRoutes from "../src/interfaces/http/routes/knowledgeBaseRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/tickets", ticketRoutes);
app.use("/auth", authRoutes);
app.use("/tickets", commentRoutes);
app.use("/knowledgebase", knowledgeBaseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

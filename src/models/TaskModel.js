import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, required: true, default: "pendente" },
    priority: { type: String, required: true, enum: ['baixa', 'media', 'alta']}  // Adicionei o campo priority
});

const task = mongoose.model("Tasks", TaskSchema);

export default task;

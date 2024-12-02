import request from "supertest";
import app from "../app"; // Certifique-se de que este caminho está correto

describe("Task Routes", () => {
    it("should create a new task", async () => {
        const response = await request(app)
            .post("/task/create")
            .send({
                title: "Task Test",
                description: "Testing task creation",
                deadline: "2024-12-31",
                priority: "High",
                id_user: "user123",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Tarefa criada com sucesso");
        expect(response.body.task).toHaveProperty("id");
    });

    it("should get all tasks for a user", async () => {
        const response = await request(app).get("/task/findAll/user123");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should edit an existing task", async () => {
        const response = await request(app)
            .put("/task/edit")
            .send({
                id: "task123",
                title: "Updated Task Title",
                description: "Updated Task Description",
                deadline: "2024-12-30",
                status: "Pending",
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Tarefa atualizada com sucesso para o usuario");
        expect(response.body.taskUpdated).toHaveProperty("title", "Updated Task Title");
    });

    it("should delete a task", async () => {
        const response = await request(app).delete("/task/delete/task123");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Tarefa deletada com sucesso");
    });

    it("should alter the status of a task", async () => {
        const response = await request(app).put("/task/status/task123");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Tarefa atualizada com sucesso para o usuario");
        expect(response.body.taskUpdated).toHaveProperty("status", "Concluido");
    });

    // Novos testes para validação adicional
    it("should return 404 for invalid route", async () => {
        const response = await request(app).get("/invalid-route");
        expect(response.status).toBe(404);
    });

    it("should return 400 for creating a task with missing fields", async () => {
        const response = await request(app)
            .post("/task/create")
            .send({
                // Enviando apenas alguns campos
                title: "Incomplete Task",
            });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", "Validation Error");
    });

    it("should return 404 for trying to edit a non-existent task", async () => {
        const response = await request(app)
            .put("/task/edit")
            .send({
                id: "nonexistent-task-id",
                title: "Nonexistent Task",
                description: "This task does not exist",
            });
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Task not found");
    });
});

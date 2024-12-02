import request from "supertest";
import app from "../app"; // Certifique-se de que o caminho para seu arquivo `app.ts` está correto

describe("User Routes", () => {
    it("should return 200 for GET /users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);
    });

    it("should return 201 for POST /users with valid data", async () => {
        const userData = {
            name: "Test User",
            email: "test@example.com",
            password: "password123",
        };
        const response = await request(app).post("/users").send(userData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });
});

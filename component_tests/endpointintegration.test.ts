import {describe, it, expect, test} from 'vitest'
import supertest from 'supertest'
import {app} from '../source/server/protoserver.ts'

describe("HTTP server on 2211", () => {
	it("get /create", async () => {
		const response = await supertest(app).get("/create");
		
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});
	
	it("post /join", async () => {
		const response = await supertest(app).post("/join").send({roomcode: 1});
		
		expect(response.status).toBe(200);
	});
	
	it("post /findroom", async () => {
		const response = await supertest(app).post("/findroom").send({roomcode: 2});
		
		expect(response.status).toBe(404);
	});
});

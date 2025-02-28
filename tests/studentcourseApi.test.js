const { test, expect } = require('@playwright/test');

const baseURL = 'http://localhost:5000';

test.describe('Course API Tests', () => {

    test('Get all student view courses', async ({ request }) => {
        const response = await request.get(`${baseURL}/student/courses?category=Programming&level=Beginner`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data).toBeInstanceOf(Array);
    });

    test('Get course details by ID', async ({ request }) => {
        const courseId = '67b8b6ff4e07d3956ba3da2f'; // Change this to a valid ID in your database
        const response = await request.get(`${baseURL}/student/courses/${courseId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.data).toHaveProperty('title');
    });

    test('Check if student has purchased a course', async ({ request }) => {
        const courseId = '67b8b6ff4e07d3956ba3da2f'; // Change this to a valid ID
        const studentId = '67b8ad25d3e88e48fafb86f0'; // Change this to a valid student ID
        const response = await request.get(`${baseURL}/student/courses/${courseId}/${studentId}`);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
    });

});

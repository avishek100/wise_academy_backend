const { test, expect, request } = require('@playwright/test');

const BASE_URL = 'http://localhost:5000'; // Update with your API base URL

test.describe('Course API Tests', () => {
    let courseId;

    test('Add a new course', async ({ request }) => {
        const response = await request.post(BASE_URL, {
            data: {
                title: "New Course",
                description: "This is a test course",
                category: "Programming",
                price: 49.99,
                instructor: "Test Instructor",
            },
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody.success).toBeTruthy();
        expect(responseBody.data).toHaveProperty('_id');

        courseId = responseBody.data._id; // Store course ID for further tests
    });

    test('Get all courses', async ({ request }) => {
        const response = await request.get(BASE_URL);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.success).toBeTruthy();
        expect(Array.isArray(responseBody.data)).toBeTruthy();
    });

    test('Get course details by ID', async ({ request }) => {
        const response = await request.get(`${BASE_URL}/${courseId}`);
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.success).toBeTruthy();
        expect(responseBody.data._id).toBe(courseId);
    });

    test('Update course by ID', async ({ request }) => {
        const response = await request.put(`${BASE_URL}/${courseId}`, {
            data: {
                title: "Updated Course Title",
            },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.success).toBeTruthy();
        expect(responseBody.data.title).toBe("Updated Course Title");
    });
});

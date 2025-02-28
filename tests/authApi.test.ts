import { expect, request, test } from '@playwright/test';

test.describe('Auth API Tests', () => {
    let apiContext;

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: 'http://localhost:5000', // Adjust if backend runs on a different port
        });
    });

    test('Register a new user', async () => {
        const uniqueUserName = `testuser_${Date.now()}`;
        const uniqueEmail = `testuser_${Date.now()}@example.com`;

        const response = await apiContext.post('/auth/register', {
            data: {
                userName: uniqueUserName,
                userEmail: uniqueEmail,
                password: 'password123',
                role: 'user',
            },
        });

        expect(response.status()).toBe(201);

        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.message).toBe('User registered successfully!');
        expect(body.user).toHaveProperty('userName', uniqueUserName);
        expect(body.user).toHaveProperty('userEmail', uniqueEmail);
    });

    test('Fail to register with existing user email', async () => {
        // First, register a user
        const uniqueEmail = `testuser_${Date.now()}@example.com`;

        await apiContext.post('/auth/register', {
            data: {
                userName: 'testuser',
                userEmail: uniqueEmail,
                password: 'password123',
                role: 'user',
            },
        });

        // Try registering with the same email
        const response = await apiContext.post('/auth/register', {
            data: {
                userName: 'testuser',
                userEmail: uniqueEmail, // Existing email
                password: 'password123',
                role: 'user',
            },
        });

        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.message).toBe('User name or user email already exists');
    });

    test('Login with valid credentials', async () => {
        const uniqueEmail = `testuser_${Date.now()}@example.com`;

        // First, register a user
        await apiContext.post('/auth/register', {
            data: {
                userName: 'testuser',
                userEmail: uniqueEmail,
                password: 'password123',
                role: 'user',
            },
        });

        // Now, login with the registered credentials
        const response = await apiContext.post('/auth/login', {
            data: {
                userEmail: uniqueEmail,
                password: 'password123',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.success).toBe(true);
        expect(body.message).toBe('Logged in successfully');
        expect(body.data).toHaveProperty('accessToken');
        expect(body.data.user).toHaveProperty('userEmail', uniqueEmail);
    });

    test('Fail to login with invalid credentials', async () => {
        const response = await apiContext.post('/auth/login', {
            data: {
                userEmail: 'nonexistentuser@example.com',
                password: 'wrongpassword',
            },
        });

        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.success).toBe(false);
        expect(body.message).toBe('Invalid credentials');
    });
});

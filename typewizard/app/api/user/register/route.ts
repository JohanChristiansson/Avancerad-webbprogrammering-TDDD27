import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'

// Helper function to check if user exists
async function getUser(userName : string) {
    try {
        const result = await sql`
            SELECT * FROM users
            WHERE name = ${userName}
        `;
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Crash when trying to check if user exists");
    }
}

// Create new user
export async function POST(req: Request) {
    const cookieStore = cookies()
    try {
        const { userName, password } = await req.json();
        if (!userName || !password) {
            return new Response("Missing userName or password", { status: 400 });
        }

        const existingUser = await getUser(userName);
        if (existingUser) {
            return new Response("User already exists", { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const result = await sql`
            INSERT INTO users (name, password)
            VALUES (${userName}, ${hashedPassword})
            RETURNING *;
        `;
        cookieStore.set({ name: "user", value: userName, httpOnly: true, path: '/' });
        return new Response(JSON.stringify(result.rows[0]), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


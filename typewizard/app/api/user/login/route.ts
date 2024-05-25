import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers'

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

//Should be post even tho we dont change any data as it is more secure as the password is sent
export async function POST(req: Request) {
     const { userName, password } = await req.json();
     const cookieStore = cookies()

    if (!userName || !password) {
        console.log(userName, password)
        return new Response("Missing userName or password", { status: 400 });
    }

    try {
        const user = await getUser(userName);

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                cookieStore.set({ name: "user", value: user.name, httpOnly: true, path: '/' });
                return new Response(JSON.stringify(user), { status: 200 });
            } else {
                return new Response("Invalid password", { status: 401 });
            }
        } else {
            return new Response("User not found", { status: 404 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
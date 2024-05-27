export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers'


export async function POST(req: Request) {
    const { username } = await req.json();
    //const cookieStore = await cookies(); // Await the result of cookies()
    try {
        if (username) {
            console.log("test");
           // cookieStore.set({ name: "user", value: username, httpOnly: true, path: '/' });
            return new Response("User cookie set successfully", { status: 200 }); // Sending response after setting cookie
        } else {
            return new Response("Error retrieving user", { status: 401 });
        }
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
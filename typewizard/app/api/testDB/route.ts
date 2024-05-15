import { sql } from "@vercel/postgres";
import { waitForDebugger } from "inspector";

export async function POST(req: Request) {
    try {
        console.log(req, "req")
      
        await sql`INSERT INTO Lobby (id) VALUES (${"1"}) RETURNING id`;

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}
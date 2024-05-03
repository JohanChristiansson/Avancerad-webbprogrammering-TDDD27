export const dynamic = 'force-dynamic';
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    try {
        const uuid = uuidv4(); // Generate UUID
        const { rows } = await sql`INSERT INTO Lobby (id) VALUES (${uuid}) RETURNING id`;
        const createdLobbyId = rows[0].id;

        return new Response(createdLobbyId);
    } catch (error) {
        console.error("Error creating chat room:", error);
        return new Response("Error creating chat room", { status: 500 });
    }
}
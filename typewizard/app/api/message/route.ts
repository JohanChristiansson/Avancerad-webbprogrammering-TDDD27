import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
     const uuid = uuidv4();
    try {
        const { text, lobbyId } = await req.json();
        console.log(req, "req")
        if(lobbyId)
            console.log(lobbyId, "lobby id was correctly sent to msg")
        else{
            console.log("odefinerat lobbyid i send msg")
        }
        console.log("här triggas pusher trigger")
        pusherServer.trigger(lobbyId, 'incoming-message', text);

        // Insert message into database
        await sql`INSERT INTO Message (id, text, lobbyId) VALUES (${uuid}, ${text}, ${lobbyId})`;

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}
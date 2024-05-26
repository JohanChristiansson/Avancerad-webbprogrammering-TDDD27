export const dynamic = 'force-dynamic';
import { sql } from "@vercel/postgres";
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
    try {
        const { lobbyId } = await req.json();
       
        console.log("här triggas pusher trigger")
        await pusherServer.trigger(lobbyId, 'start-game', "start");
        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error creating message", { status: 500 });
    }
}
export const dynamic = 'force-dynamic';
import { pusherServer } from '@/lib/pusher';

export async function POST(req: Request) {
    try {
        const { lobbyId } = await req.json();

        if (!lobbyId || typeof lobbyId !== 'string') {
            return new Response(JSON.stringify({ error: "Invalid lobbyId" }), { status: 400});
        }

        await pusherServer.trigger(lobbyId, 'finished-game', "done");
        return new Response(JSON.stringify({ success: true }), { status: 200});
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response(JSON.stringify({ error: "Error updating user" }), { status: 500});
    }
}

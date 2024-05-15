
export async function GET() {
    try {
        return new Response(JSON.stringify("success"));
    } catch (error) {
        console.error("Error creating chat room:", error);
        return new Response("Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        return new Response(JSON.stringify("success POST"));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error with post", { status: 501 });
    }
}
export async function POST(req: Request) {
    try {
        return new Response(JSON.stringify("success"));
    } catch (error) {
        console.error("Error creating message:", error);
        return new Response("Error with post", { status: 500 });
    }
}
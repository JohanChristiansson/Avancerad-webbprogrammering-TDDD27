export async function GET() {
    try {
        return new Response(JSON.stringify("success"));
    } catch (error) {
        console.error("Error creating chat room:", error);
        return new Response("Error", { status: 500 });
    }
}
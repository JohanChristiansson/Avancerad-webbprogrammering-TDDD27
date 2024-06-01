import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('username')
    try {
        // SQL queries to retrieve stats
    var averageWPM = await sql`
    SELECT AVG(wpm) AS average_wpm
    FROM user_in_lobby
    WHERE player_name = ${username} AND wpm > 0`;

    var gamesPlayed = await sql`
    SELECT COUNT(*) AS games_played
    FROM user_in_lobby
    WHERE player_name = ${username} AND wpm > 0`;

    var highestWPM = await sql`
    SELECT MAX(wpm) AS highest_wpm
    FROM user_in_lobby
    WHERE player_name = ${username}`;

    var averageAccuracy = await sql`
    SELECT AVG(accuracy) AS average_accuracy
    FROM user_in_lobby
    WHERE player_name = ${username} AND wpm > 0`;

    var globalRanking = await sql`
    WITH PlayerAverageWPM AS (
    SELECT player_name, AVG(wpm) AS avg_wpm
    FROM user_in_lobby
    WHERE wpm > 0
    GROUP BY player_name
    ),
    PlayerRanking AS (
    SELECT player_name, avg_wpm,
    RANK() OVER (ORDER BY avg_wpm DESC) AS ranking
    FROM PlayerAverageWPM
    )
    SELECT ranking
    FROM PlayerRanking
    WHERE player_name = ${username};
`;

averageWPM = averageWPM.rows[0].average_wpm;
gamesPlayed = gamesPlayed.rows[0].games_played;
highestWPM = highestWPM.rows[0].highest_wpm;
averageAccuracy = averageAccuracy.rows[0].average_accuracy;
globalRanking = globalRanking.rows[0].ranking

// Create an object containing these values
const responseObject = {
    averageWPM: averageWPM,
    gamesPlayed: gamesPlayed,
    highestWPM: highestWPM,
    averageAccuracy: averageAccuracy,
    globalRanking: globalRanking
};

return new Response(JSON.stringify(responseObject), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


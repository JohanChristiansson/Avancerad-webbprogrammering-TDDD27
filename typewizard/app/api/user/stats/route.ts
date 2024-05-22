import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
    const { username } = await req.json();

    try {
        // SQL queries to retrieve stats
    var averageWPM = await sql`
    SELECT AVG(wpm) AS average_wpm
    FROM user_in_lobby
    WHERE player_name = ${username}`;

    var gamesPlayed = await sql`
    SELECT COUNT(*) AS games_played
    FROM user_in_lobby
    WHERE player_name = ${username}`;

    var highestWPM = await sql`
    SELECT MAX(wpm) AS highest_wpm
    FROM user_in_lobby
    WHERE player_name = ${username}`;

    var averageWords = await sql`
    SELECT AVG(current_words) AS total_average_words
    FROM user_in_lobby
    WHERE player_name = ${username}`;

averageWPM = averageWPM.rows[0].average_wpm;
gamesPlayed = gamesPlayed.rows[0].games_played;
highestWPM = highestWPM.rows[0].highest_wpm;
averageWords = averageWords.rows[0].total_average_words;

// Create an object containing these values
const responseObject = {
    averageWPM: averageWPM,
    gamesPlayed: gamesPlayed,
    highestWPM: highestWPM,
    averageWords: averageWords
};

return new Response(JSON.stringify(responseObject), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


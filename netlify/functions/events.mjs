// Returns how many Discord events are running right now in The Refuge.
// Needs the bot token saved in Netlify as the environment variable DISCORD_BOT_TOKEN.
const GUILD_ID = "1494277013484212246";

export default async () => {
  const token = process.env.DISCORD_BOT_TOKEN;
  if (!token) return Response.json({ error: "DISCORD_BOT_TOKEN is not set" }, { status: 500 });
  try {
    const res = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/scheduled-events`, {
      headers: { Authorization: `Bot ${token}` },
    });
    if (!res.ok) return Response.json({ error: `Discord returned ${res.status}` }, { status: 502 });
    const events = await res.json();
    const running = events.filter((e) => e.status === 2).length;   // 2 = active / in progress
    const upcoming = events.filter((e) => e.status === 1).length;  // 1 = scheduled
    return Response.json({ running, upcoming }, {
      headers: { "Cache-Control": "public, max-age=60" },
    });
  } catch (err) {
    return Response.json({ error: "Could not reach Discord" }, { status: 502 });
  }
};

export const config = { path: "/api/events" };

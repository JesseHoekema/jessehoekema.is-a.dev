import type { RequestHandler } from "@sveltejs/kit";
import axios from "axios";
import { HACKATIME_API_KEY } from "$env/static/private";

export const GET: RequestHandler = async () => {
  const apiKey = HACKATIME_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error: "API Key is missing from environment variables",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const response = await axios.get(
      `https://hackatime.hackclub.com/api/hackatime/v1/users/current/statusbar/today`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        timeout: 2000,
      },
    );

    const { total_seconds, text } = response.data.data.grand_total;
    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds % 3600) / 60);

    return new Response(JSON.stringify({ hours, minutes, text }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Hackatime API error:", error);

    if (axios.isAxiosError(error) && !error.response) {
      return new Response(
        JSON.stringify({
          hours: 0,
          minutes: 0,
          message: "not coded today",
        }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        error: "Failed to fetch Hackatime stats",
        hours: 0,
        minutes: 0,
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );
  }
};

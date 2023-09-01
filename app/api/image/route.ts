import { checkApiLimit, incrementApiLimit } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  // organization: "org-la5yHwxBPIYVnNqn9Dtke135",
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, resolution = "512x512", amount = "1" } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAi Api Key not configured", { status: 500 });
    }
    if (!amount) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!prompt) {
      return new NextResponse("prompt is required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("resolution is required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial expired", { status: 403 });
    }
    const generate = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: "1024x1024",
    });
    if (!isPro) await incrementApiLimit();

    return NextResponse.json(generate.data);
  } catch (error) {
    console.log("[IMAGE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

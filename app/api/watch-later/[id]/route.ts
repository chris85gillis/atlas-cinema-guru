// /api/watch-later/[id].ts
import {
  deleteWatchLater,
  insertWatchLater,
  watchLaterExists,
} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    if (!req.auth) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }
    const {
      user: { email },
    } = req.auth;

    const exists = await watchLaterExists(id, email);
    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    await insertWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later Added" });
  }
);

export const DELETE = auth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params;
    const {
      user: { email },
    } = req.auth;

    await deleteWatchLater(id, email);
    return NextResponse.json({ message: "Watch Later removed" });
  }
);
// /api/watch-later/[id].ts
import {
  deleteWatchLater,
  insertWatchLater,
  watchLaterExists,
} from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export const POST = auth(
  async (req: NextRequest, ctx: any) => {
    const id = ctx?.params?.id as string | undefined;
    const authData = (req as any).auth;
    if (!authData) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const email = authData?.user?.email as string | undefined;
    if (!email) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    const exists = await watchLaterExists(id!, email);
    if (exists) {
      return NextResponse.json({ message: "Already added to Watch Later" });
    }

    await insertWatchLater(id!, email);
    return NextResponse.json({ message: "Watch Later Added" });
  }
);

export const DELETE = auth(
  async (req: NextRequest, ctx: any) => {
    const id = ctx?.params?.id as string | undefined;
    const authData = (req as any).auth;
    const email = authData?.user?.email as string | undefined;
    if (!email) {
      return NextResponse.json(
        { error: "Unauthorized - Not logged in" },
        { status: 401 }
      );
    }

    await deleteWatchLater(id!, email);
    return NextResponse.json({ message: "Watch Later removed" });
  }
);
import { deleteFavorite, favoriteExists, insertActivity, insertFavorite } from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Helper function to validate authentication
 */
const getAuthenticatedUser = (req: NextRequest) => {
  //@ts-ignore
  if (!req.auth) {
    throw new Error("Unauthorized - Not logged in");
  }
  //@ts-ignore
  return req.auth.user.email;
};

/**
 * POST /api/favorites/:id
 */
export const POST = auth(
  async (req: NextRequest, context: { params?: Record<string, string | string[]> }) => {
    try {
      const { params } = context;
      if (!params || typeof params.id !== "string") {
        return NextResponse.json(
          { error: "Invalid request parameters" },
          { status: 400 }
        );
      }

      const email = getAuthenticatedUser(req);

      const exists = await favoriteExists(params.id, email);
      if (exists) {
        return NextResponse.json({ message: "Already favorited" });
      }

      await insertFavorite(params.id, email);

      return NextResponse.json({ message: "Favorite Added" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  }
);

/**
 * DELETE /api/favorites/:id
 */
export const DELETE = auth(
  async (req: NextRequest, context: { params?: Record<string, string | string[]> }) => {
    try {
      const { params } = context;
      if (!params || typeof params.id !== "string") {
        return NextResponse.json(
          { error: "Invalid request parameters" },
          { status: 400 }
        );
      }

      const email = getAuthenticatedUser(req);

      await deleteFavorite(params.id, email);

      return NextResponse.json({ message: "Favorite removed" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }
  }
);
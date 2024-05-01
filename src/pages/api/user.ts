import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../client";
import { serialize } from "cookie";
import requestIp from "request-ip";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const ipAddress = requestIp.getClientIp(req);
    const userId = req.query?.userId || null;
    const browserInfo = req.headers["user-agent"] || "Unknown User Agent";
    const currentDate = new Date();
    const createdAt = currentDate.toISOString();
    const lastAccessAt = currentDate.toISOString();
    const existingUser = await client.fetch(
      `*[_type == 'user' && _id == $userId][0]`,
      { userId }
    );

    if (existingUser) {
      const response = existingUser?.responses || [];

      existingUser["responses"] = response.filter(
        (item: any) =>
          new Date(item.createdAt).toDateString() === new Date().toDateString()
      );

      await client.patch(existingUser._id).set({ lastAccessAt }).commit();
      return res.status(200).json({ data: existingUser });
    }

    const data = await client.create({
      _type: "user",
      ipAddress,
      browserInfo,
      createdAt,
      lastAccessAt,
    });

    if (!data) {
      return res.status(500).json({ error: "Something went wrong." });
    }

    await client.patch(data._id).set({ userId: data._id }).commit();

    const cookieOptions = {
      path: "/",
    };

    const serializedCookie = serialize(
      "mdj_auth_userId",
      data._id,
      cookieOptions
    );

    res.setHeader("Set-Cookie", serializedCookie);
    return res.status(200).send({ data: data });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

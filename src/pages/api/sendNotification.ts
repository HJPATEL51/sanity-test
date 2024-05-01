import { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const estTime = DateTime.now().setZone("America/New_York");
    const currentHour = estTime.hour;
    const currentMinute = estTime.minute;
    const currentSecond = estTime.second;

    // Check if it's exactly 00:00:01 in EST
    if (currentHour === 0o0 && currentMinute === 0o0 && currentSecond === 0o1) {
      const notificationMessage = "Great news! New mot de jur is live.";

      return res.status(200).json({
        message: "Notification sent: " + notificationMessage,
      });
    } else {
      return res.status(200).json({ message: "No notifications sent" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to send notifications" });
  }
}

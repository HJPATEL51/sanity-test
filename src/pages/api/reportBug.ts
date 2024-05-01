import { RootState } from "@/store/store";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { text, questionId } = req.body;

      const formattedMessage = `*${text}*\nQuestion: *${req.body.qusetion}*  (${
        questionId || ""
      })\nUserID: ${req.cookies.mdj_auth_userId || ""}\nBrowser: ${
        req.headers["user-agent"]
      }\nTimeStamp: ${new Date().toISOString()}\n\n***`;

      const slackWebhookUrls = [
        "https://hooks.slack.com/services/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",
        "https://hooks.slack.com/services/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",
      ];

      const requests = slackWebhookUrls.map(async (url) => {
        try {
          const response = await axios.post(url, { text: formattedMessage });
          return response.data;
        } catch (error) {
          console.error(`Error sending to ${url}:`, error);
          return { error: `Error sending to ${url}` };
        }
      });

      const responses = await Promise.all(requests);

      res.status(200).json({ message: "Bug reported successfully", responses });
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
}

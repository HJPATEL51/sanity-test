import { NextApiRequest, NextApiResponse } from "next";
import groq from "groq";
import client from "../../../client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    const fetchQuestion = await client.fetch(
      groq`*[_type == 'questions' && publishedDate == $currentDate] {
        _id,
                title,
                titleEnglish,
                titleFrench,
                difficulty,
                grammarBlurb,
                description,
                audio,
                "animatedGif": animatedGif.asset->url,
                publishedDate,
                options,
                question_examples,
                phonetic,
                slug
      }`,
      { currentDate }
    );

    return res.status(200).send({ data: fetchQuestion[0] });
  } catch (error) {
    console.error("Error Getting Questions", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

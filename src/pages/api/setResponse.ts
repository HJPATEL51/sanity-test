import { NextApiRequest, NextApiResponse } from "next";
import client  from '../../../client';
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      userId,
      createdAt,
      selectedOption,
      result: userAnswerCorrect,
      questionRef,
    } = req.body;
    const uniqueKey = uuidv4();

    const existingRecord = await client.fetch(
      `*[_type == 'user' && userId == $userId]`,
      { userId }
    );

    const newAnswer = {
      _key: uniqueKey,
      createdAt,
      selectedOption,
      result: userAnswerCorrect,
      questionRef,
    };

    if (existingRecord[0]?.responses?.length > 0) {
      // If the record exists, update it by appending data to the 'responses' field
      const docId = existingRecord[0]._id;

      await client
        .patch(docId)
        .insert("after", "responses[-1]", [newAnswer])
        .commit();
      res.status(200).send("Record updated");
    } else {
      // If the record doesn't exist, create a new record in the schema
      const docId = existingRecord[0]._id;

      // Update the user with the new response array
      await client
        .patch(docId)
        .set({ responses: [newAnswer] })
        .commit();

      res.status(201).send("New record created");
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

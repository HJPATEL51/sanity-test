import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../client";
import groq from "groq";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fetchSiteSetting = await client.fetch(
      groq`*[_type == 'siteSettings'] {
        title,
      navLinks,
      faqLinks,
      salesCopy,
      salesImage,
      salesUrl,
      keepLearningSectionCopy,
      keepLearningSectionImage1,
      keepLearningSectionUrl1,
      keepLearningSectionImage2,
      keepLearningSectionUrl2,
      seeAllProduct
      }`
    );

    return res.status(200).send({ data: fetchSiteSetting[1] });
  } catch (error) {
    console.error("Error Getting SiteSetting", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

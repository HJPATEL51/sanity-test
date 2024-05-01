import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const projectToken = process.env.NEXT_PUBLIC_SANITY_AUTH_TOKEN || "";
const projectDataBase = process.env.NEXT_PUBLIC_SANITY_DATABASE || "";

const client = createClient({
  projectId: projectId,
  dataset: projectDataBase,
  token: projectToken,
  useCdn: true,
  apiVersion: "v2024-05-01",
});

export default client;

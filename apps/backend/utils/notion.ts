import { Client } from "@notionhq/client";
import prisma from "@repo/db";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const n2m = new NotionToMarkdown({ notionClient: notion });




export async function extractNotionDoc(notionPageId: string) {
  const mdBlocks = await n2m.pageToMarkdown(notionPageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return mdString; // you can save this in Challenge.contentMd
}




export async function syncChallengeContent(challengeId: string, notionPageId: string) {
  const contentMd = await extractNotionDoc(notionPageId);

  await prisma.challenge.update({
    where: { id: challengeId },
    data: {
      contentMd,
      lastSyncedAt: new Date(),
    },
  });

  return contentMd;
}

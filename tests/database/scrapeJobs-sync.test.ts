import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "../../db/client.js";

describe("Jobs synchronization with database", () => {
  beforeEach(async () => {
    await prisma.company.create({
      data: {
        name: "Test Company",
        URL: "http://example.com",
        logo: null,
        scrapMode: "NAVIGATION",
        jobs: {
          create: [
            {
              title: "Developer",
              location: "Sofia",
              remoteOrHybrid: "Hybrid",
              datePosted: "",
              description: "",
              anchorHref: "http://example/com/1",
            },
            {
              title: "Developer123",
              location: "Plovdiv",
              remoteOrHybrid: "Remote",
              datePosted: "",
              description: "",
              anchorHref: "http://example/com/2",
            },
          ],
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.company.deleteMany();

    await prisma.jobs.deleteMany();
  });

  it("should find jobs after scraping", async () => {
    const jobs = await prisma.jobs.findMany();

    expect(jobs).toHaveLength(2);

    expect(jobs[0]?.title).toBe("Developer");

    expect(jobs[0]?.location).toBe("Sofia");

    expect(jobs[0]?.remoteOrHybrid).toBe("Hybrid");

    expect(jobs[0]?.anchorHref).toBe("http://example/com/1");

    expect(jobs[1]?.title).toBe("Developer123");

    expect(jobs[1]?.location).toBe("Plovdiv");

    expect(jobs[1]?.remoteOrHybrid).toBe("Remote");

    expect(jobs[1]?.anchorHref).toBe("http://example/com/2");
  });
});

import { prisma } from "../db/client.js";

(async () => {
  const companies = [
    {
      id: 2,
      name: "Accenture",
      URL: "https://www.accenture.com/bg-en",
      browserNavigation: null,
      extractionInstructions: {
        container: {
          extractType: "text",
          selector: ".rad-filters-vertical__job-card",
        },
        title: {
          extractType: "text",
          selector: "h3",
        },
        location: {
          extractType: "text",
          selector: ".rad-filters-vertical__job-card-details-location",
        },
        remoteOrHybrid: {
          extractType: "text",
          selector:
            ".rad-filters-vertical__job-card-content-job-posted-date-dynamic-text",
        },
        dataPosted: null,
        anchorHref: { extractType: "attribute", attr: "href" },
        companyID: 2,
      },
      steps: [
        {
          order: 1,
          action: "click",
          selector: "text/Careers",
          companyID: 2,
        },
        {
          order: 2,
          action: "click",
          selector: "text/Search for jobs",
          companyID: 2,
        },
        {
          order: 3,
          action: "click",
          selector: "text/Software Engineering",
          companyID: 2,
        },
      ],
    },
  ];

  for (const company of companies) {
    const { name, URL } = company;

    console.log(name, URL);

    try {
      await prisma.company.create({
        data: {
          name,
          URL,
          browserNavigation: null,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
})();

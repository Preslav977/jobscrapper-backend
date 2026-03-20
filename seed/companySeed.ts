import { prisma } from "../db/client.js";
import type { CompanyInterface } from "../interfaces/CompanyInterface/CompanyInterface.js";

(async () => {
  const companies: CompanyInterface[] = [
    {
      name: "A1 Bulgaria",
      logo: null,
      URL: "http://a1.bg/bg",
      instructions: [
        {
          extractionInstructions: {
            container: {
              selector: '[data-company="A1 Bulgaria"]',
              extractType: "text",
            },
            title: {
              selector: "h3",
              extractType: "text",
            },
            location: {
              attr: "data-location",
              extractType: "attribute",
            },
            remoteOrHybrid: {
              selector: "span:nth-child(3)",
              extractType: "text",
            },
            datePosted: { extractType: "", selector: "" },
            anchorHref: {
              attr: "href",
              extractType: "attribute",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "text/Кариера в А1",
        },
        {
          order: 2,
          action: "click",
          selector: "text/Категория",
        },
        {
          order: 3,
          action: "click",
          selector: "[data-key='it']",
        },
        {
          order: 4,
          action: "click",
          selector: "[aria-label='Търсене на обяви за работа']",
        },
        {
          order: 5,
          action: "clickMore",
          selector: "xpath///button[text()='Load more']",
        },
      ],
    },
    {
      name: "Accenture",
      logo: null,
      URL: "http://accenture.bg/en",
      instructions: [
        {
          extractionInstructions: {
            container: {
              extractType: "text",
              selector: ".rad-filters-vertical__job-card",
            },
            title: { extractType: "text", selector: "h3" },
            location: {
              extractType: "text",
              selector: ".rad-filters-vertical__job-card-details-location",
            },
            remoteOrHybrid: {
              extractType: "",
              selector: "",
            },
            datePosted: {
              extractType: "text",
              selector:
                ".rad-filters-vertical__job-card-content-job-posted-date-dynamic-text",
            },
            anchorHref: {
              extractType: "elementAttribute",
              selector: ".rad-filters-vertical__job-card a",
              attr: "href",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "clickEvaluate",
          selector: "text/Careers",
        },
        {
          order: 2,
          action: "clickEvaluate",
          selector: "text/Search for jobs",
        },
        {
          order: 3,
          action: "clickEvaluate",
          selector: "text/Software Engineering",
        },
      ],
    },
    {
      name: "Acronis",
      logo: null,
      URL: "https://www.acronis.com/en/",
      instructions: [
        {
          extractionInstructions: {
            container: { extractType: "text", selector: ".careers-job" },
            title: { extractType: "text", selector: ".a-dangerous-html" },
            location: { extractType: "text", selector: ".location-text" },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: {
              extractType: "elementAttribute",
              selector: ".careers-job > a",
              attr: "href",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "text/Accept only necessary",
        },
        {
          order: 2,
          action: "click",
          selector: "aria/Careers",
        },
        {
          order: 3,
          action: "click",
          selector: "text/Explore jobs",
        },
        {
          order: 4,
          action: "click",
          selector: "[title='Select your location']",
        },
        {
          order: 5,
          action: "click",
          selector: "[title='Bulgaria']",
        },
        {
          order: 6,
          action: "click",
          selector: "xpath///button[text()='Research and Development']",
        },
        {
          order: 7,
          action: "click",
          selector: "text/Show all open positions",
        },
      ],
    },
    {
      name: "Adstart Media",
      logo: null,
      URL: "https://adstartmedia.com/",
      instructions: [
        {
          extractionInstructions: {
            container: {
              extractType: "text",
              selector: ".job-listing-gridwrapper li",
            },
            title: { extractType: "text", selector: "a" },
            location: { extractType: "text", selector: "lyte-text" },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: { extractType: "attribute", attr: "href" },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "text/Careers",
        },
        {
          order: 2,
          action: "click",
          selector: '[role="combobox"]',
        },
        {
          order: 3,
          action: "clickEvaluate",
          selector: '[data-value="IT Services"]',
        },
      ],
    },
    {
      name: "AIOpsGroup",
      logo: null,
      URL: "https://aiopsgroup.com/",
      instructions: [
        {
          extractionInstructions: {
            container: {
              extractType: "text",
              selector: "#bhrDepartmentID_18474 > ul > li",
            },
            title: { extractType: "text", selector: "li > a" },
            location: {
              extractType: "text",
              selector: ".BambooHR-ATS-Location",
            },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: {
              extractType: "elementAttribute",
              selector: "li > a",
              attr: "href",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "text/Careers",
        },
        {
          order: 2,
          action: "click",
          selector: "#career-link",
        },
      ],
    },
    {
      name: "Amdaris",
      logo: null,
      URL: "https://amdaris.com/",
      instructions: [
        {
          extractionInstructions: {
            container: {
              extractType: "text",
              selector: "#jobs-data-table > tbody > tr",
            },
            title: { extractType: "text", selector: "td > a" },
            location: { extractType: "text", selector: ".country-role" },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: {
              extractType: "elementAttribute",
              selector: "td > a",
              attr: "href",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "#menu-item-11245 > a",
        },
        {
          order: 2,
          action: "select",
          selector: "[name='countries']",
          selectOption: "sofia",
        },
      ],
    },
    {
      name: "Ampeco",
      logo: null,
      URL: "https://ampeco.com/",
      instructions: [
        {
          extractionInstructions: {
            container: {
              extractType: "text",
              selector: ".open_positions > li",
            },
            title: { extractType: "text", selector: ".position" },
            location: { extractType: "text", selector: ".location" },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: { extractType: "attribute", attr: "href" },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "#menu-item-39264 > a",
        },
        {
          order: 2,
          action: "click",
          selector: ".wp-block-button > a",
        },
      ],
    },
    {
      name: "Amusnet",
      logo: null,
      URL: "https://careers-amusnet.com/jobs",
      instructions: [
        {
          extractionInstructions: {
            container: { extractType: "text", selector: ".job-position" },
            title: { extractType: "text", selector: "h3 > a" },
            location: { extractType: "text", selector: ".location-info" },
            remoteOrHybrid: { extractType: "", selector: "" },
            datePosted: { extractType: "", selector: "" },
            anchorHref: {
              extractType: "elementAttribute",
              selector: "a",
              attr: "href",
            },
          },
        },
      ],
      steps: [
        {
          order: 1,
          action: "click",
          selector: "#cookiescript_accept",
        },
        {
          order: 2,
          action: "click",
          selector: "text/Category (0)",
        },
        {
          order: 3,
          action: "click",
          selector: '[value="TechOps & Development"]',
        },
      ],
    },
  ];

  for (const company of companies) {
    const { name, URL, instructions, steps } = company;

    try {
      const doesCompanyAlreadyExits = await prisma.company.findUnique({
        where: {
          name,
        },
      });

      if (!doesCompanyAlreadyExits) {
        await prisma.company.create({
          data: {
            name,
            URL,
            instructions: {
              create: instructions!,
            },
            steps: {
              create: steps!,
            },
          },
        });
      }
    } catch (error) {
      console.log(`Failed to create company: ${error}`);
    }
  }
})();

import { prisma } from "../db/client.js";
(async () => {
    const companies = [
        {
            name: "A1 Bulgaria",
            URL: "http://a1.bg/bg",
            logo: null,
            instructions: [
                {
                    extractionInstructions: {
                        container: {
                            extractType: "text",
                            selector: '[data-company="A1 Bulgaria"]',
                        },
                        title: { extractType: "text", selector: "h3" },
                        location: { extractType: "attribute", selector: "data-location" },
                        remoteOrHybrid: {
                            extractType: "text",
                            selector: "span:nth-child(3)",
                        },
                        datePosted: { extractType: "", selector: "" },
                        anchorHref: { extractType: "attribute", attr: "href" },
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
        // {
        //   name: "Accenture",
        //   URL: "https://www.accenture.com/bg-en",
        //   extractionInstructions: {
        //     container: {
        //       extractType: "text",
        //       selector: ".rad-filters-vertical__job-card",
        //     },
        //     title: { extractType: "text", selector: "h3" },
        //     location: {
        //       extractType: "text",
        //       selector: ".rad-filters-vertical__job-card-details-location",
        //     },
        //     remoteOrHybrid: {
        //       extractType: "text",
        //       selector:
        //         ".rad-filters-vertical__job-card-content-job-posted-date-dynamic-text",
        //     },
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 2,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "clickEvaluate",
        //       selector: "text/Careers",
        //     },
        //     {
        //       order: 2,
        //       action: "clickEvaluate",
        //       selector: "text/Search for jobs",
        //     },
        //     {
        //       order: 3,
        //       action: "clickEvaluate",
        //       selector: "text/Software Engineering",
        //     },
        //   ],
        // },
        // {
        //   name: "Acronis",
        //   URL: "https://www.acronis.com/en/",
        //   extractionInstructions: {
        //     container: { extractType: "text", selector: ".careers-job" },
        //     title: { extractType: "text", selector: ".a-dangerous-html" },
        //     location: { extractType: "text", selector: ".location-text" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: {
        //       extractType: "parentElementAttribute",
        //       selector: ".careers-job > a",
        //       attr: "href",
        //     },
        //     companyID: 3,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "text/Accept only necessary",
        //     },
        //     {
        //       order: 2,
        //       action: "click",
        //       selector: "aria/Careers",
        //     },
        //     {
        //       order: 3,
        //       action: "click",
        //       selector: "text/Explore jobs",
        //     },
        //     {
        //       order: 4,
        //       action: "click",
        //       selector: "[title='Select your location']",
        //     },
        //     {
        //       order: 5,
        //       action: "click",
        //       selector: "[title='Bulgaria']",
        //     },
        //     {
        //       order: 6,
        //       action: "click",
        //       selector: "xpath///button[text()='Research and Development']",
        //     },
        //     {
        //       order: 7,
        //       action: "click",
        //       selector: "text/Show all open positions",
        //     },
        //   ],
        // },
        // {
        //   name: "Adastra",
        //   URL: "https://jobs.adastracorp.com/bulgaria/go/Applications-Development-&-Programming/9023855/",
        //   extractionInstructions: {
        //     container: { extractType: "text", selector: ".data-row" },
        //     title: { extractType: "text", selector: "a" },
        //     location: null,
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 4,
        //   },
        //   steps: [],
        // },
        // {
        //   name: "Adstart Media",
        //   URL: "https://adstartmedia.com/",
        //   extractionInstructions: {
        //     container: {
        //       extractType: "text",
        //       selector: ".job-listing-gridwrapper li",
        //     },
        //     title: { extractType: "text", selector: "a" },
        //     location: { extractType: "text", selector: "lyte-text" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 5,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "text/Careers",
        //     },
        //     {
        //       order: 2,
        //       action: "click",
        //       selector: '[role="combobox"]',
        //     },
        //     {
        //       order: 3,
        //       action: "clickEvaluate",
        //       selector: '[data-value="IT Services"]',
        //     },
        //   ],
        // },
        // {
        //   name: "AIOpsGroup",
        //   URL: "https://aiopsgroup.com/",
        //   extractionInstructions: {
        //     container: {
        //       extractType: "text",
        //       selector: "#bhrDepartmentID_18474 > ul > li",
        //     },
        //     title: { extractType: "text", selector: "li > a" },
        //     location: { extractType: "text", selector: ".BambooHR-ATS-Location" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 6,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "text/Careers",
        //     },
        //     {
        //       order: 2,
        //       action: "click",
        //       selector: "#career-link",
        //     },
        //     {
        //       order: 3,
        //       action: "click",
        //       selector: '[data-value="IT Services"]',
        //     },
        //   ],
        // },
        // {
        //   name: "Amdaris",
        //   URL: "https://amdaris.com/",
        //   extractionInstructions: {
        //     container: {
        //       extractType: "text",
        //       selector: "#jobs-data-table > tbody > tr",
        //     },
        //     title: { extractType: "text", selector: "td > a" },
        //     location: { extractType: "text", selector: ".country-role" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: {
        //       extractType: "parentElementAttribute",
        //       selector: "td > a",
        //       attr: "href",
        //     },
        //     companyID: 7,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "#menu-item-11245 > a",
        //     },
        //     {
        //       order: 2,
        //       action: "select",
        //       selector: "[name='countries']",
        //       selectOption: "sofia",
        //     },
        //   ],
        // },
        // {
        //   name: "Ampeco",
        //   URL: "https://ampeco.com/",
        //   extractionInstructions: {
        //     container: { extractType: "text", selector: ".open_positions > li" },
        //     title: { extractType: "text", selector: ".position" },
        //     location: { extractType: "text", selector: ".location" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 8,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "#menu-item-39264 > a",
        //     },
        //     {
        //       order: 2,
        //       action: "click",
        //       selector: ".wp-block-button > a",
        //     },
        //   ],
        // },
        // {
        //   name: "Amusnet",
        //   URL: "https://careers-amusnet.com/jobs",
        //   extractionInstructions: {
        //     container: { extractType: "text", selector: ".job-position" },
        //     title: { extractType: "text", selector: "h3 > a" },
        //     location: { extractType: "text", selector: ".location-info" },
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: { extractType: "attribute", attr: "href" },
        //     companyID: 9,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "click",
        //       selector: "#cookiescript_accept",
        //     },
        //     {
        //       order: 2,
        //       action: "click",
        //       selector: "text/Category (0)",
        //     },
        //     {
        //       order: 3,
        //       action: "click",
        //       selector: '[value="TechOps & Development"]',
        //     },
        //   ],
        // },
        // {
        //   name: "Anthill",
        //   URL: "https://anthill.bamboohr.com/careers",
        //   extractionInstructions: {
        //     container: null,
        //     title: null,
        //     location: null,
        //     remoteOrHybrid: null,
        //     dataPosted: null,
        //     anchorHref: null,
        //     companyID: 10,
        //   },
        //   steps: [
        //     {
        //       order: 1,
        //       action: "fetch",
        //       url: "https://anthill.bamboohr.com/careers/list",
        //       selector: "",
        //     },
        //   ],
        // },
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
                            create: instructions,
                        },
                        steps: {
                            create: steps,
                        },
                    },
                });
            }
        }
        catch (error) {
            console.log(`Failed to create company: ${error}`);
        }
    }
})();
//# sourceMappingURL=companySeed.js.map
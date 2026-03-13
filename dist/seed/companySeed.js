import { prisma } from "../db/client.js";
(async () => {
    const companies = [
        {
            id: 1,
            name: "A1 Bulgaria",
            URL: "http://a1.bg/bg",
            browserNavigation: null,
            extractionInstructions: {
                container: {
                    extractType: "text",
                    selector: '[data-company="A1 Bulgaria"]',
                },
                title: { extractType: "text", selector: "h3" },
                location: { extractType: "attribute", selector: "data-location" },
                remoteOrHybrid: { extractType: "text", selector: "span:nth-child(3)" },
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 1,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "text/Кариера в А1",
                    instructionsID: 1,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: "text/Категория",
                    instructionsID: 1,
                },
                {
                    id: 3,
                    order: 3,
                    action: "click",
                    selector: "[data-key='it']",
                    instructionsID: 1,
                },
                {
                    id: 4,
                    order: 4,
                    action: "click",
                    selector: "[aria-label='Търсене на обяви за работа']",
                    instructionsID: 1,
                },
                {
                    id: 5,
                    order: 5,
                    action: "clickMore",
                    selector: "xpath///button[text()='Load more']",
                    instructionsID: 1,
                },
            ],
        },
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
                title: { extractType: "text", selector: "h3" },
                location: {
                    extractType: "text",
                    selector: ".rad-filters-vertical__job-card-details-location",
                },
                remoteOrHybrid: {
                    extractType: "text",
                    selector: ".rad-filters-vertical__job-card-content-job-posted-date-dynamic-text",
                },
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 2,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "text/Careers",
                    instructionsID: 2,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: "text/Search for jobs",
                    instructionsID: 2,
                },
                {
                    id: 3,
                    order: 3,
                    action: "click",
                    selector: "text/Software Engineering",
                    instructionsID: 2,
                },
            ],
        },
        {
            id: 3,
            name: "Acronis",
            URL: "https://www.acronis.com/en/",
            browserNavigation: null,
            extractionInstructions: {
                container: { extractType: "text", selector: ".careers-job" },
                title: { extractType: "text", selector: ".a-dangerous-html" },
                location: { extractType: "text", selector: ".location-text" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: {
                    extractType: "elementAttribute",
                    selector: ".careers-job > a",
                    attr: "href",
                },
                companyID: 3,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "text/Accept only necessary",
                    instructionsID: 3,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: "aria/Careers",
                    instructionsID: 3,
                },
                {
                    id: 3,
                    order: 3,
                    action: "click",
                    selector: "text/Explore jobs",
                    instructionsID: 3,
                },
                {
                    id: 4,
                    order: 4,
                    action: "click",
                    selector: "[title='Select your location']",
                    instructionsID: 3,
                },
                {
                    id: 5,
                    order: 5,
                    action: "click",
                    selector: "[title='Bulgaria']",
                    instructionsID: 3,
                },
                {
                    id: 6,
                    order: 6,
                    action: "click",
                    selector: "xpath///button[text()='Research and Development']",
                    instructionsID: 3,
                },
                {
                    id: 7,
                    order: 7,
                    action: "click",
                    selector: "text/Show all open positions",
                    instructionsID: 3,
                },
            ],
        },
        {
            id: 4,
            name: "Adastra",
            URL: "https://jobs.adastracorp.com/bulgaria/go/Applications-Development-&-Programming/9023855/",
            browserNavigation: null,
            extractionInstructions: {
                container: { extractType: "text", selector: ".data-row" },
                title: { extractType: "text", selector: "a" },
                location: null,
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 4,
            },
            steps: [],
        },
        {
            id: 5,
            name: "Adstart Media",
            URL: "https://adstartmedia.com/",
            browserNavigation: null,
            extractionInstructions: {
                container: {
                    extractType: "text",
                    selector: ".job-listing-gridwrapper > li",
                },
                title: { extractType: "text", selector: "a" },
                location: { extractType: "text", selector: "lyte-text" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 5,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "text/Careers",
                    instructionsID: 5,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: '[role="combobox"]',
                    instructionsID: 5,
                },
                {
                    id: 3,
                    order: 3,
                    action: "clickEvaluate",
                    selector: '[data-value="IT Services"]',
                    instructionsID: 5,
                },
            ],
        },
        {
            id: 6,
            name: "AIOpsGroup",
            URL: "https://aiopsgroup.com/",
            browserNavigation: null,
            extractionInstructions: {
                container: {
                    extractType: "text",
                    selector: "#bhrDepartmentID_18474 > ul > li",
                },
                title: { extractType: "text", selector: "li > a" },
                location: { extractType: "text", selector: ".BambooHR-ATS-Location" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 6,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "text/Careers",
                    instructionsID: 6,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: "#career-link",
                    instructionsID: 6,
                },
                {
                    id: 3,
                    order: 3,
                    action: "click",
                    selector: '[data-value="IT Services"]',
                    instructionsID: 6,
                },
            ],
        },
        {
            id: 7,
            name: "Amdaris",
            URL: "https://amdaris.com/",
            browserNavigation: null,
            extractionInstructions: {
                container: {
                    extractType: "text",
                    selector: "#jobs-data-table > tbody > tr",
                },
                title: { extractType: "text", selector: "td > a" },
                location: { extractType: "text", selector: ".country-role" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: {
                    extractType: "elementAttribute",
                    selector: "td > a",
                    attr: "href",
                },
                companyID: 7,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "#menu-item-11245 > a",
                    instructionsID: 7,
                },
                {
                    id: 2,
                    order: 2,
                    action: "select",
                    selector: "[name='countries']",
                    option: "sofia",
                    instructionsID: 7,
                },
            ],
        },
        {
            id: 8,
            name: "Ampeco",
            URL: "https://ampeco.com/",
            browserNavigation: null,
            extractionInstructions: {
                container: { extractType: "text", selector: ".open_positions > li" },
                title: { extractType: "text", selector: ".position" },
                location: { extractType: "text", selector: ".location" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 8,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "#menu-item-39264 > a",
                    instructionsID: 8,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: ".wp-block-button > a",
                    instructionsID: 8,
                },
            ],
        },
        {
            id: 9,
            name: "Amusnet",
            URL: "https://careers-amusnet.com/jobs",
            browserNavigation: null,
            extractionInstructions: {
                container: { extractType: "text", selector: ".job-position" },
                title: { extractType: "text", selector: "h3 > a" },
                location: { extractType: "text", selector: ".location-info" },
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: { extractType: "attribute", attr: "href" },
                companyID: 9,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "click",
                    selector: "#cookiescript_accept",
                    instructionsID: 9,
                },
                {
                    id: 2,
                    order: 2,
                    action: "click",
                    selector: "text/Category (0)",
                    instructionsID: 9,
                },
                {
                    id: 3,
                    order: 3,
                    action: "click",
                    selector: '[value="TechOps & Development"]',
                    instructionsID: 9,
                },
            ],
        },
        {
            id: 10,
            name: "Anthill",
            URL: "https://anthill.bamboohr.com/careers",
            browserNavigation: null,
            extractionInstructions: {
                container: null,
                title: null,
                location: null,
                remoteOrHybrid: null,
                dataPosted: null,
                anchorHref: null,
                companyID: 10,
            },
            steps: [
                {
                    id: 1,
                    order: 1,
                    action: "fetch",
                    url: "https://anthill.bamboohr.com/careers/list",
                    selector: "",
                    instructionsID: 10,
                },
            ],
        },
    ];
    for (const company of companies) {
        const { name, URL, extractionInstructions, steps } = company;
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
                        browserNavigation: null,
                        instructions: {
                            create: { extractionInstructions },
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
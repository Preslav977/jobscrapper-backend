import { prisma } from "../dist/db/client.js";
(async () => {
    const companies = [
        {
            name: "A1 Bulgaria",
            logo: null,
            URL: "https://jobs.a1.com/bg/jobs/?country=bulgaria&job-category=it",
            scrapMode: "NAVIGATION",
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
                        description: {
                            extractType: "text",
                            selector: "main > div > div:has(p)",
                        },
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
                    action: "clickMore",
                    selector: "xpath///button[text()='Load more']",
                    selectOption: null,
                    url: null,
                },
            ],
        },
        {
            name: "Accenture",
            logo: null,
            URL: "https://www.accenture.com/bg-en/careers/jobsearch?aoi=Software%20Engineering",
            scrapMode: "NAVIGATION",
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
                            selector: ".rad-filters-vertical__job-card-content-job-posted-date-dynamic-text",
                        },
                        description: {
                            extractType: "text",
                            selector: ".rad-job-detail__accordion",
                        },
                        anchorHref: {
                            extractType: "elementAttribute",
                            selector: ".rad-filters-vertical__job-card a",
                            attr: "href",
                        },
                    },
                },
            ],
            steps: [],
        },
        {
            name: "Acronis",
            logo: null,
            URL: "https://www.acronis.com/en/careers/jobs/",
            scrapMode: "NAVIGATION",
            instructions: [
                {
                    extractionInstructions: {
                        container: { extractType: "text", selector: ".careers-job" },
                        title: { extractType: "text", selector: ".a-dangerous-html" },
                        location: { extractType: "text", selector: ".location-text" },
                        remoteOrHybrid: { extractType: "", selector: "" },
                        datePosted: { extractType: "", selector: "" },
                        description: { extractType: "text", selector: ".main-content" },
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
                    selector: "[title='Select your location']",
                    selectOption: null,
                    url: null,
                },
                {
                    order: 2,
                    action: "click",
                    selector: "[title='Bulgaria']",
                    selectOption: null,
                    url: null,
                },
                {
                    order: 3,
                    action: "click",
                    selector: "xpath///button[text()='Research and Development']",
                    selectOption: null,
                    url: null,
                },
                {
                    order: 4,
                    action: "click",
                    selector: "text/Show all open positions",
                    selectOption: null,
                    url: null,
                },
            ],
        },
        {
            name: "Adstart Media",
            logo: null,
            URL: "https://adstartmedia.zohorecruit.com/jobs/Careers",
            scrapMode: "NAVIGATION",
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
                        description: {
                            extractType: "text",
                            selector: "career-website-detail-template-2",
                        },
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
                    action: "clickEvaluate",
                    selector: '[role="combobox"]',
                    selectOption: null,
                    url: null,
                },
                {
                    order: 2,
                    action: "clickEvaluate",
                    selector: '[data-value="IT Services"]',
                    selectOption: null,
                    url: null,
                },
            ],
        },
        {
            name: "Adastra",
            logo: null,
            URL: "https://jobs.adastracorp.com/bulgaria/go/Applications-Development-&-Programming/9023855/",
            scrapMode: "NAVIGATION",
            instructions: [
                {
                    extractionInstructions: {
                        container: {
                            selector: ".data-row",
                            extractType: "text",
                        },
                        title: {
                            selector: "a",
                            extractType: "text",
                        },
                        location: {
                            extractType: "",
                            attr: "",
                        },
                        remoteOrHybrid: {
                            extractType: "",
                            selector: "",
                        },
                        datePosted: { extractType: "", selector: "" },
                        description: { extractType: "text", selector: ".job" },
                        anchorHref: {
                            extractType: "elementAttribute",
                            selector: "a",
                            attr: "href",
                        },
                    },
                },
            ],
            steps: [],
        },
        {
            name: "AIOpsGroup",
            logo: null,
            URL: "https://aiopsgroup.com/careers/",
            scrapMode: "NAVIGATION",
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
                        description: {
                            extractType: "text",
                            selector: "section",
                        },
                        anchorHref: {
                            extractType: "elementAttribute",
                            selector: "li > a",
                            attr: "href",
                        },
                    },
                },
            ],
            steps: [],
        },
        {
            name: "Amdaris",
            logo: null,
            URL: "https://amdaris.com/jobs/",
            scrapMode: "NAVIGATION",
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
                        description: { extractType: "text", selector: "main" },
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
                    action: "select",
                    selector: "[name='countries']",
                    selectOption: "sofia",
                    url: null,
                },
            ],
        },
        {
            name: "Ampeco",
            logo: null,
            URL: "https://ampeco.com/",
            scrapMode: "NAVIGATION",
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
                        description: { extractType: "text", selector: "section" },
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
                    selector: "#menu-item-39264 > a",
                    selectOption: null,
                    url: null,
                },
                {
                    order: 2,
                    action: "click",
                    selector: ".wp-block-button > a",
                    selectOption: null,
                    url: null,
                },
            ],
        },
        {
            name: "Amusnet",
            logo: null,
            URL: "https://careers-amusnet.com/jobs",
            scrapMode: "NAVIGATION",
            instructions: [
                {
                    extractionInstructions: {
                        container: { extractType: "text", selector: ".job-position" },
                        title: { extractType: "text", selector: "h3 > a" },
                        location: { extractType: "text", selector: ".location-info" },
                        remoteOrHybrid: { extractType: "", selector: "" },
                        datePosted: { extractType: "", selector: "" },
                        description: { extractType: "text", selector: ".job" },
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
                    selectOption: null,
                    url: null,
                },
                {
                    order: 2,
                    action: "click",
                    selector: "text/Category (0)",
                    selectOption: null,
                    url: null,
                },
                {
                    order: 3,
                    action: "clickEvaluate",
                    selector: '[value="TechOps & Development"]',
                    selectOption: null,
                    url: null,
                },
            ],
        },
        {
            name: "Anthill",
            logo: null,
            URL: "https://anthill.bamboohr.com/careers/",
            scrapMode: "FETCH",
            instructions: [
                {
                    extractionInstructions: {
                        container: {
                            selector: "",
                            extractType: "",
                            url: "",
                        },
                        title: {
                            selector: "",
                            extractType: "",
                        },
                        location: {
                            extractType: "",
                            attr: "",
                        },
                        remoteOrHybrid: {
                            extractType: "",
                            selector: "",
                        },
                        datePosted: { extractType: "", selector: "" },
                        description: { extractType: "text", selector: "section" },
                        anchorHref: {
                            extractType: "",
                            selector: "",
                            attr: "",
                        },
                    },
                },
            ],
            steps: [
                {
                    order: 1,
                    action: "fetch",
                    selector: "",
                    selectOption: "",
                    url: "https://anthill.bamboohr.com/careers/list",
                },
            ],
        },
    ];
    for (const company of companies) {
        const { name, URL, scrapMode, instructions, steps } = company;
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
                        scrapMode,
                        instructions: {
                            create: instructions,
                        },
                        steps: {
                            create: steps,
                        },
                    },
                });
                console.log("Successfully created all the companies in the script!");
            }
        }
        catch (error) {
            console.log(`Failed to create company ${company.name}, ${error}`);
        }
    }
})();
//# sourceMappingURL=companySeed.js.map
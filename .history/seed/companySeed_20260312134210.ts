import { prisma } from "../db/client.js";

(async () => {
  const companies = [
    {
      name: "Accenture",
      URL: "https://www.accenture.com/bg-en",
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

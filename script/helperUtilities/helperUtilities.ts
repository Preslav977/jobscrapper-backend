const width = Math.floor(Math.random() * (1920 - 1024) + 1024);

const height = Math.floor(Math.random() * (1080 - 768) + 768);

const arrayOfDifferentTimezones = [
  "Europe/Paris",
  "Europe/Andorra",
  "Europe/Tirane",
  "Europe/Vienna",
  "Europe/Sarajevo",
  "Europe/Brussels",
  "Europe/Zurich",
  "Europe/Prague",
  "Europe/Berlin",
  "Europe/Copenhagen",
  "Europe/Madrid",
  "Europe/Gibraltar",
  "Europe/Zagreb",
  "Europe/Budapest",
  "Europe/Rome",
  "Europe/Vaduz",
  "Europe/Luxembourg",
  "Europe/Monaco",
  "Europe/Podgorica",
  "Europe/Skopje",
  "Europe/Malta",
  "Europe/Amsterdam",
  "Europe/Oslo",
  "Europe/Warsaw",
  "Europe/Belgrade",
  "Europe/Stockholm",
  "Europe/Ljubljana",
  "Europe/Bratislava",
  "Europe/San_Marino",
  "Europe/Belgrade",
  "Africa/Tunis",
  "Europe/Vatican",
];

const shuffleArrayTimezones = Math.floor(
  Math.random() * arrayOfDifferentTimezones.length,
);

const getRandomTimezone = arrayOfDifferentTimezones[shuffleArrayTimezones];

export { getRandomTimezone, height, width };

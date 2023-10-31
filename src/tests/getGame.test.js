test("Retornar o jogo League of Legendes com ID 1", async () => {
  const link = "https://pcmakerapi.onrender.com/games/1";
  const game = await fetch(link).then((result) => {
    return result.json();
  });
  const gameExpected = {
    app: {
      appid: 1,
      name: "League of Legends",
    },
    image: "",
    minimum: {
      OS: "Win 7, 8, 10, 11",
      CPU: "Intel: Core i3-530 / AMD: A6-3650 / ARM: incompatível",
      GPU: "NVidia: GeForce 9600GT / AMD: HD 6570 / Intel: Intel HD 4600 Integrated Graphics",
      RAM: "2 GB RAM",
      Storage: "16 GB (HDD)",
    },
    recommended: {
      OS: "Win 11",
      CPU: "Intel: Core i5-3300 / AMD: Ryze 3 1200 / ARM: incompatível",
      GPU: "NVidia: GeForce 560 / AMD: Radeon HD 6950 / Intel: Intel UHD 630 Integrated Graphics",
      RAM: "4 GB RAM",
      Storage: "16 GB (HDD)",
    },
  };
  expect(game).toEqual(gameExpected);
});

test("Retornar o jogo Valornt com ID 2", async () => {
  const link = "https://pcmakerapi.onrender.com/games/2";
  const game = await fetch(link).then((result) => {
    return result.json();
  });
  const gameExpected = {
    app: {
      appid: 2,
      name: "Valorant",
    },
    image: "",
    minimum: {
      OS: "Windows 10 (Build 17134+) 64-bit / Windows 11 64-bit",
      CPU: "Intel Core 2 Duo E8400 / AMD Athlon 200GE",
      GPU: "Intel HD 4000 / AMD Radeon R5 200",
      RAM: "4 GB de RAM",
      Storage: "",
    },
    recommended: {
      OS: "Windows 10 (Build 17134+) 64-bit / Windows 11 64-bit",
      CPU: "Intel i3-4150 / AMD Ryzen 3 1200 ",
      GPU: "GeForce GT 730 / AMD Radeon R7 240",
      RAM: "4 GB de RAM",
      Storage: "",
    },
  };
  expect(game).toEqual(gameExpected);
});

test("Retornar os jogos com no minimo 8gb de RAM", async () => {
  const link = "https://pcmakerapi.onrender.com/games";
  const games = await fetch(link).then((response) => response.json());
  let gameNeeds8GB = games;
  let qtd = 0;
  for (game of gameNeeds8GB) if (game.minimum.RAM === "8 GB RAM") qtd += 1;
  expect(qtd).toEqual(33);
});

test("Retornar os jogos com no minimo 6gb de RAM", async () => {
  const link = "https://pcmakerapi.onrender.com/games";
  const games = await fetch(link).then((response) => response.json());
  let gameNeeds6GB = games;
  let qtd = 0;
  for (game of gameNeeds6GB) if (game.minimum.RAM === "6 GB RAM") qtd += 1;
  expect(qtd).toEqual(13);
});

test("Retornar os jogos com GPU NVIDIA GeForce GTX 1060", async () => {
  const link = "https://pcmakerapi.onrender.com/games";
  const games = await fetch(link).then((response) => response.json());
  let qtd = 0;
  for (game of games) {
    let gpu = game.recommended.GPU;
    if (gpu !== undefined && gpu.includes("NVIDIA GeForce GTX 1060")) qtd += 1;
  }
  expect(qtd).toEqual(5);
});

test("Retornar 102 jogos", async () => {
  const link = "https://pcmakerapi.onrender.com/games";
  const games = await fetch(link).then((response) => response.json());
  let vetor = [];
  vetor = games;
  expect(vetor.length).toEqual(102);
});

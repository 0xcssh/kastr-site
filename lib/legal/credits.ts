import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

// Attribution required by CC BY-SA for the catalog (CLAUDE.md §8.1). Keep this list in sync with the
// wikis imported by diecast/data/fandom_import.py.
export const catalogSources = [
  { brand: "Hot Wheels", url: "https://hotwheels.fandom.com" },
  { brand: "Matchbox", url: "https://matchbox.fandom.com" },
  { brand: "Tomica", url: "https://tomica.fandom.com" },
  { brand: "Mini GT", url: "https://minigt.fandom.com" },
  { brand: "M2 Machines", url: "https://m2machines.fandom.com" },
  { brand: "Maisto", url: "https://maisto.fandom.com" },
  { brand: "Racing Champions", url: "https://racingchampions.fandom.com" },
  { brand: "Majorette", url: "https://majorette-model-cars.fandom.com" },
  { brand: "Tarmac Works", url: "https://tarmacworks.fandom.com" },
  { brand: "Pop Race", url: "https://pop-race.fandom.com" },
] as const;

const CC = "https://creativecommons.org/licenses/by-sa/3.0/";
const FANDOM_LICENSING = "https://www.fandom.com/licensing";
const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;
const sourceList = catalogSources.map((s) => `${s.brand}: [${s.url.replace("https://", "")}](${s.url})`);

const en: LegalDoc = {
  title: "Credits",
  description:
    "Where the Kastr catalog comes from: community wikis on Fandom, shared under the Creative Commons Attribution-ShareAlike license.",
  intro: [
    "Kastr's catalog stands on years of work by collectors who document every casting, color and wheel on community wikis. Thank you to all of them.",
  ],
  sections: [
    {
      id: "catalog",
      heading: "Catalog data",
      blocks: [
        `The catalog text data (names, years, series, colors, toy numbers, notes) comes from the following wikis hosted on Fandom. Their text is available under the [Creative Commons Attribution-ShareAlike license](${CC}) (CC BY-SA), as stated in [Fandom's licensing terms](${FANDOM_LICENSING}).`,
        { list: sourceList },
        "Changes we made: we extracted the tables of each wiki page, normalized names, years, series and toy numbers, merged duplicates and inferred rarities such as Treasure Hunts from the series and notes. The resulting catalog data is shared under the same CC BY-SA license. Each entry in the app keeps a reference to its source page.",
      ],
    },
    {
      id: "photos",
      heading: "Photos",
      blocks: [
        `Car photos shown in the app belong to their respective authors and are used with their permission. They are not covered by the CC BY-SA license of the text. If you are the author of a photo and want it removed, write to ${mail}.`,
      ],
    },
    {
      id: "software",
      heading: "Software and fonts",
      blocks: [
        {
          list: [
            "Icons on this website: [Phosphor Icons](https://phosphoricons.com), MIT license.",
            "Fonts on this website: Barlow Condensed and Geist, SIL Open Font License.",
            "This website is built with Next.js (MIT license).",
          ],
        },
      ],
    },
    {
      id: "trademarks",
      heading: "Trademarks",
      blocks: [
        "Kastr is independent and not affiliated with Mattel, Inc. Hot Wheels and Matchbox are trademarks of Mattel, Inc. Majorette, Tomica, Mini GT, M2 Machines, Maisto, Racing Champions, Tarmac Works and Pop Race belong to their respective owners. These names are used only to describe the cars in the catalog.",
      ],
    },
  ],
};

const fr: LegalDoc = {
  title: "Crédits",
  description:
    "D'où vient le catalogue de Kastr : des wikis communautaires sur Fandom, partagés sous licence Creative Commons Attribution - Partage dans les mêmes conditions.",
  intro: [
    "Le catalogue de Kastr repose sur des années de travail de collectionneurs qui documentent chaque moulage, chaque couleur et chaque roue sur des wikis communautaires. Merci à eux.",
  ],
  sections: [
    {
      id: "catalog",
      heading: "Données du catalogue",
      blocks: [
        `Les données textuelles du catalogue (noms, années, séries, couleurs, numéros de jouet, notes) viennent des wikis suivants, hébergés par Fandom. Leur texte est disponible sous [licence Creative Commons Attribution - Partage dans les mêmes conditions](${CC}) (CC BY-SA), comme l'indiquent les [conditions de licence de Fandom](${FANDOM_LICENSING}).`,
        { list: sourceList },
        "Nos modifications : nous avons extrait les tableaux de chaque page, normalisé les noms, années, séries et numéros de jouet, fusionné les doublons et déduit les raretés, comme les Treasure Hunts, à partir des séries et des notes. Les données de catalogue qui en résultent sont partagées sous la même licence CC BY-SA. Chaque fiche de l'app garde la référence de sa page d'origine.",
      ],
    },
    {
      id: "photos",
      heading: "Photos",
      blocks: [
        `Les photos de voitures affichées dans l'app appartiennent à leurs auteurs et sont utilisées avec leur accord. Elles ne sont pas couvertes par la licence CC BY-SA du texte. Si vous êtes l'auteur d'une photo et souhaitez son retrait, écrivez à ${mail}.`,
      ],
    },
    {
      id: "software",
      heading: "Logiciels et polices",
      blocks: [
        {
          list: [
            "Icônes de ce site : [Phosphor Icons](https://phosphoricons.com), licence MIT.",
            "Polices de ce site : Barlow Condensed et Geist, licence SIL Open Font License.",
            "Ce site est construit avec Next.js (licence MIT).",
          ],
        },
      ],
    },
    {
      id: "trademarks",
      heading: "Marques",
      blocks: [
        "Kastr est indépendante et n'est pas affiliée à Mattel, Inc. Hot Wheels et Matchbox sont des marques de Mattel, Inc. Majorette, Tomica, Mini GT, M2 Machines, Maisto, Racing Champions, Tarmac Works et Pop Race appartiennent à leurs propriétaires respectifs. Ces noms servent uniquement à décrire les voitures du catalogue.",
      ],
    },
  ],
};

export function getCredits(locale: Locale): LegalDoc {
  return locale === "fr" ? fr : en;
}

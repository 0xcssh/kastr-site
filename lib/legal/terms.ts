import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

// Terms of use + French legal notice. Covers App Review 1.2 (user-generated content) and 3.1.2
// (auto-renewing subscriptions) without hardcoding any price. Draft: have it reviewed by a lawyer.

const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;
const L = config.legal;
const EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

const en: LegalDoc = {
  title: "Terms of use",
  description:
    "The rules for using Kastr: the service, Kastr Pro subscriptions, community rules, the catalog license and the legal notice.",
  dated: true,
  intro: [
    `These terms apply to the Kastr iPhone app and the kastr.app website. By using Kastr, you accept them. If you do not agree, please do not use the app. Questions: ${mail}.`,
  ],
  sections: [
    {
      id: "service",
      heading: "The service",
      blocks: [
        "Kastr helps diecast car collectors look up cars in a catalog, keep track of their collection and wishlist, and recognize rare cars such as Treasure Hunts. Some features (scanning, values, community) are marked \"coming soon\" and are not available yet.",
        "We work to keep Kastr available and accurate, but we may change, add or remove features, and the app may sometimes be unavailable.",
      ],
    },
    {
      id: "accounts",
      heading: "Accounts",
      blocks: [
        "Most of Kastr works without an account. Community features, feedback and contributions require an account created with Sign in with Apple. You must be at least 13, or the minimum age required in your country, to create one.",
        "You are responsible for what happens under your account. One person, one account. You can delete your account at any time from the app.",
      ],
    },
    {
      id: "pro",
      heading: "Kastr Pro subscriptions",
      blocks: [
        "Kastr is free to download. Kastr Pro is an optional auto-renewing subscription that unlocks extra features, sold through Apple's App Store. The price, the length of each period and the features included are shown in the app before you confirm the purchase, in your local currency.",
        {
          list: [
            "Payment is charged to your Apple ID account when you confirm the purchase.",
            "The subscription renews automatically for the same period unless auto-renew is turned off at least 24 hours before the end of the current period. Your account is charged for renewal within the 24 hours before the current period ends.",
            "If a free trial is offered, it converts to a paid subscription at the end of the trial unless you cancel at least 24 hours before it ends. Any unused part of a free trial is lost when you buy a subscription.",
            "You can manage or cancel your subscription in your Apple ID settings (Settings, your name, Subscriptions). Cancelling stops the next renewal; you keep Kastr Pro until the end of the period already paid.",
            "Refunds are handled by Apple under its own rules, at reportaproblem.apple.com.",
            "If the price changes, Apple informs you in advance and, where the law or Apple's rules require it, asks for your consent before renewing at the new price.",
          ],
        },
        "The free version has limits, for example on the number of cars in a garage or on scan credits once scanning is available. These limits are shown in the app and may change; a change never removes cars you already saved.",
      ],
    },
    {
      id: "credits",
      heading: "Scan credits (coming soon)",
      blocks: [
        "Scans use credits. Credits have no cash value, cannot be sold or transferred, and are only usable in Kastr. If a scan fails on our side, its credit is returned. Creating several accounts or devices to collect free credits or referral rewards is not allowed.",
      ],
    },
    {
      id: "community",
      heading: "Community rules",
      blocks: [
        "Community features let you publish posts, photos, comments, cars and prices that other users can see. You are responsible for what you publish. There is no tolerance for objectionable content or abusive users. You must not publish anything that:",
        {
          list: [
            "is illegal, threatening, harassing, hateful, discriminatory, sexually explicit or violent;",
            "targets or reveals private information about another person;",
            "impersonates someone or misleads people about who you are;",
            "is spam, a scam, an advertisement, or offers counterfeit or stolen goods;",
            "infringes someone else's copyright, trademark or other rights, including photos you did not take or do not have permission to share;",
            "deliberately adds false data to the catalog or false prices.",
          ],
        },
        "How we enforce these rules:",
        {
          list: [
            "Filtering: posts and photos may be checked by automated filters for objectionable content before they are published.",
            "Reporting: every post, comment, photo and profile has a report option in the app.",
            "Blocking: you can block any user. Their content is hidden from you right away and they can no longer interact with you.",
            `Action: we review reports and act on objectionable content within 24 hours, by removing it and, where needed, suspending or banning the user who posted it. You can also report content by writing to ${mail}.`,
          ],
        },
      ],
    },
    {
      id: "your-content",
      heading: "Your content",
      blocks: [
        "You keep the rights to what you publish. You give us a worldwide, non-exclusive, royalty-free license to host, store, reproduce, resize and display it in Kastr, for as long as it stays published, so the service can work. This license ends when you delete the content or your account, except for copies other users have already shared within the app and for backups that rotate out.",
        "Catalog contributions are different: when you submit a car, a correction or a sale price and it is approved, you agree that the data (not your name) becomes part of the catalog and is shared under the Creative Commons Attribution-ShareAlike license, like the rest of the catalog. Prices are only shown in aggregate.",
      ],
    },
    {
      id: "catalog",
      heading: "Catalog, rarities and values",
      blocks: [
        "The catalog is built from community wikis shared under the CC BY-SA license (see Credits) and from user contributions. It may contain errors or gaps.",
        "Rarities and values shown in Kastr are estimates, for information only. They are not an appraisal, an offer to buy or sell, or financial advice, and a car may sell for more or less than shown. Kastr is a collector's app: it does not buy, sell or broker cars.",
        "Some links may take you to third-party sites, such as marketplaces. Some of those links may be affiliate links, which means we may earn a commission if you buy, at no extra cost to you. We are not a party to any transaction you make on another site.",
      ],
    },
    {
      id: "ip",
      heading: "Intellectual property and trademarks",
      blocks: [
        "The Kastr name, app, design and code belong to us. Catalog data is shared under CC BY-SA as described in Credits. Car photos belong to their authors.",
        "Kastr is independent and not affiliated with Mattel, Inc. Hot Wheels and Matchbox are trademarks of Mattel, Inc.; other brand names belong to their respective owners and are used only to describe the cars in the catalog.",
      ],
    },
    {
      id: "use",
      heading: "Acceptable use",
      blocks: [
        "Do not copy the app, reverse engineer it, scrape our servers, use bots or automated accounts, try to bypass limits or credits, or interfere with the service or other users.",
      ],
    },
    {
      id: "apple",
      heading: "Apple",
      blocks: [
        `The app is licensed to you under Apple's [Licensed Application End User License Agreement](${EULA}), together with these terms. These terms are between you and us, not Apple. Apple is not responsible for the app, its content, maintenance, support or any claim about it. If the app fails to conform to an applicable warranty, you may notify Apple, which may refund the purchase price, if any; Apple has no other warranty obligation. Apple and its subsidiaries are third-party beneficiaries of these terms and may enforce them against you.`,
      ],
    },
    {
      id: "termination",
      heading: "Suspension and termination",
      blocks: [
        "You can stop using Kastr and delete your account at any time. We may suspend or close an account that seriously or repeatedly breaks these terms, after a warning where possible.",
      ],
    },
    {
      id: "liability",
      heading: "Warranty and liability",
      blocks: [
        "Kastr is provided as is. To the extent the law allows, we do not guarantee that the catalog or the values are complete or accurate, and we are not liable for indirect losses, such as a purchase decision based on a value shown in the app.",
        "Nothing in these terms limits the rights you have as a consumer under the mandatory law of your country, including the legal guarantee of conformity for digital content, or our liability for gross negligence, intentional misconduct, or death or personal injury.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        "We may update these terms. We change the date at the top and, for important changes, tell you in the app before they apply. If you keep using Kastr afterwards, the new terms apply.",
      ],
    },
    {
      id: "law",
      heading: "Governing law and disputes",
      blocks: [
        "These terms are governed by French law. If you are a consumer, you also keep the protection of the mandatory rules of the country where you live.",
        `If something goes wrong, write to us first at ${mail}; most problems are solved that way. If we cannot agree, consumers can use a consumer mediator free of charge: ${L.consumerMediator}. You can also go to the competent courts.`,
      ],
    },
    {
      id: "legal-notice",
      heading: "Legal notice",
      blocks: [
        {
          list: [
            `Publisher: ${L.tradeName}, ${L.form}.`,
            `Owner and publication director: ${L.ownerName}.`,
            `Address: ${L.address}.`,
            `SIRET: ${L.siret}.`,
            `Contact: ${config.supportEmail}.`,
            `Website host: ${L.host}.`,
          ],
        },
      ],
    },
  ],
};

const fr: LegalDoc = {
  title: "Conditions d'utilisation",
  description:
    "Les règles d'utilisation de Kastr : le service, les abonnements Kastr Pro, les règles de la communauté, la licence du catalogue et les mentions légales.",
  dated: true,
  intro: [
    `Ces conditions s'appliquent à l'app iPhone Kastr et au site kastr.app. En utilisant Kastr, vous les acceptez. Si vous n'êtes pas d'accord, n'utilisez pas l'app. Questions : ${mail}.`,
  ],
  sections: [
    {
      id: "service",
      heading: "Le service",
      blocks: [
        "Kastr aide les collectionneurs de voitures miniatures à chercher des voitures dans un catalogue, à suivre leur collection et leur liste d'envies, et à reconnaître les voitures rares comme les Treasure Hunts. Certaines fonctions (scan, valeurs, communauté) sont marquées « bientôt » et ne sont pas encore disponibles.",
        "Nous faisons notre possible pour que Kastr reste disponible et exacte, mais nous pouvons modifier, ajouter ou retirer des fonctions, et l'app peut parfois être indisponible.",
      ],
    },
    {
      id: "accounts",
      heading: "Comptes",
      blocks: [
        "L'essentiel de Kastr fonctionne sans compte. La communauté, les retours et les contributions demandent un compte créé avec Se connecter avec Apple. Il faut avoir au moins 13 ans, ou l'âge minimum requis dans votre pays, pour en créer un.",
        "Vous êtes responsable de ce qui se passe sur votre compte. Une personne, un compte. Vous pouvez supprimer votre compte à tout moment depuis l'app.",
      ],
    },
    {
      id: "pro",
      heading: "Abonnements Kastr Pro",
      blocks: [
        "Kastr se télécharge gratuitement. Kastr Pro est un abonnement facultatif à renouvellement automatique qui débloque des fonctions supplémentaires, vendu via l'App Store d'Apple. Le prix, la durée de chaque période et les fonctions incluses sont affichés dans l'app avant la confirmation de l'achat, dans votre devise.",
        {
          list: [
            "Le paiement est débité de votre compte Apple à la confirmation de l'achat.",
            "L'abonnement se renouvelle automatiquement pour la même durée, sauf si le renouvellement automatique est désactivé au moins 24 heures avant la fin de la période en cours. Le renouvellement est débité dans les 24 heures qui précèdent la fin de la période.",
            "Si un essai gratuit est proposé, il devient un abonnement payant à son terme, sauf résiliation au moins 24 heures avant la fin de l'essai. La partie non utilisée d'un essai gratuit est perdue à l'achat d'un abonnement.",
            "Vous gérez ou résiliez votre abonnement dans les réglages de votre identifiant Apple (Réglages, votre nom, Abonnements). La résiliation arrête le prochain renouvellement ; vous gardez Kastr Pro jusqu'à la fin de la période payée.",
            "Les remboursements sont gérés par Apple selon ses propres règles, sur reportaproblem.apple.com.",
            "Si le prix change, Apple vous prévient à l'avance et, quand la loi ou ses règles l'exigent, demande votre accord avant de renouveler au nouveau prix.",
          ],
        },
        "La version gratuite a des limites, par exemple sur le nombre de voitures d'un garage ou sur les crédits de scan quand le scan sera disponible. Ces limites sont indiquées dans l'app et peuvent évoluer ; un changement ne supprime jamais les voitures déjà enregistrées.",
      ],
    },
    {
      id: "credits",
      heading: "Crédits de scan (bientôt)",
      blocks: [
        "Les scans utilisent des crédits. Les crédits n'ont aucune valeur monétaire, ne peuvent être ni vendus ni transférés, et ne servent que dans Kastr. Si un scan échoue de notre fait, le crédit est rendu. Créer plusieurs comptes ou appareils pour cumuler des crédits gratuits ou des récompenses de parrainage est interdit.",
      ],
    },
    {
      id: "community",
      heading: "Règles de la communauté",
      blocks: [
        "Les fonctions communautaires vous permettent de publier des messages, photos, commentaires, voitures et prix visibles par les autres utilisateurs. Vous êtes responsable de ce que vous publiez. Aucune tolérance pour les contenus répréhensibles ou les utilisateurs abusifs. Il est interdit de publier un contenu qui :",
        {
          list: [
            "est illégal, menaçant, harcelant, haineux, discriminatoire, sexuellement explicite ou violent ;",
            "vise une personne ou révèle ses informations privées ;",
            "usurpe l'identité de quelqu'un ou trompe sur qui vous êtes ;",
            "est du spam, une arnaque, une publicité, ou propose des objets contrefaits ou volés ;",
            "porte atteinte aux droits d'autrui (droit d'auteur, marques), y compris des photos que vous n'avez pas prises ou que vous n'avez pas le droit de partager ;",
            "ajoute volontairement de fausses données ou de faux prix au catalogue.",
          ],
        },
        "Comment ces règles sont appliquées :",
        {
          list: [
            "Filtrage : les publications et photos peuvent être vérifiées par des filtres automatiques avant leur publication.",
            "Signalement : chaque publication, commentaire, photo et profil propose une option de signalement dans l'app.",
            "Blocage : vous pouvez bloquer n'importe quel utilisateur. Ses contenus vous sont masqués immédiatement et il ne peut plus interagir avec vous.",
            `Action : nous examinons les signalements et traitons les contenus répréhensibles sous 24 heures, en les retirant et, si nécessaire, en suspendant ou en excluant leur auteur. Vous pouvez aussi signaler un contenu en écrivant à ${mail}.`,
          ],
        },
      ],
    },
    {
      id: "your-content",
      heading: "Vos contenus",
      blocks: [
        "Vous conservez vos droits sur ce que vous publiez. Vous nous accordez une licence mondiale, non exclusive et gratuite pour héberger, stocker, reproduire, redimensionner et afficher vos contenus dans Kastr, tant qu'ils restent publiés, afin que le service fonctionne. Cette licence prend fin quand vous supprimez le contenu ou votre compte, sauf pour les partages déjà faits par d'autres utilisateurs dans l'app et les sauvegardes en cours de rotation.",
        "Les contributions au catalogue sont différentes : quand vous proposez une voiture, une correction ou un prix de vente et qu'il est validé, vous acceptez que ces données (pas votre nom) rejoignent le catalogue et soient partagées sous licence Creative Commons Attribution - Partage dans les mêmes conditions, comme le reste du catalogue. Les prix ne sont affichés que sous forme agrégée.",
      ],
    },
    {
      id: "catalog",
      heading: "Catalogue, raretés et valeurs",
      blocks: [
        "Le catalogue est construit à partir de wikis communautaires publiés sous licence CC BY-SA (voir Crédits) et des contributions des utilisateurs. Il peut contenir des erreurs ou des manques.",
        "Les raretés et valeurs affichées dans Kastr sont des estimations, à titre d'information. Ce ne sont ni une expertise, ni une offre d'achat ou de vente, ni un conseil financier, et une voiture peut se vendre plus ou moins cher qu'indiqué. Kastr est une app de collectionneur : elle n'achète, ne vend et ne négocie aucune voiture.",
        "Certains liens mènent à des sites tiers, comme des places de marché. Certains peuvent être des liens affiliés : nous pouvons toucher une commission si vous achetez, sans surcoût pour vous. Nous ne sommes pas partie aux transactions faites sur un autre site.",
      ],
    },
    {
      id: "ip",
      heading: "Propriété intellectuelle et marques",
      blocks: [
        "Le nom Kastr, l'app, son design et son code nous appartiennent. Les données du catalogue sont partagées sous CC BY-SA comme décrit dans les Crédits. Les photos de voitures appartiennent à leurs auteurs.",
        "Kastr est indépendante et n'est pas affiliée à Mattel, Inc. Hot Wheels et Matchbox sont des marques de Mattel, Inc. ; les autres noms de marques appartiennent à leurs propriétaires et servent uniquement à décrire les voitures du catalogue.",
      ],
    },
    {
      id: "use",
      heading: "Usage acceptable",
      blocks: [
        "Ne copiez pas l'app, ne la décompilez pas, n'aspirez pas nos serveurs, n'utilisez ni robots ni comptes automatisés, ne contournez pas les limites ou les crédits, et ne perturbez ni le service ni les autres utilisateurs.",
      ],
    },
    {
      id: "apple",
      heading: "Apple",
      blocks: [
        `L'app vous est concédée sous le [contrat de licence d'utilisateur final des applications sous licence](${EULA}) d'Apple, en complément de ces conditions. Ces conditions vous lient à nous, pas à Apple. Apple n'est responsable ni de l'app, ni de son contenu, de sa maintenance, de son assistance ou d'une réclamation la concernant. Si l'app n'est pas conforme à une garantie applicable, vous pouvez en informer Apple, qui pourra rembourser le prix d'achat éventuel ; Apple n'a aucune autre obligation de garantie. Apple et ses filiales sont bénéficiaires de ces conditions et peuvent les faire valoir contre vous.`,
      ],
    },
    {
      id: "termination",
      heading: "Suspension et résiliation",
      blocks: [
        "Vous pouvez cesser d'utiliser Kastr et supprimer votre compte à tout moment. Nous pouvons suspendre ou fermer un compte qui enfreint gravement ou de façon répétée ces conditions, après avertissement quand c'est possible.",
      ],
    },
    {
      id: "liability",
      heading: "Garantie et responsabilité",
      blocks: [
        "Kastr est fournie en l'état. Dans les limites permises par la loi, nous ne garantissons pas que le catalogue ou les valeurs soient complets ou exacts, et nous ne sommes pas responsables des pertes indirectes, comme un achat décidé sur la base d'une valeur affichée.",
        "Rien dans ces conditions ne limite les droits que vous tirez, en tant que consommateur, de la loi impérative de votre pays, notamment la garantie légale de conformité des contenus numériques, ni notre responsabilité en cas de faute lourde ou intentionnelle, ou de dommage corporel.",
      ],
    },
    {
      id: "changes",
      heading: "Modifications",
      blocks: [
        "Nous pouvons mettre à jour ces conditions. Nous changeons alors la date en haut de page et, pour les changements importants, vous prévenons dans l'app avant leur entrée en vigueur. Si vous continuez à utiliser Kastr ensuite, les nouvelles conditions s'appliquent.",
      ],
    },
    {
      id: "law",
      heading: "Droit applicable et litiges",
      blocks: [
        "Ces conditions sont régies par le droit français. Si vous êtes consommateur, vous gardez la protection des règles impératives du pays où vous résidez.",
        `En cas de problème, écrivez-nous d'abord à ${mail} ; la plupart des difficultés se règlent ainsi. À défaut d'accord, vous pouvez recourir gratuitement à un médiateur de la consommation : ${L.consumerMediator}. Vous pouvez aussi saisir les tribunaux compétents.`,
      ],
    },
    {
      id: "legal-notice",
      heading: "Mentions légales",
      blocks: [
        {
          list: [
            `Éditeur : ${L.tradeName}, micro-entreprise (entreprise individuelle), France.`,
            `Exploitant et directeur de la publication : ${L.ownerName}.`,
            `Adresse : ${L.address}.`,
            `SIRET : ${L.siret}.`,
            `Contact : ${config.supportEmail}.`,
            `Hébergeur du site : ${L.host}.`,
          ],
        },
      ],
    },
  ],
};

export function getTerms(locale: Locale): LegalDoc {
  return locale === "fr" ? fr : en;
}

import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;

const en: LegalDoc = {
  title: "Support",
  description:
    "Get help with Kastr: contact, Kastr Pro subscriptions, restoring purchases, deleting your account, reporting content and catalog mistakes.",
  intro: [
    `Write to ${mail}. If something is broken, tell us your iPhone model, your iOS version and the Kastr version (shown in the app settings). We read every message.`,
  ],
  sections: [
    {
      id: "subscription",
      heading: "Manage or cancel Kastr Pro",
      blocks: [
        "Subscriptions are handled by Apple. On your iPhone, open Settings, tap your name, then Subscriptions, and choose Kastr. Cancel at least 24 hours before the renewal date to avoid being charged for the next period.",
      ],
    },
    {
      id: "restore",
      heading: "Restore a purchase",
      blocks: [
        "On a new iPhone or after reinstalling, open the Kastr Pro screen in the app and tap Restore Purchases, signed in with the same Apple ID you used to subscribe.",
      ],
    },
    {
      id: "refund",
      heading: "Refunds",
      blocks: [
        "Apple handles refunds for App Store purchases. Request one at [reportaproblem.apple.com](https://reportaproblem.apple.com).",
      ],
    },
    {
      id: "delete",
      heading: "Delete your account",
      blocks: [
        "Open the account settings in Kastr and choose Delete account. Your account and the data linked to it on our servers are deleted. A garage stored only on your iPhone stays there until you delete the app. Deleting your account does not cancel an App Store subscription: cancel it in Settings as described above.",
        `You can also ask by email at ${mail}, from the address linked to your account. Details are in the [privacy policy](/en/privacy).`,
      ],
    },
    {
      id: "report",
      heading: "Report a post or a user",
      blocks: [
        `Use the report option on any post, comment, photo or profile, or block the user to hide their content from you right away. You can also email ${mail} with a link or a screenshot. We review reports and act on objectionable content within 24 hours.`,
      ],
    },
    {
      id: "catalog",
      heading: "A mistake in the catalog",
      blocks: [
        `Tell us the car, its year and what is wrong at ${mail}. The catalog comes from community wikis listed in the [credits](/en/credits), so a fix made there helps every collector.`,
      ],
    },
  ],
};

const fr: LegalDoc = {
  title: "Aide",
  description:
    "Obtenir de l'aide sur Kastr : contact, abonnements Kastr Pro, restauration des achats, suppression du compte, signalements et erreurs du catalogue.",
  intro: [
    `Écris-nous à ${mail}. Si quelque chose ne marche pas, indique ton modèle d'iPhone, ta version d'iOS et la version de Kastr (visible dans les réglages de l'app). Nous lisons tous les messages.`,
  ],
  sections: [
    {
      id: "subscription",
      heading: "Gérer ou résilier Kastr Pro",
      blocks: [
        "Les abonnements sont gérés par Apple. Sur ton iPhone, ouvre Réglages, touche ton nom, puis Abonnements, et choisis Kastr. Résilie au moins 24 heures avant la date de renouvellement pour ne pas être prélevé pour la période suivante.",
      ],
    },
    {
      id: "restore",
      heading: "Restaurer un achat",
      blocks: [
        "Sur un nouvel iPhone ou après une réinstallation, ouvre l'écran Kastr Pro dans l'app et touche Restaurer les achats, avec le même identifiant Apple que pour l'abonnement.",
      ],
    },
    {
      id: "refund",
      heading: "Remboursements",
      blocks: [
        "Apple gère les remboursements des achats App Store. Fais ta demande sur [reportaproblem.apple.com](https://reportaproblem.apple.com).",
      ],
    },
    {
      id: "delete",
      heading: "Supprimer ton compte",
      blocks: [
        "Ouvre les réglages du compte dans Kastr et choisis Supprimer le compte. Ton compte et les données liées sur nos serveurs sont supprimés. Un garage stocké seulement sur ton iPhone y reste jusqu'à ce que tu supprimes l'app. Supprimer le compte ne résilie pas un abonnement App Store : résilie-le dans Réglages comme indiqué plus haut.",
        `Tu peux aussi le demander par email à ${mail}, depuis l'adresse liée à ton compte. Tous les détails sont dans la [politique de confidentialité](/fr/privacy).`,
      ],
    },
    {
      id: "report",
      heading: "Signaler une publication ou un utilisateur",
      blocks: [
        `Utilise l'option de signalement sur une publication, un commentaire, une photo ou un profil, ou bloque l'utilisateur pour masquer aussitôt ses contenus. Tu peux aussi écrire à ${mail} avec un lien ou une capture. Nous examinons les signalements et traitons les contenus répréhensibles sous 24 heures.`,
      ],
    },
    {
      id: "catalog",
      heading: "Une erreur dans le catalogue",
      blocks: [
        `Indique-nous la voiture, son année et ce qui ne va pas à ${mail}. Le catalogue vient des wikis communautaires cités dans les [crédits](/fr/credits) : une correction faite à la source profite à tous les collectionneurs.`,
      ],
    },
  ],
};

export function getSupport(locale: Locale): LegalDoc {
  return locale === "fr" ? fr : en;
}

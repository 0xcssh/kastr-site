import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;

const en: LegalDoc = {
  title: "Support",
  description:
    "Get help with Kastr: contact, signing in, garage backup, Kastr Pro subscriptions, notifications, the newsletter, deleting your account and reporting content.",
  intro: [
    `Write to ${mail}. If something is broken, tell us your iPhone model, your iOS version and the Kastr version (shown in the app settings). We read every message.`,
  ],
  sections: [
    {
      id: "sign-in",
      heading: "Sign in",
      blocks: [
        "You can use Kastr without an account. To back up your garage or join the community, open the Community tab and choose Sign in with Apple or Continue with email. With email, we send you a 6-digit code to type in the app; it expires after 10 minutes. If it does not arrive, check your spam folder, then tap Send again.",
      ],
    },
    {
      id: "backup",
      heading: "Back up your garage or move to a new iPhone",
      blocks: [
        "Once you are signed in, your garage, wishlist, hunt journal and car photos are backed up and synced automatically. On a new iPhone, install Kastr and sign in with the same account: your garage comes back. Without an account, the garage only lives on your iPhone and in your iPhone backups.",
      ],
    },
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
      id: "notifications",
      heading: "Notifications",
      blocks: [
        "Kastr can tell you when someone likes or comments on your post or follows you, and, with Kastr Pro, when a new case or release comes out (turn on Notify me in the Releases list of the Hunt tab). To stop notifications, open the iPhone Settings app, then Notifications, then Kastr.",
      ],
    },
    {
      id: "newsletter",
      heading: "Unsubscribe from the newsletter",
      blocks: [
        `Tap the unsubscribe link at the bottom of any newsletter, or turn off Newsletter in your account settings in the app (Community tab, your profile, then the settings button). You can also write to ${mail}.`,
      ],
    },
    {
      id: "delete",
      heading: "Delete your account",
      blocks: [
        "In the app, open the Community tab, tap your profile, then the settings button, and choose Delete my account. If you signed in with Apple, the app asks you to confirm with Apple so that Kastr's access to your Apple ID is revoked too. Your account and the data linked to it on our servers are deleted. The garage stored on your iPhone stays there until you delete the app.",
        "Deleting your account does not cancel an App Store subscription: cancel it in Settings as described above.",
        `You can also ask by email at ${mail}, from the address linked to your account. Details are in the [privacy policy](/en/privacy).`,
      ],
    },
    {
      id: "report",
      heading: "Report a post or a user",
      blocks: [
        `Tap the ••• button on any post, comment or profile and choose Report, or Block to hide that person's posts and comments from you right away. You can also email ${mail} with the username and a screenshot. Moderators review reports and act on objectionable content within 24 hours.`,
        `To unblock someone, write to ${mail} with their username.`,
      ],
    },
    {
      id: "catalog",
      heading: "A missing car or a mistake in the catalog",
      blocks: [
        "If a car is missing, add it yourself from the search results or the scanner: it goes straight into your garage, and you can propose it to the catalog.",
        `For a mistake, tell us the car, its year and what is wrong at ${mail}. The catalog comes from community wikis listed in the [credits](/en/credits), so a fix made there helps every collector.`,
      ],
    },
  ],
};

const fr: LegalDoc = {
  title: "Aide",
  description:
    "Obtenir de l'aide sur Kastr : contact, connexion, sauvegarde du garage, abonnements Kastr Pro, notifications, newsletter, suppression du compte et signalements.",
  intro: [
    `Écris-nous à ${mail}. Si quelque chose ne marche pas, indique ton modèle d'iPhone, ta version d'iOS et la version de Kastr (visible dans les réglages de l'app). Nous lisons tous les messages.`,
  ],
  sections: [
    {
      id: "sign-in",
      heading: "Se connecter",
      blocks: [
        "Kastr s'utilise sans compte. Pour sauvegarder ton garage ou rejoindre la communauté, ouvre l'onglet Communauté et choisis Se connecter avec Apple ou Continuer avec un e-mail. Par e-mail, nous t'envoyons un code à 6 chiffres à taper dans l'app ; il expire au bout de 10 minutes. S'il n'arrive pas, regarde dans tes spams, puis touche Renvoyer.",
      ],
    },
    {
      id: "backup",
      heading: "Sauvegarder ton garage ou changer d'iPhone",
      blocks: [
        "Une fois connecté, ton garage, ta liste d'envies, ton journal de chasse et les photos de tes voitures sont sauvegardés et synchronisés automatiquement. Sur un nouvel iPhone, installe Kastr et connecte-toi avec le même compte : ton garage revient. Sans compte, le garage ne vit que sur ton iPhone et dans ses sauvegardes.",
      ],
    },
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
      id: "notifications",
      heading: "Notifications",
      blocks: [
        "Kastr peut te prévenir quand quelqu'un aime ou commente ta publication ou te suit, et, avec Kastr Pro, quand une nouvelle caisse ou une sortie arrive (active Me prévenir dans la liste des Sorties de l'onglet Chasse). Pour couper les notifications, ouvre les Réglages de l'iPhone, puis Notifications, puis Kastr.",
      ],
    },
    {
      id: "newsletter",
      heading: "Se désinscrire de la newsletter",
      blocks: [
        `Touche le lien de désinscription en bas de n'importe quelle newsletter, ou désactive Newsletter dans les réglages de ton compte dans l'app (onglet Communauté, ton profil, puis le bouton réglages). Tu peux aussi écrire à ${mail}.`,
      ],
    },
    {
      id: "delete",
      heading: "Supprimer ton compte",
      blocks: [
        "Dans l'app, ouvre l'onglet Communauté, touche ton profil, puis le bouton réglages, et choisis Supprimer mon compte. Si tu t'es connecté avec Apple, l'app te demande de confirmer avec Apple pour que l'accès de Kastr à ton identifiant Apple soit aussi révoqué. Ton compte et les données liées sur nos serveurs sont supprimés. Le garage stocké sur ton iPhone y reste jusqu'à ce que tu supprimes l'app.",
        "Supprimer le compte ne résilie pas un abonnement App Store : résilie-le dans Réglages comme indiqué plus haut.",
        `Tu peux aussi le demander par email à ${mail}, depuis l'adresse liée à ton compte. Tous les détails sont dans la [politique de confidentialité](/fr/privacy).`,
      ],
    },
    {
      id: "report",
      heading: "Signaler une publication ou un utilisateur",
      blocks: [
        `Touche le bouton ••• d'une publication, d'un commentaire ou d'un profil et choisis Signaler, ou Bloquer pour masquer aussitôt ses publications et commentaires. Tu peux aussi écrire à ${mail} avec le pseudo et une capture. Les modérateurs examinent les signalements et traitent les contenus répréhensibles sous 24 heures.`,
        `Pour débloquer quelqu'un, écris à ${mail} avec son pseudo.`,
      ],
    },
    {
      id: "catalog",
      heading: "Une voiture absente ou une erreur dans le catalogue",
      blocks: [
        "S'il manque une voiture, ajoute-la toi-même depuis les résultats de recherche ou le scanner : elle entre tout de suite dans ton garage, et tu peux la proposer au catalogue.",
        `Pour une erreur, indique-nous la voiture, son année et ce qui ne va pas à ${mail}. Le catalogue vient des wikis communautaires cités dans les [crédits](/fr/credits) : une correction faite à la source profite à tous les collectionneurs.`,
      ],
    },
  ],
};

export function getSupport(locale: Locale): LegalDoc {
  return locale === "fr" ? fr : en;
}

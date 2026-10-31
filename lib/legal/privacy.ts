import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

// Privacy policy. Sources of truth: CLAUDE.md §9 (GDPR, account deletion, AI photos), §12 (stack),
// §16 (Supabase, RevenueCat, TelemetryDeck). Draft written by an engineer, not a lawyer: have it reviewed.

const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;
const L = config.legal;

const en: LegalDoc = {
  title: "Privacy policy",
  description:
    "What Kastr collects, why, who processes it and how to delete it. No ads, no ad tracking, and your garage stays on your iPhone unless you choose otherwise.",
  dated: true,
  intro: [
    "This policy explains what data the Kastr iPhone app and the kastr.app website collect, why, who helps us process it, and the rights you have. Features marked \"coming soon\" are not in the app yet; this policy already covers them so nothing changes silently when they ship.",
  ],
  sections: [
    {
      id: "controller",
      heading: "Who is responsible",
      blocks: [
        `The data controller is ${L.tradeName}, a ${L.form}. Owner: ${L.ownerName}. Address: ${L.address}. SIRET: ${L.siret}.`,
        `For any privacy question or request, write to ${mail}.`,
      ],
    },
    {
      id: "short",
      heading: "The short version",
      blocks: [
        {
          list: [
            "There are no ads in Kastr, no ad tracking, and we do not sell your data.",
            "Your garage (cars, wishlist, prices paid, notes, photos) is stored on your iPhone. You do not need an account to use it.",
            "An account is optional. It is only needed for community features, feedback and contributions, and you can delete it from the app.",
            "Usage analytics are anonymous.",
            "Payments go through Apple. We never see your card details.",
          ],
        },
      ],
    },
    {
      id: "device",
      heading: "Data stored on your iPhone",
      blocks: [
        "Your garage and wishlist, the price you paid, where and when you found a car, its condition, your notes, the photos you add, your hunt journal and your app settings are stored locally on your device. We do not receive them unless you create an account and sync your collection.",
        "This data is included in your device backups according to your own iCloud or computer backup settings. Deleting the app deletes it from the device. You can export your garage to CSV at any time.",
        "The catalog itself (car names, years, series, toy numbers) is shipped inside the app and contains no personal data.",
      ],
    },
    {
      id: "account",
      heading: "Your account (optional)",
      blocks: [
        "If you create an account, you sign in with Sign in with Apple. We receive a stable Apple user identifier and, if you choose to share it, your email address (which may be an Apple private relay address). You may also choose a username and a profile picture, which are public in community features.",
        "When syncing is available, your garage is copied to our servers so you can get it back on a new iPhone. It stays private to you.",
        "Accounts are managed with Supabase (authentication, database, file storage and server functions). Our Supabase project is hosted in the European Union (Paris, France).",
      ],
    },
    {
      id: "community",
      heading: "Community, feedback and contributions (coming soon)",
      blocks: [
        "If you post in the community, we store what you publish (text, photos, cars you attach from your garage) with your username. Posts are public to other Kastr users.",
        "If you submit a car missing from the catalog, a correction or a price, we store it with your account. Submitted cars stay private to you until they are reviewed; once approved, the car data becomes part of the public catalog without your name attached to it, and prices are only shown in aggregate.",
        "To keep the community safe, posts may be checked by automated filters before they appear. When you report content or block a user, we record the report or the block. Moderators review reports and may remove content or suspend accounts that break the Terms of use.",
        "Feedback you send from the app is stored with your account, your app version, your iOS version and your device model, so we can answer and fix the problem.",
      ],
    },
    {
      id: "scan",
      heading: "Scanning",
      blocks: [
        "Scanning reads the barcode and the text on the card on your iPhone, with Apple's on-device frameworks (VisionKit). The camera image is processed on your device and is not sent to us or to anyone else.",
        "Coming soon: when on-device reading cannot identify the car, or when you photograph a loose car, the photo will be sent over an encrypted connection to our server in the European Union, which will forward it to a third-party AI provider for the sole purpose of identifying the car. This fallback is not active yet. We will name this provider here before the feature is released. We will only work with a provider whose terms allow us to stop it from using your photos to train its own models.",
        "We do not keep scan photos after returning the result, unless you agree to share a confirmed identification (the photo and the car you confirmed) to help us improve recognition. That choice is off by default and you can withdraw it at any time.",
        "To count scan credits, we keep a scan counter linked to your account, or stored on your device if you do not have one.",
      ],
    },
    {
      id: "purchases",
      heading: "Purchases and Kastr Pro",
      blocks: [
        "Kastr Pro is sold through the App Store. Apple handles payment, and we never receive your card number or billing address.",
        "We use RevenueCat to know whether you have an active subscription and to let you restore it. RevenueCat receives an anonymous app user identifier (linked to your account if you have one), your purchase and subscription history in Kastr, transaction identifiers, your store country and currency, your device type and your app version.",
      ],
    },
    {
      id: "analytics",
      heading: "Anonymous analytics",
      blocks: [
        "We use TelemetryDeck to understand which features are used and to find bugs. It receives anonymous usage signals (for example, that a search was made or a screen was opened), your app version, iOS version, device model and language. The user identifier is hashed on your device before it is sent, so it cannot be traced back to you.",
        "We do not use the advertising identifier (IDFA), we do not track you across other companies' apps or websites, and the app does not ask for tracking permission because it does not track.",
      ],
    },
    {
      id: "photos",
      heading: "Catalog photos",
      blocks: [
        "Car photos in the catalog are downloaded from image servers when you view them. Today, some are served by Fandom, Inc., which hosts the wikis our catalog comes from. Like any web request, downloading a photo reveals your IP address to the server that sends it. No account data is shared with it.",
      ],
    },
    {
      id: "website",
      heading: "This website",
      blocks: [
        "kastr.app is hosted by Cloudflare. Like any web host, Cloudflare processes your IP address and basic request data in server logs to deliver pages and protect the site. The website sets no cookies and runs no analytics or advertising scripts.",
        "If you email us, we use your message and email address only to answer you.",
      ],
    },
    {
      id: "permissions",
      heading: "iPhone permissions",
      blocks: [
        "Kastr asks for camera access only when you scan or take a photo of a car, and for photo library access only when you add a picture from it. You can change these permissions at any time in the iPhone Settings app. Kastr works without them.",
      ],
    },
    {
      id: "bases",
      heading: "Why we process data (legal bases)",
      blocks: [
        {
          list: [
            "To provide the service you ask for (account, sync, scanning, community, Kastr Pro): performance of our contract with you.",
            "To keep Kastr secure, moderate content, prevent abuse of free credits and improve the app with anonymous analytics: our legitimate interests, balanced against your rights.",
            "To keep scan photos for improving recognition: your consent, which you can withdraw at any time.",
            "To keep records we are required to keep, or to answer lawful requests: legal obligation.",
          ],
        },
      ],
    },
    {
      id: "processors",
      heading: "Who processes data for us",
      blocks: [
        "We share data only with the service providers below, who process it on our behalf and under contract, and never for their own advertising.",
        {
          list: [
            "Apple Inc. (USA): Sign in with Apple and App Store payments.",
            "Supabase, Inc. (USA), with data hosted in the European Union (Paris, France): account, database, file storage and server functions.",
            "RevenueCat, Inc. (USA): subscription status.",
            "TelemetryDeck GmbH (Germany): anonymous analytics.",
            "A third-party AI provider, via our server, to identify scanned cars (coming soon, named here before release).",
            "Cloudflare, Inc. (USA): website hosting and domain.",
            "Fandom, Inc. (USA): delivery of some catalog photos.",
          ],
        },
        "We may also disclose data if the law requires it, or to protect the safety of users.",
      ],
    },
    {
      id: "transfers",
      heading: "International transfers",
      blocks: [
        "Some of these providers are based in the United States. When personal data leaves the European Economic Area, it is protected by the European Commission's Standard Contractual Clauses or by the provider's certification under the EU-U.S. Data Privacy Framework.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      blocks: [
        {
          list: [
            "Data on your iPhone: until you delete it or delete the app.",
            "Account data, synced garage, posts and contributions: until you delete your account. It is then removed from our active systems within 30 days, and from backups when they rotate.",
            "Approved catalog data you contributed stays in the catalog without your name.",
            "Reports and moderation records: up to 12 months, longer only if needed for a legal claim.",
            "Support emails: up to 3 years after our last exchange.",
            "Subscription records at RevenueCat and Apple: as long as they need them to manage purchases and meet their legal obligations.",
          ],
        },
      ],
    },
    {
      id: "deletion",
      heading: "Deleting your account",
      blocks: [
        "You can delete your account from the account settings in the app. This deletes your profile, your synced garage, your posts, comments and photos, and your private submissions; it revokes the Sign in with Apple link and deletes your customer record at RevenueCat.",
        "Deleting your account does not cancel an App Store subscription. Cancel it in the Settings app (your name, then Subscriptions) to avoid being charged again.",
        `You can also ask us to delete your account by writing to ${mail} from the email address linked to it.`,
      ],
    },
    {
      id: "rights",
      heading: "Your rights",
      blocks: [
        "You can ask to access, correct, delete or export your personal data, to restrict or object to its processing, and to withdraw your consent at any time. Under French law, you can also give instructions about what happens to your data after your death.",
        `Write to ${mail}. We answer within one month. If you think we have not handled your request properly, you can complain to the CNIL ([cnil.fr](https://www.cnil.fr)) or to the data protection authority where you live.`,
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        "Kastr can be used by collectors of any age, but creating an account and using community features requires being at least 13, or the minimum age set by the law of your country. If you believe a child has created an account without the consent required in their country, contact us and we will delete it.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      blocks: [
        "Data travels over encrypted connections. Account data is protected by access rules so each user can only read their own private data, and secret keys stay on our servers, never in the app.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        "When this policy changes, we update the date at the top. If a change matters, for example a new provider or a new kind of data, we will also tell you in the app before it applies.",
      ],
    },
  ],
};

const fr: LegalDoc = {
  title: "Politique de confidentialité",
  description:
    "Ce que Kastr collecte, pourquoi, qui le traite et comment le supprimer. Pas de publicité, pas de pistage publicitaire, et ton garage reste sur ton iPhone sauf si tu en décides autrement.",
  dated: true,
  intro: [
    "Cette politique explique quelles données l'app iPhone Kastr et le site kastr.app collectent, pourquoi, qui nous aide à les traiter et quels sont vos droits. Les fonctions marquées « bientôt » ne sont pas encore dans l'app ; cette politique les couvre déjà, pour que rien ne change en silence à leur sortie.",
  ],
  sections: [
    {
      id: "controller",
      heading: "Qui est responsable",
      blocks: [
        `Le responsable du traitement est ${L.tradeName}, micro-entreprise (entreprise individuelle) établie en France. Exploitant : ${L.ownerName}. Adresse : ${L.address}. SIRET : ${L.siret}.`,
        `Pour toute question ou demande sur vos données, écrivez à ${mail}.`,
      ],
    },
    {
      id: "short",
      heading: "En bref",
      blocks: [
        {
          list: [
            "Pas de publicité dans Kastr, pas de pistage publicitaire, et nous ne vendons pas vos données.",
            "Votre garage (voitures, liste d'envies, prix payés, notes, photos) est stocké sur votre iPhone. Aucun compte n'est nécessaire pour l'utiliser.",
            "Le compte est facultatif. Il ne sert qu'aux fonctions communautaires, aux retours et aux contributions, et vous pouvez le supprimer depuis l'app.",
            "Les statistiques d'usage sont anonymes.",
            "Les paiements passent par Apple. Nous ne voyons jamais vos données bancaires.",
          ],
        },
      ],
    },
    {
      id: "device",
      heading: "Les données stockées sur votre iPhone",
      blocks: [
        "Votre garage et votre liste d'envies, le prix payé, le lieu et la date d'une trouvaille, l'état, vos notes, les photos que vous ajoutez, votre journal de chasse et vos réglages sont stockés localement sur votre appareil. Nous ne les recevons pas, sauf si vous créez un compte et synchronisez votre collection.",
        "Ces données sont incluses dans les sauvegardes de votre appareil selon vos propres réglages iCloud ou ordinateur. Supprimer l'app les supprime de l'appareil. Vous pouvez exporter votre garage en CSV à tout moment.",
        "Le catalogue (noms, années, séries, numéros de jouet) est livré dans l'app et ne contient aucune donnée personnelle.",
      ],
    },
    {
      id: "account",
      heading: "Votre compte (facultatif)",
      blocks: [
        "Si vous créez un compte, vous vous connectez avec Se connecter avec Apple. Nous recevons un identifiant Apple stable et, si vous choisissez de la partager, votre adresse email (qui peut être une adresse relais privée d'Apple). Vous pouvez aussi choisir un pseudo et une photo de profil, publics dans les fonctions communautaires.",
        "Quand la synchronisation sera disponible, votre garage sera copié sur nos serveurs pour que vous le retrouviez sur un nouvel iPhone. Il reste privé.",
        "Les comptes sont gérés avec Supabase (authentification, base de données, stockage de fichiers et fonctions serveur). Notre projet Supabase est hébergé dans l'Union européenne (Paris, France).",
      ],
    },
    {
      id: "community",
      heading: "Communauté, retours et contributions (bientôt)",
      blocks: [
        "Si vous publiez dans la communauté, nous conservons ce que vous publiez (texte, photos, voitures jointes depuis votre garage) avec votre pseudo. Les publications sont visibles par les autres utilisateurs de Kastr.",
        "Si vous proposez une voiture absente du catalogue, une correction ou un prix, nous les conservons avec votre compte. Une voiture proposée reste privée jusqu'à sa validation ; une fois validée, ses données rejoignent le catalogue public sans votre nom, et les prix ne sont affichés que sous forme agrégée.",
        "Pour protéger la communauté, les publications peuvent être vérifiées par des filtres automatiques avant d'apparaître. Quand vous signalez un contenu ou bloquez un utilisateur, nous enregistrons le signalement ou le blocage. Les modérateurs examinent les signalements et peuvent retirer un contenu ou suspendre un compte qui enfreint les Conditions d'utilisation.",
        "Les retours envoyés depuis l'app sont conservés avec votre compte, la version de l'app, la version d'iOS et le modèle d'appareil, pour vous répondre et corriger le problème.",
      ],
    },
    {
      id: "scan",
      heading: "Le scan",
      blocks: [
        "Le scan lit le code-barres et le texte du blister sur votre iPhone, avec les outils embarqués d'Apple (VisionKit). L'image de l'appareil photo est traitée sur votre appareil et n'est envoyée ni à nous ni à personne d'autre.",
        "Bientôt : quand la lecture sur l'iPhone ne suffira pas, ou quand vous photographierez une voiture hors blister, la photo sera envoyée par une connexion chiffrée à notre serveur situé dans l'Union européenne, qui la transmettra à un fournisseur d'IA tiers dans le seul but d'identifier la voiture. Ce recours n'est pas encore actif. Nous nommerons ce fournisseur ici avant la sortie de la fonction. Nous ne travaillerons qu'avec un fournisseur dont les conditions nous permettent de l'empêcher d'utiliser vos photos pour entraîner ses propres modèles.",
        "Nous ne conservons pas les photos de scan après avoir renvoyé le résultat, sauf si vous acceptez de partager une identification confirmée (la photo et la voiture confirmée) pour nous aider à améliorer la reconnaissance. Ce choix est désactivé par défaut et vous pouvez le retirer à tout moment.",
        "Pour compter les crédits de scan, nous conservons un compteur lié à votre compte, ou stocké sur votre appareil si vous n'en avez pas.",
      ],
    },
    {
      id: "purchases",
      heading: "Achats et Kastr Pro",
      blocks: [
        "Kastr Pro est vendu via l'App Store. Apple gère le paiement : nous ne recevons jamais votre numéro de carte ni votre adresse de facturation.",
        "Nous utilisons RevenueCat pour savoir si votre abonnement est actif et vous permettre de le restaurer. RevenueCat reçoit un identifiant utilisateur anonyme (lié à votre compte si vous en avez un), l'historique de vos achats et abonnements dans Kastr, les identifiants de transaction, le pays et la devise de votre store, le type d'appareil et la version de l'app.",
      ],
    },
    {
      id: "analytics",
      heading: "Statistiques anonymes",
      blocks: [
        "Nous utilisons TelemetryDeck pour savoir quelles fonctions sont utilisées et repérer les bugs. Il reçoit des signaux d'usage anonymes (par exemple, qu'une recherche a été faite ou qu'un écran a été ouvert), la version de l'app, la version d'iOS, le modèle d'appareil et la langue. L'identifiant utilisateur est haché sur votre appareil avant l'envoi : il ne permet pas de remonter jusqu'à vous.",
        "Nous n'utilisons pas l'identifiant publicitaire (IDFA), nous ne vous suivons pas dans les apps ou sites d'autres sociétés, et l'app ne demande pas l'autorisation de suivi parce qu'elle ne suit pas.",
      ],
    },
    {
      id: "photos",
      heading: "Les photos du catalogue",
      blocks: [
        "Les photos de voitures du catalogue sont téléchargées depuis des serveurs d'images quand vous les affichez. Aujourd'hui, certaines sont servies par Fandom, Inc., qui héberge les wikis dont vient notre catalogue. Comme pour toute requête web, télécharger une photo révèle votre adresse IP au serveur qui l'envoie. Aucune donnée de compte ne lui est transmise.",
      ],
    },
    {
      id: "website",
      heading: "Ce site",
      blocks: [
        "kastr.app est hébergé par Cloudflare. Comme tout hébergeur, Cloudflare traite votre adresse IP et des données de requête de base dans des journaux serveur, pour afficher les pages et protéger le site. Le site ne dépose aucun cookie et n'utilise aucun script de statistiques ou de publicité.",
        "Si vous nous écrivez, votre message et votre adresse servent uniquement à vous répondre.",
      ],
    },
    {
      id: "permissions",
      heading: "Autorisations de l'iPhone",
      blocks: [
        "Kastr demande l'accès à l'appareil photo seulement quand vous scannez ou photographiez une voiture, et l'accès à la photothèque seulement quand vous y choisissez une image. Vous pouvez modifier ces autorisations à tout moment dans les Réglages de l'iPhone. Kastr fonctionne sans elles.",
      ],
    },
    {
      id: "bases",
      heading: "Pourquoi nous traitons ces données (bases légales)",
      blocks: [
        {
          list: [
            "Fournir le service demandé (compte, synchronisation, scan, communauté, Kastr Pro) : exécution du contrat qui nous lie.",
            "Sécuriser Kastr, modérer les contenus, empêcher les abus de crédits gratuits et améliorer l'app grâce à des statistiques anonymes : notre intérêt légitime, mis en balance avec vos droits.",
            "Conserver des photos de scan pour améliorer la reconnaissance : votre consentement, que vous pouvez retirer à tout moment.",
            "Conserver les données exigées par la loi ou répondre à une demande légale : obligation légale.",
          ],
        },
      ],
    },
    {
      id: "processors",
      heading: "Qui traite des données pour nous",
      blocks: [
        "Nous ne partageons des données qu'avec les prestataires ci-dessous, qui les traitent pour notre compte et sous contrat, jamais pour leur propre publicité.",
        {
          list: [
            "Apple Inc. (États-Unis) : Se connecter avec Apple et paiements App Store.",
            "Supabase, Inc. (États-Unis), données hébergées dans l'Union européenne (Paris, France) : compte, base de données, stockage de fichiers et fonctions serveur.",
            "RevenueCat, Inc. (États-Unis) : statut des abonnements.",
            "TelemetryDeck GmbH (Allemagne) : statistiques anonymes.",
            "Un fournisseur d'IA tiers, via notre serveur, pour identifier les voitures scannées (bientôt, nommé ici avant la sortie).",
            "Cloudflare, Inc. (États-Unis) : hébergement du site et nom de domaine.",
            "Fandom, Inc. (États-Unis) : diffusion de certaines photos du catalogue.",
          ],
        },
        "Nous pouvons aussi communiquer des données si la loi l'exige, ou pour protéger la sécurité des utilisateurs.",
      ],
    },
    {
      id: "transfers",
      heading: "Transferts hors de l'Union européenne",
      blocks: [
        "Certains de ces prestataires sont établis aux États-Unis. Quand des données personnelles quittent l'Espace économique européen, elles sont protégées par les clauses contractuelles types de la Commission européenne ou par la certification du prestataire au Data Privacy Framework UE-États-Unis.",
      ],
    },
    {
      id: "retention",
      heading: "Durées de conservation",
      blocks: [
        {
          list: [
            "Données sur votre iPhone : jusqu'à ce que vous les supprimiez ou supprimiez l'app.",
            "Données de compte, garage synchronisé, publications et contributions : jusqu'à la suppression du compte. Elles sont alors effacées de nos systèmes actifs sous 30 jours, puis des sauvegardes lors de leur rotation.",
            "Les données de catalogue validées que vous avez apportées restent au catalogue, sans votre nom.",
            "Signalements et décisions de modération : jusqu'à 12 mois, plus longtemps seulement si un litige l'exige.",
            "Emails d'assistance : jusqu'à 3 ans après notre dernier échange.",
            "Données d'abonnement chez RevenueCat et Apple : le temps nécessaire à la gestion des achats et à leurs obligations légales.",
          ],
        },
      ],
    },
    {
      id: "deletion",
      heading: "Supprimer votre compte",
      blocks: [
        "Vous pouvez supprimer votre compte depuis les réglages du compte dans l'app. Cela supprime votre profil, votre garage synchronisé, vos publications, commentaires et photos, et vos propositions privées ; le lien avec Se connecter avec Apple est révoqué et votre fiche client chez RevenueCat est supprimée.",
        "Supprimer votre compte ne résilie pas un abonnement App Store. Résiliez-le dans l'app Réglages (votre nom, puis Abonnements) pour ne plus être prélevé.",
        `Vous pouvez aussi nous demander la suppression en écrivant à ${mail} depuis l'adresse liée au compte.`,
      ],
    },
    {
      id: "rights",
      heading: "Vos droits",
      blocks: [
        "Vous pouvez demander l'accès à vos données, leur rectification, leur effacement ou leur portabilité, la limitation de leur traitement ou vous y opposer, et retirer votre consentement à tout moment. Vous pouvez aussi définir des directives sur le sort de vos données après votre décès.",
        `Écrivez à ${mail}. Nous répondons sous un mois. Si vous estimez que votre demande n'a pas été traitée correctement, vous pouvez saisir la CNIL ([cnil.fr](https://www.cnil.fr)) ou l'autorité de protection des données de votre pays.`,
      ],
    },
    {
      id: "children",
      heading: "Enfants",
      blocks: [
        "Kastr peut être utilisée par des collectionneurs de tout âge, mais créer un compte et utiliser les fonctions communautaires demande d'avoir au moins 13 ans, ou l'âge minimum fixé par la loi de votre pays. Si vous pensez qu'un enfant a créé un compte sans le consentement requis, contactez-nous et nous le supprimerons.",
      ],
    },
    {
      id: "security",
      heading: "Sécurité",
      blocks: [
        "Les données circulent par des connexions chiffrées. Les données de compte sont protégées par des règles d'accès qui ne laissent chaque utilisateur lire que ses propres données privées, et les clés secrètes restent sur nos serveurs, jamais dans l'app.",
      ],
    },
    {
      id: "changes",
      heading: "Modifications",
      blocks: [
        "Quand cette politique change, nous mettons à jour la date en haut de page. Si le changement est important, par exemple un nouveau prestataire ou un nouveau type de données, nous vous prévenons aussi dans l'app avant qu'il s'applique.",
      ],
    },
  ],
};

export function getPrivacy(locale: Locale): LegalDoc {
  return locale === "fr" ? fr : en;
}

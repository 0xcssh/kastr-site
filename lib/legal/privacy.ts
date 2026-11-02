import { config } from "@/lib/config";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc } from "./types";

// Privacy policy, checked against the app's code at build 71 (2 Nov 2026): Supabase tables and
// Edge Functions in the diecast repo (data/migrations, supabase/functions), the Swift client.
// Rule: describe only what the code does today. Draft written by an engineer, not a lawyer.

const mail = `[${config.supportEmail}](mailto:${config.supportEmail})`;
const L = config.legal;

const en: LegalDoc = {
  title: "Privacy policy",
  description:
    "What Kastr collects, why, who processes it, what is public in the community and how to delete it. No ads, no ad tracking, no data sold.",
  dated: true,
  intro: [
    "This policy explains what data the Kastr iPhone app and the kastr.app website collect, why, who helps us process it, what other collectors can see, and the rights you have.",
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
            "Your garage works without an account and then stays on your iPhone.",
            "An account is optional. With one, your garage is backed up and synced privately, and you can join the community.",
            "In the community, your username, bio, avatar car, posts and, unless you turn it off, the list of cars in your garage are visible to other collectors, and on your public page at kastr.app/@username unless you turn that page off. What you paid, where you found a car, your notes and your own photos of your cars are never shown to anyone.",
            "The community is for collectors aged 13 and over. We store only your age band, never your date or year of birth.",
            "Kastr does not use any analytics or tracking tool today.",
            "Payments go through Apple. We never see your card details.",
            "You can delete your account from the app at any time.",
          ],
        },
      ],
    },
    {
      id: "device",
      heading: "Data stored on your iPhone",
      blocks: [
        "Your garages and wishlist, the price you paid and its currency, where and when you found a car, its condition, your notes, the photos you add, the cars you add yourself, your hunt journal (store names and dates you type) and your app settings are stored on your device.",
        "This data is included in your device backups according to your own iCloud or computer backup settings. Deleting the app deletes it from the device. You can export your garage to CSV at any time.",
        "The Kastr widget reads a small summary (your hunt progress, number of cars, and your garage value if you have Kastr Pro) that the app shares with it through the iPhone's keychain. It never leaves your device.",
        "The catalog itself (car names, years, series, toy numbers, case letters) is shipped inside the app and contains no personal data. Kastr does not access your location.",
      ],
    },
    {
      id: "account",
      heading: "Your account (optional)",
      blocks: [
        "You can create an account in two ways:",
        {
          list: [
            "Sign in with Apple: we receive a stable Apple user identifier and the email address Apple shares with us, which can be an Apple private relay address if you choose to hide yours.",
            "Email: you enter your address and we email you a 6-digit code. Typing the code confirms the address and signs you in. There is no password. The code expires after 10 minutes.",
          ],
        },
        "You then choose a username and give your year of birth. Only your age band (under 13, 13 to 15, or 16 and over) is stored, never the year; under 13, no profile can be created. You can add a short bio and pick a car from the catalog as your avatar (Kastr does not use profile photos). We also keep the date your account was created and, for security, the sign-in records kept by our authentication provider (including IP addresses).",
        "Accounts are managed with Supabase (authentication, database, file storage and server functions). Our Supabase project is hosted in the European Union (Paris, France).",
      ],
    },
    {
      id: "sync",
      heading: "Garage backup and sync",
      blocks: [
        "When you are signed in, the app copies your collection to our servers so you can get it back on a new iPhone and keep several devices in sync: your garages, cars and their details (price paid, currency, place, condition, notes, dates), the details of cars you added yourself, your wishlist, your hunt journal and the photos you added to your cars. Photos go to private storage that only your account can read.",
        "This copy is private. Other users never see your prices, places, notes, hunt journal or photos. Signing out leaves the garage on your iPhone; deleting your account deletes the copy on our servers.",
      ],
    },
    {
      id: "community",
      heading: "Community: what others can see",
      blocks: [
        "The community is only available with an account. Other signed-in Kastr users can see:",
        {
          list: [
            "your username, your bio and your avatar car;",
            "how many cars and posts you have, and how many collectors you follow and follow you;",
            "your posts (text, photo and the car you attach) and your comments;",
            "which posts you like and which collectors you follow (the app shows them as counts, but they are readable by other signed-in users);",
            "the list of cars in your garage (name, brand, year, rarity and number of copies), unless you turn off \"Show my garage on my profile\" in your profile settings. This option is on by default. The value of your garage is never shown to others.",
          ],
        },
        "Post photos are resized and re-encoded on your iPhone before they are sent, which removes their hidden metadata such as location. They are stored on a server that delivers them by long, unguessable links, so anyone who gets such a link can open the photo.",
        "Kastr Pro members can compare their own garage with a collector's public garage. This uses only what is already public.",
        "To keep the community safe, posts and comments are checked against a list of forbidden words when they are published. When you report content (with the reason you choose) or block a user, we record it. Content reported by several people is hidden until a moderator reviews it. Moderators see the reported content, its author and the reasons given, and can remove content or ban an account that breaks the Terms of use. A banned account can no longer publish.",
        "When someone likes or comments on your post or follows you, an entry is added to your activity list in the app.",
      ],
    },
    {
      id: "web-profile",
      heading: "Your public page on kastr.app",
      blocks: [
        "Each community profile also has a public web page at kastr.app/@username. It is on by default for collectors aged 16 and over: the app tells you when you choose your username, and you can turn it off there or at any time in your profile settings (\"Show my profile on kastr.app\"). Anyone with the link can open it, without an account. It shows:",
        {
          list: [
            "your username, bio, avatar car, counts (cars, posts, followers, following) and badges;",
            "the cars in your garage, if your garage is shown on your profile (name, brand, year, rarity, number of copies, and the series and case letter from the catalog);",
            "your latest posts that have a photo.",
          ],
        },
        "It never shows what you paid, where you found a car, your notes, your own photos of your cars or the value of your garage.",
        "Search engines may list your page only once it has content: at least 10 cars in your public garage, or a published find. Until then the page asks search engines not to index it. A page that is turned off, or the page of a banned account, shows nothing.",
        "For collectors aged 13 to 15, the page is off by default and, if they turn it on, it is never indexed by search engines.",
        "Your wishlist is private. If you choose \"Share my wishlist\", it gets its own page at kastr.app/@username/wishlist, with a link to search each car on eBay (these links may carry an eBay Partner Network affiliate code). That page is never indexed by search engines, and you can stop sharing it at any time.",
      ],
    },
    {
      id: "notifications",
      heading: "Notifications",
      blocks: [
        "If you allow notifications, your iPhone gives the app a push token. We store it with your account, whether it is a test or App Store build, your language and your notification choices (activity from other collectors, and new release alerts if you have Kastr Pro). Notifications are delivered by Apple Push Notification service. The token is removed when you sign out, when Apple tells us it is no longer valid, or when you delete your account. You can turn notifications off at any time in the iPhone Settings app.",
      ],
    },
    {
      id: "newsletter",
      heading: "Newsletter",
      blocks: [
        "When you create an account by email, you can choose to receive the Kastr newsletter (finds of the week, new releases, posts from the community). In the European Economic Area, the United Kingdom, Switzerland, Canada and Brazil, this box is unticked and you are only subscribed if you tick it. Elsewhere, it may be ticked by default and you can untick it before continuing. You can change your choice at any time in your account settings, and every newsletter will include an unsubscribe link.",
        "We keep your email address, your choice, where you made it and the date you agreed, as proof of your consent. Newsletters will be sent with Resend.",
        "Collectors aged 13 to 15 are never subscribed: if the box was ticked when they signed in by email, the subscription is cancelled as soon as they give their age.",
      ],
    },
    {
      id: "contributions",
      heading: "Cars you add, prices you share, feedback",
      blocks: [
        "A car missing from the catalog that you add yourself stays private in your garage. If you choose to propose it to the catalog, we store the proposal (brand, name, year, series, colour, toy number, notes and photo) with your account; the photo is in private storage that only moderators can see. Once approved, the car data joins the public catalog without your name. Prices are never published individually.",
        "When you share the price you paid for a car, it is sent without your account, with only a hashed identifier of your app installation, and is shown only as part of an aggregate (for example a median of several collectors).",
        "Feedback you send from the app is stored with your account and the app version, so we can answer and fix the problem.",
        "If you enter a friend's referral code, we record who invited whom, to give the reward. This stays private.",
      ],
    },
    {
      id: "scan",
      heading: "Scanning",
      blocks: [
        "Scanning first reads the barcode and the toy number on the card on your iPhone, with Apple's on-device frameworks. That image stays on your device.",
        "When on-device reading cannot identify the car, or when you photograph a loose car, Kastr can identify it with AI. The app asks for your permission the first time, and you can turn this off at any time in Settings > Scanner. The photo is then sent over an encrypted connection to our server in the European Union, which forwards it to OpenAI for the sole purpose of identifying the car. Our scan server does not store the photo, and asks OpenAI not to store the request. OpenAI does not use API data to train its models and may keep it for up to 30 days to detect abuse, then deletes it.",
        "Helping train Kastr's recognition: when you add a car to your garage from a scan, the photo and the car you confirmed can be kept to build Kastr's own recognition model. The permission prompt explains this when you allow AI identification, and you can turn it off at any time in Settings > Scanner. These photos are kept in private storage with the car and a hashed identifier of your app installation, without your account or your name. Their retention period has not been set yet and will be stated here; until then, you can ask us to delete them.",
        "To count scan credits, we keep a scan counter linked to your account, or to a hashed identifier of your app installation if you have no account.",
      ],
    },
    {
      id: "purchases",
      heading: "Purchases and Kastr Pro",
      blocks: [
        "Kastr Pro is sold through the App Store. Apple handles payment, and we never receive your card number or billing address.",
        "We use RevenueCat to know whether you have an active subscription and to let you restore it. RevenueCat receives an app user identifier (your account identifier if you are signed in), your purchase and subscription history in Kastr, transaction identifiers, your store country and currency, your device type and your app version. Our server keeps whether your account has Kastr Pro, its end date and any referral bonus.",
      ],
    },
    {
      id: "analytics",
      heading: "Analytics",
      blocks: [
        "Kastr does not use any analytics, crash reporting or tracking tool today. We do not use the advertising identifier (IDFA), we do not track you across other companies' apps or websites, and the app does not ask for tracking permission because it does not track. If we add anonymous usage analytics later, we will update this policy before the update that adds them.",
      ],
    },
    {
      id: "photos",
      heading: "Catalog photos",
      blocks: [
        "Car photos in the catalog are downloaded from image servers when you view them. Today, most are served by Fandom, Inc., which hosts the wikis our catalog comes from. Like any web request, downloading a photo reveals your IP address to the server that sends it. No account data is shared with it.",
      ],
    },
    {
      id: "prices",
      heading: "Values, releases, currencies and eBay links",
      blocks: [
        "Values come from recent eBay sales, which our server collects through eBay's programming interfaces and through a sales data provider (Trawl), and from the prices collectors share in Kastr. New releases and case letters come from public collector wikis. Our server only sends these services its own searches about cars, never data about you.",
        "Prices are converted to your currency with the daily reference rates published by the European Central Bank. The original price is shown next to it.",
        "\"Where to find it\" shows eBay listings open right now. Opening one takes you to eBay, whose own privacy policy then applies. These links may be eBay Partner Network affiliate links: if you buy, Kastr may earn a commission at no extra cost to you, and eBay may use cookies or similar technology to attribute the purchase.",
      ],
    },
    {
      id: "website",
      heading: "This website and email",
      blocks: [
        "kastr.app is hosted by Cloudflare. Like any web host, Cloudflare processes your IP address and basic request data in server logs to deliver pages and protect the site. The website sets no cookies and runs no analytics or advertising scripts.",
        "Emails sent to support@kastr.app are forwarded by Cloudflare to our mailbox hosted by Google. We use your message and email address only to answer you.",
      ],
    },
    {
      id: "permissions",
      heading: "iPhone permissions",
      blocks: [
        "Kastr asks for camera access only when you scan or take a photo of a car, for photo library access only when you pick a picture, and for notifications only after an action where they are useful (for example your first post). You can change these permissions at any time in the iPhone Settings app. Kastr works without them.",
      ],
    },
    {
      id: "bases",
      heading: "Why we process data (legal bases)",
      blocks: [
        {
          list: [
            "To provide the service you ask for (account, sign-in emails, sync, scanning, community, notifications you allowed, Kastr Pro): performance of our contract with you.",
            "To keep Kastr secure, moderate content, prevent abuse of free credits and referral rewards, and compute aggregate prices: our legitimate interests, balanced against your rights.",
            "To keep scan photos for improving recognition, and to send you the newsletter: your consent, which you can withdraw at any time.",
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
            "Apple Inc. and its affiliates (USA, Ireland): Sign in with Apple, App Store payments and push notifications.",
            "Supabase, Inc. (USA), with data hosted in the European Union (Paris, France): accounts, database, file storage and server functions.",
            "Resend, Inc. (USA): sending sign-in codes and, later, the newsletter.",
            "RevenueCat, Inc. (USA): subscription status.",
            "OpenAI, L.L.C. (USA): identification of scanned cars, only when you use AI identification.",
            "Cloudflare, Inc. (USA): website hosting, domain and forwarding of emails to support@kastr.app.",
            "Google LLC (USA): the mailbox where support emails arrive.",
            "Fandom, Inc. (USA): delivery of most catalog photos.",
          ],
        },
        "We may also disclose data if the law requires it, or to protect the safety of users.",
      ],
    },
    {
      id: "transfers",
      heading: "International transfers",
      blocks: [
        "Several of these providers are based in the United States. When personal data leaves the European Economic Area, it is protected by the provider's certification under the EU-U.S. Data Privacy Framework or by the European Commission's Standard Contractual Clauses.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep data",
      blocks: [
        {
          list: [
            "Data on your iPhone: until you delete it or delete the app.",
            "Account, profile, synced garage, posts, comments, likes, follows, activity, push tokens and proposals: until you delete your account (push tokens earlier, see above). They are then removed from our active systems right away, and from our provider's backups when they rotate.",
            "Approved catalog data you contributed stays in the catalog without your name. Aggregated prices stay without any link to you.",
            "Newsletter: until you unsubscribe or delete your account. We keep the record of your consent for up to 3 years after you unsubscribe, to be able to prove it.",
            "Reports and moderation decisions: up to 12 months, longer only if needed for a legal claim.",
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
        "You can delete your account from your profile in the app (account settings, Delete my account). This deletes your profile, your synced garage and its photos, your posts, comments, likes, follows and activity, your proposals and their photos, your push tokens, your newsletter subscription and your scan credits. If your account uses Sign in with Apple, the app asks you to confirm with Apple so that Kastr's access to your Apple ID is revoked too.",
        `Your subscription history at RevenueCat is linked to an identifier, not to your name; we delete it on request. Scan photos kept for training are not linked to your account; ask us if you want them deleted. Write to ${mail} for either.`,
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
        "Kastr can be used by collectors of any age without an account: the garage, the scanner, the catalog and the hunt list. Joining the community requires being at least 13, or the minimum age set by the law of your country. When you choose a username, you give your year of birth; we keep only your age band and refuse the profile under 13. For collectors aged 13 to 15, the public web page is off by default and never indexed, and they are not subscribed to the newsletter. If you believe a child has created an account without the consent required in their country, contact us and we will delete it.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      blocks: [
        "Data travels over encrypted connections. Account data is protected by access rules so each user can only read their own private data, secret keys stay on our servers and never in the app, and your sign-in session is kept in the iPhone keychain.",
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
    "Ce que Kastr collecte, pourquoi, qui le traite, ce qui est public dans la communauté et comment le supprimer. Pas de publicité, pas de pistage publicitaire, aucune donnée vendue.",
  dated: true,
  intro: [
    "Cette politique explique quelles données l'app iPhone Kastr et le site kastr.app collectent, pourquoi, qui nous aide à les traiter, ce que les autres collectionneurs peuvent voir et quels sont vos droits.",
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
            "Votre garage fonctionne sans compte et reste alors sur votre iPhone.",
            "Le compte est facultatif. Avec un compte, votre garage est sauvegardé et synchronisé en privé, et vous pouvez rejoindre la communauté.",
            "Dans la communauté, votre pseudo, votre bio, votre voiture-avatar, vos publications et, sauf si vous la masquez, la liste des voitures de votre garage sont visibles par les autres collectionneurs, ainsi que sur votre page publique kastr.app/@pseudo, sauf si vous la désactivez. Le prix payé, le lieu de la trouvaille, vos notes et vos propres photos de vos voitures ne sont jamais montrés à personne.",
            "La communauté est réservée aux collectionneurs de 13 ans et plus. Nous ne conservons que votre tranche d'âge, jamais votre date ni votre année de naissance.",
            "Kastr n'utilise aujourd'hui aucun outil de statistiques ni de pistage.",
            "Les paiements passent par Apple. Nous ne voyons jamais vos données bancaires.",
            "Vous pouvez supprimer votre compte depuis l'app à tout moment.",
          ],
        },
      ],
    },
    {
      id: "device",
      heading: "Les données stockées sur votre iPhone",
      blocks: [
        "Vos garages et votre liste d'envies, le prix payé et sa devise, le lieu et la date d'une trouvaille, l'état, vos notes, les photos que vous ajoutez, les voitures que vous ajoutez vous-même, votre journal de chasse (noms de magasins et dates que vous saisissez) et vos réglages sont stockés sur votre appareil.",
        "Ces données sont incluses dans les sauvegardes de votre appareil selon vos propres réglages iCloud ou ordinateur. Supprimer l'app les supprime de l'appareil. Vous pouvez exporter votre garage en CSV à tout moment.",
        "Le widget Kastr lit un petit résumé (votre progression de chasse, le nombre de voitures et, avec Kastr Pro, la valeur du garage) que l'app lui transmet par le trousseau de l'iPhone. Ce résumé ne quitte jamais votre appareil.",
        "Le catalogue (noms, années, séries, numéros de jouet, lettres de caisse) est livré dans l'app et ne contient aucune donnée personnelle. Kastr n'accède pas à votre position.",
      ],
    },
    {
      id: "account",
      heading: "Votre compte (facultatif)",
      blocks: [
        "Vous pouvez créer un compte de deux façons :",
        {
          list: [
            "Se connecter avec Apple : nous recevons un identifiant Apple stable et l'adresse email qu'Apple nous transmet, qui peut être une adresse relais privée d'Apple si vous choisissez de masquer la vôtre.",
            "Email : vous saisissez votre adresse et nous vous envoyons un code à 6 chiffres. Le taper confirme l'adresse et vous connecte. Il n'y a pas de mot de passe. Le code expire au bout de 10 minutes.",
          ],
        },
        "Vous choisissez ensuite un pseudo et indiquez votre année de naissance. Seule votre tranche d'âge (moins de 13 ans, 13 à 15 ans, 16 ans et plus) est conservée, jamais l'année ; sous 13 ans, aucun profil ne peut être créé. Vous pouvez ajouter une courte bio et choisir une voiture du catalogue comme avatar (Kastr n'utilise pas de photos de profil). Nous conservons aussi la date de création du compte et, pour la sécurité, les traces de connexion tenues par notre prestataire d'authentification (dont les adresses IP).",
        "Les comptes sont gérés avec Supabase (authentification, base de données, stockage de fichiers et fonctions serveur). Notre projet Supabase est hébergé dans l'Union européenne (Paris, France).",
      ],
    },
    {
      id: "sync",
      heading: "Sauvegarde et synchronisation du garage",
      blocks: [
        "Quand vous êtes connecté, l'app copie votre collection sur nos serveurs pour que vous la retrouviez sur un nouvel iPhone et que vos appareils restent synchronisés : vos garages, vos voitures et leurs détails (prix payé, devise, lieu, état, notes, dates), les détails des voitures que vous avez ajoutées vous-même, votre liste d'envies, votre journal de chasse et les photos ajoutées à vos voitures. Les photos vont dans un stockage privé que seul votre compte peut lire.",
        "Cette copie est privée. Les autres utilisateurs ne voient jamais vos prix, lieux, notes, journal de chasse ni photos. Vous déconnecter laisse le garage sur votre iPhone ; supprimer votre compte supprime la copie sur nos serveurs.",
      ],
    },
    {
      id: "community",
      heading: "Communauté : ce que les autres voient",
      blocks: [
        "La communauté n'est accessible qu'avec un compte. Les autres utilisateurs connectés de Kastr peuvent voir :",
        {
          list: [
            "votre pseudo, votre bio et votre voiture-avatar ;",
            "votre nombre de voitures et de publications, le nombre de collectionneurs que vous suivez et qui vous suivent ;",
            "vos publications (texte, photo et voiture jointe) et vos commentaires ;",
            "les publications que vous aimez et les collectionneurs que vous suivez (l'app les affiche sous forme de totaux, mais ils sont lisibles par les autres utilisateurs connectés) ;",
            "la liste des voitures de votre garage (nom, marque, année, rareté et nombre d'exemplaires), sauf si vous désactivez « Afficher mon garage sur mon profil » dans les réglages de votre profil. Cette option est activée par défaut. La valeur de votre garage n'est jamais montrée aux autres.",
          ],
        },
        "Les photos de publications sont redimensionnées et réencodées sur votre iPhone avant l'envoi, ce qui retire leurs métadonnées cachées comme la position. Elles sont stockées sur un serveur qui les diffuse par des liens longs et impossibles à deviner : toute personne qui obtient un tel lien peut ouvrir la photo.",
        "Les membres Kastr Pro peuvent comparer leur garage avec le garage public d'un collectionneur. Seules des informations déjà publiques sont utilisées.",
        "Pour protéger la communauté, les publications et commentaires sont comparés à une liste de mots interdits au moment de leur publication. Quand vous signalez un contenu (avec le motif choisi) ou bloquez un utilisateur, nous l'enregistrons. Un contenu signalé par plusieurs personnes est masqué jusqu'à l'examen d'un modérateur. Les modérateurs voient le contenu signalé, son auteur et les motifs, et peuvent retirer un contenu ou bannir un compte qui enfreint les Conditions d'utilisation. Un compte banni ne peut plus publier.",
        "Quand quelqu'un aime ou commente votre publication, ou vous suit, une ligne s'ajoute à votre liste d'activité dans l'app.",
      ],
    },
    {
      id: "web-profile",
      heading: "Votre page publique sur kastr.app",
      blocks: [
        "Chaque profil de la communauté a aussi une page web publique à l'adresse kastr.app/@pseudo. Elle est activée par défaut pour les collectionneurs de 16 ans et plus : l'app vous le dit quand vous choisissez votre pseudo, et vous pouvez la désactiver à ce moment-là ou à tout moment dans les réglages de votre profil (« Afficher mon profil sur kastr.app »). Toute personne qui a le lien peut l'ouvrir, sans compte. Elle montre :",
        {
          list: [
            "votre pseudo, votre bio, votre voiture-avatar, vos totaux (voitures, publications, abonnés, abonnements) et vos badges ;",
            "les voitures de votre garage, si votre garage est affiché sur votre profil (nom, marque, année, rareté, nombre d'exemplaires, ainsi que la série et la lettre de caisse issues du catalogue) ;",
            "vos dernières publications qui ont une photo.",
          ],
        },
        "Elle ne montre jamais le prix payé, le lieu d'une trouvaille, vos notes, vos propres photos de vos voitures ni la valeur de votre garage.",
        "Les moteurs de recherche ne peuvent référencer votre page qu'une fois qu'elle a du contenu : au moins 10 voitures dans votre garage public, ou une trouvaille publiée. D'ici là, la page demande aux moteurs de ne pas l'indexer. Une page désactivée, ou celle d'un compte banni, n'affiche rien.",
        "Pour les collectionneurs de 13 à 15 ans, la page est désactivée par défaut et, s'ils l'activent, elle n'est jamais indexée par les moteurs de recherche.",
        "Votre liste d'envies est privée. Si vous choisissez « Partager ma liste d'envies », elle a sa propre page à l'adresse kastr.app/@pseudo/wishlist, avec pour chaque voiture un lien de recherche sur eBay (ces liens peuvent porter un code d'affiliation eBay Partner Network). Cette page n'est jamais indexée par les moteurs de recherche, et vous pouvez arrêter de la partager à tout moment.",
      ],
    },
    {
      id: "notifications",
      heading: "Notifications",
      blocks: [
        "Si vous autorisez les notifications, votre iPhone donne à l'app un jeton de notification. Nous le conservons avec votre compte, le type de version (test ou App Store), votre langue et vos choix de notifications (activité des autres collectionneurs, et alertes de sorties si vous avez Kastr Pro). Les notifications sont acheminées par le service de notifications push d'Apple. Le jeton est supprimé quand vous vous déconnectez, quand Apple nous indique qu'il n'est plus valable, ou quand vous supprimez votre compte. Vous pouvez couper les notifications à tout moment dans les Réglages de l'iPhone.",
      ],
    },
    {
      id: "newsletter",
      heading: "Newsletter",
      blocks: [
        "Quand vous créez un compte par email, vous pouvez choisir de recevoir la newsletter Kastr (trouvailles de la semaine, nouvelles sorties, publications de la communauté). Dans l'Espace économique européen, au Royaume-Uni, en Suisse, au Canada et au Brésil, la case est décochée : vous n'êtes inscrit que si vous la cochez. Ailleurs, elle peut être cochée par défaut et vous pouvez la décocher avant de continuer. Vous pouvez changer d'avis à tout moment dans les réglages du compte, et chaque newsletter contiendra un lien de désinscription.",
        "Nous conservons votre adresse, votre choix, l'endroit où vous l'avez fait et la date de votre accord, pour prouver votre consentement. Les newsletters seront envoyées avec Resend.",
        "Les collectionneurs de 13 à 15 ans ne sont jamais inscrits : si la case était cochée lors de l'inscription par email, l'abonnement est annulé dès qu'ils indiquent leur âge.",
      ],
    },
    {
      id: "contributions",
      heading: "Voitures ajoutées, prix partagés, retours",
      blocks: [
        "Une voiture absente du catalogue que vous ajoutez vous-même reste privée dans votre garage. Si vous choisissez de la proposer au catalogue, nous conservons la proposition (marque, nom, année, série, couleur, numéro de jouet, notes et photo) avec votre compte ; la photo est dans un stockage privé visible seulement par les modérateurs. Une fois validée, la voiture rejoint le catalogue public sans votre nom. Les prix ne sont jamais publiés un par un.",
        "Quand vous partagez le prix payé pour une voiture, il est envoyé sans votre compte, avec seulement un identifiant haché de votre installation de l'app, et n'est affiché que dans un agrégat (par exemple la médiane de plusieurs collectionneurs).",
        "Les retours envoyés depuis l'app sont conservés avec votre compte et la version de l'app, pour vous répondre et corriger le problème.",
        "Si vous saisissez le code de parrainage d'un ami, nous enregistrons qui a invité qui, pour attribuer la récompense. Cela reste privé.",
      ],
    },
    {
      id: "scan",
      heading: "Le scan",
      blocks: [
        "Le scan lit d'abord le code-barres et le numéro de jouet du blister sur votre iPhone, avec les outils embarqués d'Apple. Cette image reste sur votre appareil.",
        "Quand la lecture sur l'iPhone ne suffit pas, ou quand vous photographiez une voiture hors blister, Kastr peut l'identifier avec l'IA. L'app vous demande votre accord la première fois, et vous pouvez désactiver cette option à tout moment dans Réglages > Scanner. La photo est alors envoyée par une connexion chiffrée à notre serveur situé dans l'Union européenne, qui la transmet à OpenAI dans le seul but d'identifier la voiture. Notre serveur de scan ne stocke pas la photo et demande à OpenAI de ne pas conserver la requête. OpenAI n'utilise pas les données de son API pour entraîner ses modèles et peut les conserver jusqu'à 30 jours pour détecter les abus, puis les supprime.",
        "Aider à entraîner la reconnaissance de Kastr : quand vous ajoutez une voiture à votre garage depuis un scan, la photo et la voiture confirmée peuvent être conservées pour construire le propre modèle de reconnaissance de Kastr. La demande d'accord l'explique quand vous autorisez l'identification par IA, et vous pouvez désactiver ce réglage à tout moment dans Réglages > Scanner. Ces photos sont gardées dans un stockage privé avec la voiture et un identifiant haché de votre installation de l'app, sans votre compte ni votre nom. Leur durée de conservation n'est pas encore fixée et sera indiquée ici ; en attendant, vous pouvez nous demander de les supprimer.",
        "Pour compter les crédits de scan, nous conservons un compteur lié à votre compte, ou à un identifiant haché de votre installation de l'app si vous n'avez pas de compte.",
      ],
    },
    {
      id: "purchases",
      heading: "Achats et Kastr Pro",
      blocks: [
        "Kastr Pro est vendu via l'App Store. Apple gère le paiement : nous ne recevons jamais votre numéro de carte ni votre adresse de facturation.",
        "Nous utilisons RevenueCat pour savoir si votre abonnement est actif et vous permettre de le restaurer. RevenueCat reçoit un identifiant utilisateur (l'identifiant de votre compte si vous êtes connecté), l'historique de vos achats et abonnements dans Kastr, les identifiants de transaction, le pays et la devise de votre store, le type d'appareil et la version de l'app. Notre serveur conserve si votre compte a Kastr Pro, sa date de fin et un éventuel bonus de parrainage.",
      ],
    },
    {
      id: "analytics",
      heading: "Statistiques",
      blocks: [
        "Kastr n'utilise aujourd'hui aucun outil de statistiques, de rapport de plantage ni de pistage. Nous n'utilisons pas l'identifiant publicitaire (IDFA), nous ne vous suivons pas dans les apps ou sites d'autres sociétés, et l'app ne demande pas l'autorisation de suivi parce qu'elle ne suit pas. Si nous ajoutons plus tard des statistiques d'usage anonymes, nous mettrons cette politique à jour avant la version qui les ajoute.",
      ],
    },
    {
      id: "photos",
      heading: "Les photos du catalogue",
      blocks: [
        "Les photos de voitures du catalogue sont téléchargées depuis des serveurs d'images quand vous les affichez. Aujourd'hui, la plupart sont servies par Fandom, Inc., qui héberge les wikis dont vient notre catalogue. Comme pour toute requête web, télécharger une photo révèle votre adresse IP au serveur qui l'envoie. Aucune donnée de compte ne lui est transmise.",
      ],
    },
    {
      id: "prices",
      heading: "Valeurs, sorties, devises et liens eBay",
      blocks: [
        "Les valeurs viennent des ventes eBay récentes, que notre serveur collecte par les interfaces de programmation d'eBay et par un fournisseur de données de ventes (Trawl), et des prix partagés par les collectionneurs dans Kastr. Les nouvelles sorties et les lettres de caisse viennent de wikis publics de collectionneurs. Notre serveur n'envoie à ces services que ses propres recherches sur des voitures, jamais de données vous concernant.",
        "Les prix sont convertis dans votre devise avec les taux de référence quotidiens publiés par la Banque centrale européenne. Le prix d'origine est affiché à côté.",
        "« Où la trouver » affiche les annonces eBay ouvertes en ce moment. En ouvrir une vous emmène sur eBay, dont la propre politique de confidentialité s'applique alors. Ces liens peuvent être des liens affiliés eBay Partner Network : si vous achetez, Kastr peut toucher une commission sans surcoût pour vous, et eBay peut utiliser des cookies ou une technologie similaire pour attribuer l'achat.",
      ],
    },
    {
      id: "website",
      heading: "Ce site et les emails",
      blocks: [
        "kastr.app est hébergé par Cloudflare. Comme tout hébergeur, Cloudflare traite votre adresse IP et des données de requête de base dans des journaux serveur, pour afficher les pages et protéger le site. Le site ne dépose aucun cookie et n'utilise aucun script de statistiques ou de publicité.",
        "Les emails envoyés à support@kastr.app sont transférés par Cloudflare vers notre boîte hébergée par Google. Votre message et votre adresse servent uniquement à vous répondre.",
      ],
    },
    {
      id: "permissions",
      heading: "Autorisations de l'iPhone",
      blocks: [
        "Kastr demande l'accès à l'appareil photo seulement quand vous scannez ou photographiez une voiture, l'accès à la photothèque seulement quand vous y choisissez une image, et les notifications seulement après une action où elles sont utiles (par exemple votre première publication). Vous pouvez modifier ces autorisations à tout moment dans les Réglages de l'iPhone. Kastr fonctionne sans elles.",
      ],
    },
    {
      id: "bases",
      heading: "Pourquoi nous traitons ces données (bases légales)",
      blocks: [
        {
          list: [
            "Fournir le service demandé (compte, emails de connexion, synchronisation, scan, communauté, notifications autorisées, Kastr Pro) : exécution du contrat qui nous lie.",
            "Sécuriser Kastr, modérer les contenus, empêcher les abus de crédits gratuits et de parrainage, et calculer des prix agrégés : notre intérêt légitime, mis en balance avec vos droits.",
            "Conserver des photos de scan pour améliorer la reconnaissance, et vous envoyer la newsletter : votre consentement, que vous pouvez retirer à tout moment.",
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
            "Apple Inc. et ses filiales (États-Unis, Irlande) : Se connecter avec Apple, paiements App Store et notifications push.",
            "Supabase, Inc. (États-Unis), données hébergées dans l'Union européenne (Paris, France) : comptes, base de données, stockage de fichiers et fonctions serveur.",
            "Resend, Inc. (États-Unis) : envoi des codes de connexion et, plus tard, de la newsletter.",
            "RevenueCat, Inc. (États-Unis) : statut des abonnements.",
            "OpenAI, L.L.C. (États-Unis) : identification des voitures scannées, seulement quand vous utilisez l'identification par IA.",
            "Cloudflare, Inc. (États-Unis) : hébergement du site, nom de domaine et transfert des emails adressés à support@kastr.app.",
            "Google LLC (États-Unis) : la boîte où arrivent les emails d'assistance.",
            "Fandom, Inc. (États-Unis) : diffusion de la plupart des photos du catalogue.",
          ],
        },
        "Nous pouvons aussi communiquer des données si la loi l'exige, ou pour protéger la sécurité des utilisateurs.",
      ],
    },
    {
      id: "transfers",
      heading: "Transferts hors de l'Union européenne",
      blocks: [
        "Plusieurs de ces prestataires sont établis aux États-Unis. Quand des données personnelles quittent l'Espace économique européen, elles sont protégées par la certification du prestataire au Data Privacy Framework UE-États-Unis ou par les clauses contractuelles types de la Commission européenne.",
      ],
    },
    {
      id: "retention",
      heading: "Durées de conservation",
      blocks: [
        {
          list: [
            "Données sur votre iPhone : jusqu'à ce que vous les supprimiez ou supprimiez l'app.",
            "Compte, profil, garage synchronisé, publications, commentaires, mentions j'aime, abonnements, activité, jetons de notification et propositions : jusqu'à la suppression du compte (les jetons plus tôt, voir plus haut). Ils sont alors effacés aussitôt de nos systèmes actifs, puis des sauvegardes de notre prestataire lors de leur rotation.",
            "Les données de catalogue validées que vous avez apportées restent au catalogue, sans votre nom. Les prix agrégés restent sans lien avec vous.",
            "Newsletter : jusqu'à votre désinscription ou la suppression du compte. Nous gardons la trace de votre consentement jusqu'à 3 ans après la désinscription, pour pouvoir la prouver.",
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
        "Vous pouvez supprimer votre compte depuis votre profil dans l'app (réglages du compte, Supprimer mon compte). Cela supprime votre profil, votre garage synchronisé et ses photos, vos publications, commentaires, mentions j'aime, abonnements et activité, vos propositions et leurs photos, vos jetons de notification, votre inscription à la newsletter et vos crédits de scan. Si votre compte utilise Se connecter avec Apple, l'app vous demande de confirmer avec Apple pour que l'accès de Kastr à votre identifiant Apple soit aussi révoqué.",
        `Votre historique d'abonnement chez RevenueCat est lié à un identifiant, pas à votre nom ; nous le supprimons sur demande. Les photos de scan gardées pour l'entraînement ne sont pas liées à votre compte ; demandez-nous si vous voulez qu'elles soient supprimées. Écrivez à ${mail} dans les deux cas.`,
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
        "Kastr peut être utilisée par des collectionneurs de tout âge sans compte : le garage, le scanner, le catalogue et la liste de chasse. Rejoindre la communauté demande d'avoir au moins 13 ans, ou l'âge minimum fixé par la loi de votre pays. Quand vous choisissez un pseudo, vous indiquez votre année de naissance ; nous ne conservons que votre tranche d'âge et refusons le profil sous 13 ans. Pour les collectionneurs de 13 à 15 ans, la page web publique est désactivée par défaut et jamais indexée, et ils ne sont pas inscrits à la newsletter. Si vous pensez qu'un enfant a créé un compte sans le consentement requis, contactez-nous et nous le supprimerons.",
      ],
    },
    {
      id: "security",
      heading: "Sécurité",
      blocks: [
        "Les données circulent par des connexions chiffrées. Les données de compte sont protégées par des règles d'accès qui ne laissent chaque utilisateur lire que ses propres données privées, les clés secrètes restent sur nos serveurs et jamais dans l'app, et votre session de connexion est gardée dans le trousseau de l'iPhone.",
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

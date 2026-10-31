import { docRoute } from "@/lib/doc-route";
import { getPrivacy } from "@/lib/legal/privacy";

const route = docRoute("/privacy", getPrivacy);

export const generateMetadata = route.generateMetadata;
export default route.Page;

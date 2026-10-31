import { docRoute } from "@/lib/doc-route";
import { getCredits } from "@/lib/legal/credits";

const route = docRoute("/credits", getCredits);

export const generateMetadata = route.generateMetadata;
export default route.Page;

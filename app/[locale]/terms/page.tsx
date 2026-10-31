import { docRoute } from "@/lib/doc-route";
import { getTerms } from "@/lib/legal/terms";

const route = docRoute("/terms", getTerms);

export const generateMetadata = route.generateMetadata;
export default route.Page;

import { docRoute } from "@/lib/doc-route";
import { getSupport } from "@/lib/legal/support";

const route = docRoute("/support", getSupport);

export const generateMetadata = route.generateMetadata;
export default route.Page;

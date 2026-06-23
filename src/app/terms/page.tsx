import { LegalPage } from "@/components/LegalPage";
import { termsOfService } from "@/content/legal";
import { t } from "@/lib/translations";

export const metadata = {
  title: t.termsPageTitle,
};

/** Terms of service page. */
export default function TermsPage() {
  return <LegalPage doc={termsOfService} />;
}

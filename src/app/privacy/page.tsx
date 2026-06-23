import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/content/legal";
import { t } from "@/lib/translations";

export const metadata = {
  title: t.privacyPageTitle,
};

/** Privacy policy page. */
export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}

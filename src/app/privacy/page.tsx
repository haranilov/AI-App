import { LegalPage } from "@/components/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata = {
  title: "Privacy Policy — HookAI",
};

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} backLabel="Back" />;
}

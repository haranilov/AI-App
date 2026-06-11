import { LegalPage } from "@/components/LegalPage";
import { termsOfService } from "@/content/legal";

export const metadata = {
  title: "Terms of Service — HookAI",
};

export default function TermsPage() {
  return <LegalPage doc={termsOfService} backLabel="Back" />;
}

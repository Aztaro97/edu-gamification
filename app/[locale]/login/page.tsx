import { LoginForm } from "@/features/login/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect(`/${locale}`);
  }

  return <LoginForm locale={locale} />;
}

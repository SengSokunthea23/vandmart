import { LoginForm } from "@/components/auth";

export default async function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">Sign in to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

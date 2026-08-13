"use client";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const currentPath = window.location.pathname + window.location.search;
    const redirectParam = encodeURIComponent(currentPath);

    window.location.href = `${apiBaseUrl}/auth/login/google?redirect=${redirectParam}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full bg-white/5 text-white/42 rounded-none border-0 py-[clamp(12px,1.2vw,18px)] px-5 font-mono font-[400] uppercase tracking-[0.22em] text-[clamp(11px,0.78vw,14px)] hover:bg-white/9 hover:text-white transition-all duration-250 cursor-pointer outline-none focus-visible:outline focus-visible:outline-white/70 focus-visible:outline-offset-[3px]"
    >
      SIGN IN WITH GOOGLE
    </button>
  );
};

export default GoogleLogin;

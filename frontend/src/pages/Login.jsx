import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import loginHero from '../assets/login_hero.png';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let response;

      if (currentState === 'Sign Up') {
        response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
      }

      const { success, token: authToken, user, message } = response.data;

      if (success) {
        setToken(authToken);
        localStorage.setItem('token', authToken);

        if (user && user._id) {
          localStorage.setItem('userId', user._id);
        }
        toast.success(currentState === 'Login' ? 'Successfully signed in!' : 'Account created successfully!');
      } else {
        let shownMsg = message || 'Authentication failed.';
        if (currentState !== 'Sign Up' && /already\s*exi(ts|st)/i.test(shownMsg)) {
          shownMsg = 'User does not exist';
        }
        toast.error(shownMsg);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleSocialLogin = (platform) => {
    toast.info(`${platform} login is simulated. Connecting to auth provider...`);
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.warning('Please enter your email address first.');
      return;
    }
    toast.info(`Reset link sent to ${email} (Simulation).`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white overflow-hidden">
      {/* Left side: Premium Boutique Lifestyle Showcase */}
      <div className="hidden lg:flex lg:flex-[1.2] relative flex-col justify-between p-12 bg-gradient-to-br from-[#d33c06] via-[#ff521a] to-[#ff7b00] text-white overflow-hidden">
        {/* Subtle mesh background overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18)_0%,transparent_45%)] z-1" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(0,0,0,0.12)_0%,transparent_55%)] z-1" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-5.5 h-5.5 text-[#d33c06]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight font-display text-white">Outlook</span>
        </div>

        {/* Showcase Cover Image */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-8">
          <img 
            src={loginHero} 
            alt="Shopping Showcase" 
            className="max-w-[90%] max-h-[420px] object-contain rounded-2xl shadow-2xl border border-white/20 transition-transform duration-500 hover:-translate-y-1.5 hover:scale-[1.01]" 
          />
        </div>

        <div className="relative z-10 text-center text-xs text-white/70 font-semibold">
          <span>Find your signature style with Outlook Store</span>
        </div>
      </div>

      {/* Right side: Modern Login / SignUp Form */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white min-h-screen">
        <div className="w-full max-w-[375px] flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-neutral-900 font-display">
              {currentState === 'Login' ? 'Sign in to Outlook' : 'Create an Account'}
            </h2>
          </div>

          <form onSubmit={onSubmitHandler} className="flex flex-col gap-[18px]">
            {/* Name Field (Sign Up Only) */}
            {currentState === 'Sign Up' && (
              <div className="w-full">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full px-5 py-4 border-none rounded-full bg-neutral-150 text-neutral-900 font-semibold placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ff521a]/25 focus:border-[#ff521a] transition-all duration-200"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="w-full">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-5 py-4 border-none rounded-full bg-neutral-150 text-neutral-900 font-semibold placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ff521a]/25 focus:border-[#ff521a] transition-all duration-200"
                type="email"
                placeholder="Email Address"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-5 py-4 pr-12 border-none rounded-full bg-neutral-150 text-neutral-900 font-semibold placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ff521a]/25 focus:border-[#ff521a] transition-all duration-200"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password Options */}
            <div className="flex items-center justify-between text-sm mt-1">
              <div 
                onClick={() => setRememberMe(!rememberMe)} 
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <div className={`w-[18px] h-[18px] border rounded-full flex items-center justify-center transition-all duration-200 ${rememberMe ? 'border-[#ff521a]' : 'border-neutral-300 group-hover:border-[#ff521a]'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full bg-[#ff521a] transition-transform duration-200 ${rememberMe ? 'scale-100' : 'scale-0'}`} />
                </div>
                <span className="text-[13px] font-semibold text-neutral-600">Remember me</span>
              </div>
              
              {currentState === 'Login' && (
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  className="text-[13px] font-semibold text-neutral-600 underline hover:text-[#ff521a] transition-colors"
                >
                  Forgot Password?
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 mt-2 bg-[#ff521a] text-white border-none rounded-full font-bold text-base cursor-pointer shadow-[0_4px_14px_rgba(255,82,26,0.25)] hover:bg-[#e03b0b] hover:shadow-[0_6px_20px_rgba(255,82,26,0.38)] active:scale-[0.99] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span>{currentState === 'Login' ? 'Sign in' : 'Create Account'}</span>
              )}
            </button>
          </form>

          {/* Social login divider */}
          <div className="flex items-center my-7 width-full">
            <span className="flex-1 h-[1.5px] bg-neutral-100"></span>
            <span className="px-3 text-xs font-semibold text-neutral-400 lowercase">Or login with</span>
            <span className="flex-1 h-[1.5px] bg-neutral-100"></span>
          </div>

          {/* Social login buttons */}
          <div className="flex flex-col gap-3">
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Google')} 
              className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-neutral-250 rounded-full font-bold text-sm text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button 
              type="button" 
              onClick={() => handleSocialLogin('Apple')} 
              className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-neutral-250 rounded-full font-bold text-sm text-neutral-700 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-200"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-1.01 2.95 1.08.08 2.18-.52 2.84-1.34z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Toggle Login/Sign Up footer */}
          <div className="mt-8 text-center text-sm">
            <span className="text-neutral-500 font-semibold">
              {currentState === 'Login' ? "Don’t have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
                className="text-[#ff521a] font-bold hover:underline"
              >
                {currentState === 'Login' ? 'Sign Up now' : 'Sign In now'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

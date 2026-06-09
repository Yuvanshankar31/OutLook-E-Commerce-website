import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginHero from '../assets/login_hero.png';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        if (rememberMe) {
          localStorage.setItem('admin_remembered_email', email);
        }
        navigate('/admin/list');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (platform) => {
    toast.info(`${platform} login is only available for customer accounts.`);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    toast.info("Password reset request simulated. Please check with database administrator.");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    toast.warning("Admin registration is disabled. Contact system administrator for access.");
  };

  return (
    <div className="auth-split-screen">
      {/* Left side: Premium Dashboard Showcase Image */}
      <div className="auth-showcase-panel">
        <div className="showcase-mesh-bg"></div>
        <div className="showcase-content">
          {/* Logo brand */}
          <div className="showcase-logo">
            <div className="logo-circle">
              <svg className="logo-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="brand-text">Outlook Admin</span>
          </div>

          {/* Showcase Cover Image */}
          <div className="showcase-image-wrapper">
            <img src={loginHero} alt="Outlook Admin Showcase" className="showcase-hero-image" />
          </div>
          
          {/* Subtle footer label */}
          <div className="showcase-subtext">
            <span>Powered by Outlook E-Commerce Suite</span>
          </div>
        </div>
      </div>

      {/* Right side: Modern Form */}
      <div className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="auth-form-header">
            <h2 className="auth-heading">Sign in to Admin</h2>
          </div>

          <form onSubmit={onSubmitHandler} className="auth-form-element">
            {/* Email Field */}
            <div className="auth-input-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="auth-input-field"
                type="email"
                placeholder="Email"
                required
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div className="auth-input-group password-group">
              <div className="password-input-wrapper">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="auth-input-field password-field"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="auth-form-options">
              <label className="remember-me-checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkbox-checkmark"></span>
                <span className="checkbox-label-text">Remember me</span>
              </label>
              <a href="#forgot" onClick={handleForgotPassword} className="forgot-password-link">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`auth-submit-btn ${isLoading ? 'btn-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="btn-spinner-wrapper">
                  <div className="auth-btn-spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Social login divider */}
          <div className="auth-social-divider">
            <span className="divider-line"></span>
            <span className="divider-text">Or login with</span>
            <span className="divider-line"></span>
          </div>

          {/* Social login buttons */}
          <div className="auth-social-buttons">
            <button type="button" onClick={() => handleSocialLogin('Google')} className="social-login-btn">
              <svg className="social-icon google-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" onClick={() => handleSocialLogin('Apple')} className="social-login-btn">
              <svg className="social-icon apple-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-1.01 2.95 1.08.08 2.18-.52 2.84-1.34z"/>
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Registration link */}
          <div className="auth-form-footer">
            <span className="footer-text">Don’t have an account? <a href="#signup" onClick={handleSignUp} className="signup-link">Sign Up now</a></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

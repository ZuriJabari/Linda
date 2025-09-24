import React, { useState } from 'react';

const NewsletterSignup = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Replace with actual newsletter service integration (Mailchimp, ConvertKit, etc.)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For now, just show success
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  const variants = {
    default: {
      container: 'bg-gray-50 p-6 rounded-lg border border-gray-200',
      title: 'text-xl font-bold font-serif text-black mb-3',
      description: 'text-gray-700 mb-4',
      input: 'flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent',
      button: 'px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50',
      success: 'text-green-600 text-sm mt-2',
      error: 'text-red-600 text-sm mt-2'
    },
    dark: {
      container: 'bg-black text-white p-8 rounded-lg text-center',
      title: 'text-2xl font-bold font-serif mb-4',
      description: 'text-gray-300 mb-6 max-w-2xl mx-auto',
      input: 'flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-white',
      button: 'px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50',
      success: 'text-green-400 text-sm mt-2',
      error: 'text-red-400 text-sm mt-2'
    }
  };

  const styles = variants[variant];

  return (
    <div className={`${styles.container} ${className}`}>
      <h3 className={styles.title}>Stay Connected</h3>
      <p className={styles.description}>
        {variant === 'dark'
          ? 'Subscribe to get notified when new episodes are released, plus exclusive behind-the-scenes content and updates from my work in philanthropy and community building.'
          : 'Subscribe to receive personal stories, creative insights, and updates on projects that inspire me.'
        }
      </p>

      <form onSubmit={handleSubmit} className={variant === 'dark' ? 'flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto' : 'flex gap-3'}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={styles.input}
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email.trim()}
          className={styles.button}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

      {status === 'success' && (
        <p className={styles.success}>
          Thanks for subscribing! You'll hear from me soon.
        </p>
      )}

      {status === 'error' && (
        <p className={styles.error}>
          Something went wrong. Please try again later.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;

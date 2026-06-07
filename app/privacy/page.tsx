'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'

export default function PrivacyPolicy() {
  return (
    <SmoothScroll>
      <main style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#000' }}>
        <Navbar />
        
        <div style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: 800, margin: '0 auto', padding: '120px 1.5rem 80px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ marginBottom: 40 }}>
              <Link href="/" style={{ color: '#00FFB2', textDecoration: 'none', fontWeight: 500, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                &larr; Back to Home
              </Link>
            </div>
            <h1 className="qp-headline" style={{ marginBottom: 16 }}>Privacy Policy</h1>
            <p className="qp-body" style={{ marginBottom: 48, color: '#86868B' }}>Last updated: May 21, 2026</p>

            <div style={{ color: '#E5E5EA', lineHeight: 1.8, fontSize: '1.1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>1. Introduction</h2>
              <p style={{ marginBottom: 24 }}>
                At Quantum Pixels, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our applications and services.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>2. Information We Collect</h2>
              <p style={{ marginBottom: 24 }}>
                We may collect information about you in a variety of ways. The information we may collect includes:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
                <li style={{ marginBottom: 8 }}><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and contact details, that you voluntarily give to us when you contact us.</li>
                <li style={{ marginBottom: 8 }}><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, your browser type, your operating system, and your access times.</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>3. Use of Your Information</h2>
              <p style={{ marginBottom: 24 }}>
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you to:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
                <li style={{ marginBottom: 8 }}>Respond to your comments, questions, and requests.</li>
                <li style={{ marginBottom: 8 }}>Improve our website and services to better serve you.</li>
                <li style={{ marginBottom: 8 }}>Compile anonymous statistical data for internal use.</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>4. Data Security</h2>
              <p style={{ marginBottom: 24 }}>
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>5. Contact Us</h2>
              <p style={{ marginBottom: 24 }}>
                If you have questions or comments about this Privacy Policy, please contact us at:
                <br />
                <a href="mailto:privacy@quantumpixels.dev" style={{ color: '#00FFB2', textDecoration: 'none' }}>privacy@quantumpixels.dev</a>
              </p>
              
              <div style={{ marginTop: 64 }}>
                <Link href="/" style={{ color: '#86868B', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 4 }}>
                  &larr; Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  )
}

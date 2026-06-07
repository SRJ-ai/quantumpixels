'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import { motion } from 'framer-motion'

export default function TermsOfService() {
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
            <h1 className="qp-headline" style={{ marginBottom: 16 }}>Terms of Service</h1>
            <p className="qp-body" style={{ marginBottom: 48, color: '#86868B' }}>Last updated: May 21, 2026</p>

            <div style={{ color: '#E5E5EA', lineHeight: 1.8, fontSize: '1.1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>1. Agreement to Terms</h2>
              <p style={{ marginBottom: 24 }}>
                These Terms of Service constitute a legally binding agreement made between you and Quantum Pixels, concerning your access to and use of our website and services. You agree that by accessing our site, you have read, understood, and agree to be bound by all of these Terms of Service.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>2. Intellectual Property Rights</h2>
              <p style={{ marginBottom: 24 }}>
                Unless otherwise indicated, the site and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the site are our proprietary property and are protected by copyright and trademark laws.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>3. User Representations</h2>
              <p style={{ marginBottom: 24 }}>
                By using the site, you represent and warrant that:
              </p>
              <ul style={{ paddingLeft: 24, marginBottom: 24 }}>
                <li style={{ marginBottom: 8 }}>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                <li style={{ marginBottom: 8 }}>You will not access the site through automated or non-human means, whether through a bot, script, or otherwise.</li>
                <li style={{ marginBottom: 8 }}>You will not use the site for any illegal or unauthorized purpose.</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>4. Limitation of Liability</h2>
              <p style={{ marginBottom: 24 }}>
                In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
              </p>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff', marginTop: 32, marginBottom: 16 }}>5. Contact Us</h2>
              <p style={{ marginBottom: 24 }}>
                In order to resolve a complaint regarding the site or to receive further information regarding use of the site, please contact us at:
                <br />
                <a href="mailto:legal@quantumpixels.dev" style={{ color: '#00FFB2', textDecoration: 'none' }}>legal@quantumpixels.dev</a>
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

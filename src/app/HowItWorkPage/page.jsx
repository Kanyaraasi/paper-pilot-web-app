'use client'
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

const HowItWorkPage = () => {
  const { theme } = useTheme();

  const styles = {
    container: {
      width: '100%',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--spacing-md)',
    },
    mainCard: {
      width: '100%',
      maxWidth: '1400px',
      backgroundColor: 'var(--bg-elevated)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      minHeight: '90vh',
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '90vh',
    },
    leftContainer: {
      flex: '1',
      padding: 'var(--spacing-2xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      minHeight: '90vh',
    },
    logoContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoBg: {
      position: 'relative',
      width: '280px',
      height: '280px',
      background: 'linear-gradient(135deg, var(--warning-100) 0%, var(--warning-200) 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-lg)',
    },
    logoText: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-sm)',
      fontSize: 'var(--font-3xl)',
      fontWeight: '700',
    },
    paperText: {
      color: 'var(--text-secondary)',
    },
    pilotText: {
      color: 'var(--accent-primary)',
    },
    numberCard: {
      position: 'absolute',
      width: '64px',
      height: '48px',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-md)',
      color: 'white',
      fontSize: 'var(--font-2xl)',
      fontWeight: '700',
      transition: 'all var(--transition-normal)',
      cursor: 'pointer',
    },
    numberCard1: {
      top: '-16px',
      left: '-32px',
      backgroundColor: 'var(--error-500)',
      transform: 'rotate(-12deg)',
    },
    numberCard2: {
      top: '-32px',
      left: '80px',
      background: 'linear-gradient(135deg, var(--accent-500) 0%, var(--info-500) 100%)',
      transform: 'rotate(6deg)',
    },
    numberCard3: {
      top: '-8px',
      right: '32px',
      backgroundColor: 'var(--success-500)',
      transform: 'rotate(12deg)',
    },
    numberCard4: {
      top: '56px',
      right: '-32px',
      backgroundColor: '#8b5cf6',
      transform: 'rotate(12deg)',
    },
    rightContainer: {
      flex: '1',
      padding: 'var(--spacing-3xl)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '90vh',
    },
    contentWrapper: {
      maxWidth: '500px',
      width: '100%',
    },
    title: {
      fontSize: 'var(--font-4xl)',
      fontWeight: '700',
      color: 'var(--text-primary)',
      marginBottom: 'var(--spacing-lg)',
      lineHeight: '1.2',
    },
    subtitle: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--font-lg)',
      marginBottom: 'var(--spacing-2xl)',
      lineHeight: '1.6',
    },
    stepsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--spacing-xl)',
    },
    stepItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--spacing-md)',
    },
    stepNumber: {
      flexShrink: 0,
      width: '40px',
      height: '40px',
      backgroundColor: 'var(--accent-primary)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '600',
      fontSize: 'var(--font-base)',
      boxShadow: 'var(--shadow-sm)',
    },
    stepContent: {
      flex: '1',
    },
    stepTitle: {
      fontSize: 'var(--font-lg)',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: 'var(--spacing-sm)',
      lineHeight: '1.4',
    },
    stepDescription: {
      color: 'var(--text-secondary)',
      fontSize: 'var(--font-base)',
      lineHeight: '1.6',
    },
    ctaButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--spacing-sm)',
      padding: 'var(--spacing-lg) var(--spacing-xl)',
      marginTop: 'var(--spacing-2xl)',
      background: 'linear-gradient(135deg, var(--accent-600) 0%, var(--accent-700) 100%)',
      color: 'white',
      borderRadius: 'var(--radius-xl)',
      fontWeight: '600',
      fontSize: 'var(--font-base)',
      textDecoration: 'none',
      transition: 'all var(--transition-normal)',
      boxShadow: 'var(--shadow-md)',
      border: 'none',
      cursor: 'pointer',
    },
    arrowIcon: {
      width: '20px',
      height: '20px',
      transition: 'transform var(--transition-normal)',
    },
    // Responsive styles
    '@media (max-width: 768px)': {
      flexContainer: {
        flexDirection: 'column',
      },
      leftContainer: {
        padding: 'var(--spacing-xl)',
        minHeight: '40vh',
      },
      rightContainer: {
        padding: 'var(--spacing-xl)',
      },
      logoBg: {
        width: '200px',
        height: '200px',
      },
      logoText: {
        fontSize: 'var(--font-2xl)',
      },
      title: {
        fontSize: 'var(--font-3xl)',
      },
      numberCard: {
        width: '48px',
        height: '36px',
        fontSize: 'var(--font-lg)',
      },
    },
  };

  return (
    <div style={styles.container} data-theme={theme}>
      <div style={styles.mainCard}>
        <div style={styles.flexContainer}>
          {/* Left Container - Image */}
          <div style={styles.leftContainer}>
            <div style={styles.logoContainer}>
              <div style={styles.logoBg}>
                <div style={styles.logoText}>
                  <div style={styles.paperText}>Paper</div>
                  <div style={styles.pilotText}>Pilot</div>
                </div>
              </div>

              {/* Number cards */}
              <div 
                style={{...styles.numberCard, ...styles.numberCard1}}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(-12deg) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(-12deg) scale(1)'}
              >
                1
              </div>
              <div 
                style={{...styles.numberCard, ...styles.numberCard2}}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(6deg) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(6deg) scale(1)'}
              >
                2
              </div>
              <div 
                style={{...styles.numberCard, ...styles.numberCard3}}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(12deg) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(12deg) scale(1)'}
              >
                3
              </div>
              <div 
                style={{...styles.numberCard, ...styles.numberCard4}}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(12deg) scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(12deg) scale(1)'}
              >
                4
              </div>
            </div>
          </div>

          {/* Right Container - Content */}
          <div style={styles.rightContainer}>
            <div style={styles.contentWrapper}>
              <h2 style={styles.title}>Four Simple Steps</h2>
              <p style={styles.subtitle}>
                Follow these steps to create your papers effortlessly and efficiently.
              </p>

              <div style={styles.stepsContainer}>
                <div style={styles.stepItem}>
                  <div style={styles.stepNumber}>1</div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>
                      Login is compulsory to access the system.
                    </h3>
                    <p style={styles.stepDescription}>
                      Each user will receive a unique and secure key ID after
                      successful authentication, ensuring data privacy and
                      security.
                    </p>
                  </div>
                </div>

                <div style={styles.stepItem}>
                  <div style={styles.stepNumber}>2</div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>
                      Fill Proper Details
                    </h3>
                    <p style={styles.stepDescription}>
                      Enter all details correctly such as selecting the grade,
                      subject, and exam details to ensure accurate paper generation.
                    </p>
                  </div>
                </div>

                <div style={styles.stepItem}>
                  <div style={styles.stepNumber}>3</div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>
                      Select Questions and Add New Ones
                    </h3>
                    <p style={styles.stepDescription}>
                      Based on the selected class, subject, and exam type, you
                      can filter and choose questions like fill-ups, match the
                      pair, one-sentence answers, answer in brief, etc.
                    </p>
                  </div>
                </div>

                <div style={styles.stepItem}>
                  <div style={styles.stepNumber}>4</div>
                  <div style={styles.stepContent}>
                    <h3 style={styles.stepTitle}>
                      Create and Download Question Paper
                    </h3>
                    <p style={styles.stepDescription}>
                      Choose from two download options: download only the
                      questions or download the questions with their answers.
                      Printing is also available for your convenience.
                    </p>
                  </div>
                </div>
              </div>

              <a href='/TestHistorySavedDashboard' style={{textDecoration: 'none'}}>
                <button 
                  style={styles.ctaButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    e.target.style.boxShadow = 'var(--shadow-xl)';
                    e.target.querySelector('svg').style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                    e.target.querySelector('svg').style.transform = 'translateX(0)';
                  }}
                >
                  <span>Start Creating Papers</span>
                  <svg 
                    style={styles.arrowIcon}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkPage;
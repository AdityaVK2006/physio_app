// src/screens/PremiumScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Switch,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PremiumScreen = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('annual');
  const [isAnnual, setIsAnnual] = useState(true);

  // Premium Features
  const premiumFeatures = [
    {
      icon: 'videocam',
      title: 'Unlimited Video Guides',
      description: 'Access to all professional exercise demonstrations',
      locked: false,
      color: '#667eea',
    },
    {
      icon: 'stats-chart',
      title: 'Advanced Analytics',
      description: 'Detailed progress tracking and recovery insights',
      locked: true,
      color: '#38B000',
    },
    {
      icon: 'medical',
      title: 'Personalized Plans',
      description: 'Custom exercise routines tailored to your needs',
      locked: true,
      color: '#FF6B6B',
    },
    {
      icon: 'calendar',
      title: 'Unlimited Sessions',
      description: 'Schedule unlimited therapy sessions',
      locked: true,
      color: '#FFD93D',
    },
    {
      icon: 'document-text',
      title: 'Professional Reports',
      description: 'Detailed recovery reports and progress summaries',
      locked: true,
      color: '#8a2be2',
    },
    {
      icon: 'chatbubbles',
      title: 'Therapist Support',
      description: 'Direct messaging with certified therapists',
      locked: true,
      color: '#00BFFF',
    },
  ];

  // Pricing Plans
  const pricingPlans = {
    monthly: {
      price: '$9.99',
      period: 'per month',
      savings: '',
      popular: false,
    },
    annual: {
      price: '$99.99',
      period: 'per year',
      savings: 'Save 16%',
      popular: true,
    },
    lifetime: {
      price: '$299.99',
      period: 'one-time payment',
      savings: 'Best Value',
      popular: false,
    },
  };

  // Benefits of Premium
  const premiumBenefits = [
    'Unlimited exercise video library',
    'Personalized recovery plans',
    'Advanced progress analytics',
    'Priority therapist support',
    'Offline exercise access',
    'Ad-free experience',
    'Weekly progress reports',
    'Family sharing (up to 5 users)',
  ];

  const handleSubscribe = (plan) => {
    console.log('Subscribing to plan:', plan);
    // Add subscription logic here
  };

  const restorePurchase = () => {
    console.log('Restoring purchase');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={styles.crownContainer}>
              <Ionicons name="crown" size={40} color="#FFD700" />
            </View>
            <Text style={styles.heroTitle}>Upgrade to Premium</Text>
            <Text style={styles.heroSubtitle}>
              Unlock advanced features for your recovery journey
            </Text>
          </View>
        </LinearGradient>

        {/* Current Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons name="person-circle" size={24} color="#667eea" />
            <Text style={styles.statusTitle}>Current Plan</Text>
          </View>
          <View style={styles.statusContent}>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeText}>FREE</Text>
            </View>
            <Text style={styles.currentPlan}>Free Plan</Text>
            <Text style={styles.planDescription}>
              Basic features • Limited access • With ads
            </Text>
          </View>
        </View>

        {/* Premium Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Features</Text>
          <View style={styles.featuresGrid}>
            {premiumFeatures.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                  <Ionicons 
                    name={feature.icon} 
                    size={24} 
                    color={feature.locked ? '#999' : feature.color} 
                  />
                  {feature.locked && (
                    <View style={styles.lockBadge}>
                      <Ionicons name="lock-closed" size={12} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={[
                  styles.featureTitle,
                  feature.locked && styles.featureLocked
                ]}>
                  {feature.title}
                </Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
                {feature.locked && (
                  <View style={styles.lockOverlay}>
                    <Ionicons name="lock-closed" size={20} color="#fff" />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Pricing Plans */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Choose Your Plan</Text>
            <View style={styles.billingToggle}>
              <Text style={styles.billingText}>Monthly</Text>
              <Switch
                value={isAnnual}
                onValueChange={setIsAnnual}
                trackColor={{ false: '#ddd', true: '#667eea' }}
                thumbColor="#fff"
              />
              <Text style={styles.billingText}>Annual</Text>
              <View style={styles.savingsBadge}>
                <Text style={styles.savingsText}>Save 16%</Text>
              </View>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.plansScroll}
            contentContainerStyle={styles.plansScrollContent}
          >
            {Object.entries(pricingPlans).map(([key, plan]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.planCard,
                  selectedPlan === key && styles.planCardSelected,
                  plan.popular && styles.planCardPopular
                ]}
                onPress={() => setSelectedPlan(key)}
              >
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularText}>MOST POPULAR</Text>
                  </View>
                )}

                <Text style={styles.planName}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{plan.price}</Text>
                  <Text style={styles.period}>{plan.period}</Text>
                </View>

                {plan.savings && (
                  <View style={styles.savingsTag}>
                    <Text style={styles.savingsTagText}>{plan.savings}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[
                    styles.subscribeButton,
                    selectedPlan === key && styles.subscribeButtonSelected
                  ]}
                  onPress={() => handleSubscribe(key)}
                >
                  <Text style={[
                    styles.subscribeText,
                    selectedPlan === key && styles.subscribeTextSelected
                  ]}>
                    {selectedPlan === key ? 'Selected' : 'Choose Plan'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Trial Info */}
          <View style={styles.trialCard}>
            <Ionicons name="gift" size={24} color="#667eea" />
            <View style={styles.trialContent}>
              <Text style={styles.trialTitle}>7-Day Free Trial</Text>
              <Text style={styles.trialDescription}>
                Try Premium features free for 7 days. Cancel anytime.
              </Text>
            </View>
          </View>
        </View>

        {/* Benefits List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premium Benefits</Text>
          <View style={styles.benefitsList}>
            {premiumBenefits.map((benefit, index) => (
              <View key={index} style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Ionicons name="checkmark-circle" size={20} color="#38B000" />
                </View>
                <Text style={styles.benefitText}>{benefit}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={styles.paymentMethod}>
              <Ionicons name="card" size={24} color="#667eea" />
              <Text style={styles.paymentText}>Credit/Debit Card</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentMethod}>
              <Ionicons name="logo-apple" size={24} color="#000" />
              <Text style={styles.paymentText}>Apple Pay</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.paymentMethod}>
              <Ionicons name="logo-google" size={24} color="#DB4437" />
              <Text style={styles.paymentText}>Google Pay</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms & Restore */}
        <View style={styles.footerSection}>
          <TouchableOpacity style={styles.restoreButton} onPress={restorePurchase}>
            <Text style={styles.restoreText}>Restore Purchase</Text>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>. Subscription auto-renews unless cancelled.
          </Text>
          
          <Text style={styles.footerNote}>
            Payment will be charged to your account upon confirmation. Cancel anytime from Settings.
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Subscribe Button */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity 
          style={styles.fixedSubscribeButton}
          onPress={() => handleSubscribe(selectedPlan)}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.fixedButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="crown" size={20} color="#FFD700" />
            <Text style={styles.fixedButtonText}>
              Start 7-Day Free Trial
            </Text>
            <Text style={styles.fixedButtonSubtext}>
              Then {pricingPlans[selectedPlan].price}/{pricingPlans[selectedPlan].period.includes('month') ? 'month' : 'year'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 25,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  crownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: 25,
    marginTop: -20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  statusContent: {
    alignItems: 'center',
  },
  planBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 10,
  },
  planBadgeText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '700',
  },
  currentPlan: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  billingToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  billingText: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
  savingsBadge: {
    backgroundColor: '#38B000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  savingsText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  lockBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureLocked: {
    color: '#999',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plansScroll: {
    marginHorizontal: -25,
  },
  plansScrollContent: {
    paddingHorizontal: 25,
    paddingRight: 10,
  },
  planCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#667eea',
    backgroundColor: '#f8f9ff',
  },
  planCardPopular: {
    borderColor: '#FFD700',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    backgroundColor: '#FFD700',
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
  },
  popularText: {
    fontSize: 10,
    color: '#333',
    fontWeight: '700',
  },
  planName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  price: {
    fontSize: 40,
    fontWeight: '800',
    color: '#333',
  },
  period: {
    fontSize: 14,
    color: '#666',
  },
  savingsTag: {
    backgroundColor: 'rgba(56, 176, 0, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'center',
    marginBottom: 20,
  },
  savingsTagText: {
    fontSize: 12,
    color: '#38B000',
    fontWeight: '600',
  },
  subscribeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    alignItems: 'center',
  },
  subscribeButtonSelected: {
    backgroundColor: '#667eea',
  },
  subscribeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  subscribeTextSelected: {
    color: '#fff',
  },
  trialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  trialContent: {
    flex: 1,
    marginLeft: 15,
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  trialDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  benefitsList: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitIcon: {
    marginRight: 15,
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  paymentMethods: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  footerSection: {
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: 'center',
  },
  restoreButton: {
    paddingVertical: 15,
  },
  restoreText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 10,
  },
  termsLink: {
    color: '#667eea',
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  fixedSubscribeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  fixedButtonGradient: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  fixedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },
  fixedButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    marginTop: 5,
  },
});

export default PremiumScreen;
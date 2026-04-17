import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_HEIGHT = SCREEN_HEIGHT * 0.82;

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  primary: '#B5541A',
  primaryLight: '#D4712A',
  primaryDark: '#8B3E0F',
  accent: '#E8A87C',
  white: '#FFFFFF',
  offWhite: '#FAF8F5',
  text: '#2C1A0E',
  textMuted: '#9E8370',
  border: '#E8DDD4',
  inputBg: '#FDF9F6',
  errorRed: '#C0392B',
  successGreen: '#27AE60',
  overlay: 'rgba(20, 10, 5, 0.35)',
  cardShadow: 'rgba(120, 60, 20, 0.18)',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const validate = (fields, mode = 'signup') => {
  const errors = {};
  if (!fields.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = 'Enter a valid email address';
  if (!fields.password) errors.password = 'Password is required';
  else if (fields.password.length < 8)
    errors.password = 'Minimum 8 characters';
  
  if (mode === 'signup') {
    if (!fields.fullName.trim()) errors.fullName = 'Full name is required';
    if (!fields.mobile.trim()) errors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(fields.mobile))
      errors.mobile = 'Enter a valid 10-digit number';
    if (!fields.flatNumber.trim()) errors.flatNumber = 'Flat number is required';
  }
  return errors;
};

const passwordStrength = (pw) => {
  if (!pw) return { label: '', color: C.border, width: '0%' };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: 'Weak', color: C.errorRed, width: '25%' },
    { label: 'Fair', color: '#E67E22', width: '50%' },
    { label: 'Good', color: '#F1C40F', width: '75%' },
    { label: 'Strong', color: C.successGreen, width: '100%' },
  ];
  return map[score - 1] || { label: '', color: C.border, width: '0%' };
};

// ─── Sub-components ──────────────────────────────────────────────────────────

const InputField = ({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, error, rightElement, multiline }) => (
  <View style={styles.inputWrapper}>
    <View style={[styles.inputRow, error && styles.inputError, multiline && styles.inputMultiline]}>
      <Text style={styles.inputIcon}>{icon}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultilineText]}
        placeholder={placeholder}
        placeholderTextColor={C.textMuted}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType || 'default'}
        autoCapitalize="none"
        multiline={multiline}
        numberOfLines={multiline ? 1 : undefined}
      />
      {rightElement}
    </View>
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const UploadBox = ({ file, onPress }) => (
  <TouchableOpacity style={[styles.uploadBox, file && styles.uploadBoxActive]} onPress={onPress} activeOpacity={0.75}>
    <Text style={styles.uploadIcon}>{file ? '✅' : '📎'}</Text>
    <Text style={[styles.uploadLabel, file && { color: C.primary }]}>
      {file ? file : 'Upload Proof (ID / Residency)'}
    </Text>
    <Text style={styles.uploadSub}>{file ? 'Tap to change' : 'JPG, PNG, PDF  •  Max 5MB'}</Text>
  </TouchableOpacity>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SocietyScreen({ setIsLoggedIn }) {
  const [showCard, setShowCard] = useState(false);
  const [cardMode, setCardMode] = useState('login'); // 'login' or 'signup'
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    mobile: '',
    flatNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Animations
  const cardAnim = useRef(new Animated.Value(CARD_HEIGHT)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(1)).current;
  const successScale = useRef(new Animated.Value(0)).current;

  const openCard = useCallback((mode = 'login') => {
    setCardMode(mode);
    setShowCard(true);
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 60,
        friction: 12,
      }),
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [cardAnim, backdropAnim, logoAnim]);

  const closeCard = useCallback(() => {
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: CARD_HEIGHT,
        useNativeDriver: true,
        tension: 70,
        friction: 14,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowCard(false));
  }, [cardAnim, backdropAnim, logoAnim]);

  const handleFieldChange = (key, val) => {
    setFields((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: null }));
  };

  const handleUpload = () => {
    // In a real app: use react-native-document-picker or expo-document-picker
    Alert.alert('Upload Proof', 'Choose a file source', [
      { text: 'Camera Roll', onPress: () => setUploadedFile('photo_id.jpg') },
      { text: 'Documents', onPress: () => setUploadedFile('residency_proof.pdf') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleSubmit = async () => {
    const errs = validate(fields, cardMode);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (cardMode === 'signup' && !uploadedFile) {
      Alert.alert('Missing Document', 'Please upload a proof document to continue.');
      return;
    }
    setLoading(true);
    try {
      // Mock login for testing without backend
      // TODO: Replace with actual API call when backend is ready
      const BACKEND_URL = 'http://localhost:3000';
      const endpoint = cardMode === 'login' ? '/auth/login' : '/auth/register';
      
      let response;
      try {
        response = await fetch(BACKEND_URL + endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: fields.email,
            password: fields.password,
            ...(cardMode === 'signup' && {
              fullName: fields.fullName,
              mobile: fields.mobile,
              flatNumber: fields.flatNumber,
            }),
          }),
          timeout: 5000,
        });

        const data = await response.json();

        if (!response.ok) {
          setLoading(false);
          if (response.status === 500) {
            Alert.alert('Server Error', 'The server encountered an error. Please try again later or contact support.');
          } else if (response.status === 401) {
            Alert.alert('Authentication Failed', 'Invalid email or password.');
          } else if (response.status === 400) {
            Alert.alert('Invalid Input', data.message || 'Please check your information and try again.');
          } else {
            Alert.alert('Error', data.message || `Error ${response.status}: ${response.statusText}`);
          }
          return;
        }
      } catch (fetchError) {
        // Backend not available - use mock mode
        console.warn('Backend unavailable, using mock login mode. Error:', fetchError.message);
        
        // Simulate successful auth for testing
        if (cardMode === 'login') {
          // Accept any valid email/password for testing
          console.log('Mock Login:', { email: fields.email, password: fields.password });
        } else {
          // Mock signup
          console.log('Mock Signup:', {
            fullName: fields.fullName,
            email: fields.email,
            mobile: fields.mobile,
            flatNumber: fields.flatNumber,
          });
        }
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      setLoading(false);
      setSubmitted(true);
      Animated.spring(successScale, { toValue: 1, useNativeDriver: true, tension: 80, friction: 8 }).start();
      setTimeout(() => {
        setSubmitted(false);
        successScale.setValue(0);
        closeCard();
        setFields({ fullName: '', email: '', mobile: '', flatNumber: '', password: '' });
        setUploadedFile(null);
        setErrors({});
        setIsLoggedIn(true);
      }, 2200);
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    }
  };

  const pwStrength = passwordStrength(fields.password);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Background image ── */}
      <ImageBackground
        source={require('../../assets/society-img.jpg')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.bgOverlay} />

        {/* ── Logo ── */}
        <Animated.View style={[styles.logoContainer, { opacity: logoAnim }]}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoEmoji}>🏢</Text>
          </View>
        </Animated.View>

        {/* ── Landing (no white card — content sits directly on the image) ── */}
        {!showCard && (
          <View style={styles.landingCard}>
            <Text style={styles.landingTitle}>Society Management</Text>
            <Text style={styles.landingSubtitle}>
              Lorem ipsum is simply dummy text of the printing and typesetting industry
            </Text>
            <TouchableOpacity style={styles.getStartedBtn} onPress={() => openCard('login')} activeOpacity={0.85}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
            <View style={styles.signupRow}>
              <Text style={styles.signupRowText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => openCard('signup')}>
                <Text style={styles.signupLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Backdrop dim ── */}
        {showCard && (
          <Animated.View
            style={[styles.backdrop, { opacity: backdropAnim }]}
            pointerEvents="none"
          />
        )}

        {/* ── Sign-up card ── */}
        {showCard && (
          <Animated.View
            style={[
              styles.signupCard,
              { transform: [{ translateY: cardAnim }] },
            ]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ flex: 1 }}
            >
              {/* Handle */}
              <View style={styles.handle} />

              {/* Back button */}
              <TouchableOpacity style={styles.backBtn} onPress={closeCard} hitSlop={{ top: 12, left: 12, bottom: 12, right: 12 }}>
                <Text style={styles.backArrow}>←</Text>
                <Text style={styles.backLabel}>Back</Text>
              </TouchableOpacity>

              {submitted ? (
                /* ── Success state ── */
                <View style={styles.successContainer}>
                  <Animated.View style={[styles.successCircle, { transform: [{ scale: successScale }] }]}>
                    <Text style={styles.successEmoji}>🎉</Text>
                  </Animated.View>
                  <Text style={styles.successTitle}>Welcome Aboard!</Text>
                  <Text style={styles.successSub}>Your account has been created. We'll verify your details and get back to you.</Text>
                </View>
              ) : cardMode === 'login' ? (
                /* ── Login Form ── */
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.formScroll}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.cardTitle}>Log in Account</Text>
                  <Text style={styles.cardSubtitle}>Hello, welcome back to our account</Text>

                  <InputField
                    icon="✉️"
                    placeholder="Email"
                    value={fields.email}
                    onChangeText={(v) => handleFieldChange('email', v)}
                    keyboardType="email-address"
                    error={errors.email}
                  />

                  <InputField
                    icon="🔒"
                    placeholder="Password"
                    value={fields.password}
                    onChangeText={(v) => handleFieldChange('password', v)}
                    secureTextEntry={!showPw}
                    error={errors.password}
                    rightElement={
                      <TouchableOpacity onPress={() => setShowPw((p) => !p)} style={styles.eyeBtn}>
                        <Text style={styles.eyeIcon}>{showPw ? '🙈' : '👁️'}</Text>
                      </TouchableOpacity>
                    }
                  />

                  <View style={styles.rememberRow}>
                    <Text style={styles.rememberText}>Remember me</Text>
                    <TouchableOpacity>
                      <Text style={styles.forgotLink}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={C.white} size="small" />
                    ) : (
                      <Text style={styles.submitText}>Log in</Text>
                    )}
                  </TouchableOpacity>

                  <View style={styles.socialRow}>
                    <Text style={styles.socialText}>Or Log in with</Text>
                  </View>

                  <View style={styles.socialButtonsRow}>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                      <Text style={styles.socialIcon}>G</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
                      <Text style={styles.socialIcon}>📱</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.loginRow}>
                    <Text style={styles.loginRowText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => setCardMode('signup')}>
                      <Text style={styles.signupLink}>Sign Up</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ height: 32 }} />
                </ScrollView>
              ) : (
                /* ── Signup Form ── */
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.formScroll}
                  keyboardShouldPersistTaps="handled"
                >
                  <Text style={styles.cardTitle}>Register Account</Text>
                  <Text style={styles.cardSubtitle}>Join your society — fill in your details below</Text>

                  <View style={styles.sectionLabel}><Text style={styles.sectionLabelText}>Personal Details</Text></View>

                  <InputField
                    icon="👤"
                    placeholder="Full Name"
                    value={fields.fullName}
                    onChangeText={(v) => handleFieldChange('fullName', v)}
                    error={errors.fullName}
                  />
                  <InputField
                    icon="✉️"
                    placeholder="Email Address"
                    value={fields.email}
                    onChangeText={(v) => handleFieldChange('email', v)}
                    keyboardType="email-address"
                    error={errors.email}
                  />
                  <InputField
                    icon="📱"
                    placeholder="Mobile Number"
                    value={fields.mobile}
                    onChangeText={(v) => handleFieldChange('mobile', v.replace(/[^0-9]/g, ''))}
                    keyboardType="number-pad"
                    error={errors.mobile}
                  />

                  <View style={styles.sectionLabel}><Text style={styles.sectionLabelText}>Residence Details</Text></View>

                  <InputField
                    icon="🏠"
                    placeholder="Flat / Unit Number  (e.g. A-204)"
                    value={fields.flatNumber}
                    onChangeText={(v) => handleFieldChange('flatNumber', v)}
                    error={errors.flatNumber}
                  />

                  <View style={styles.sectionLabel}><Text style={styles.sectionLabelText}>Security</Text></View>

                  <InputField
                    icon="🔒"
                    placeholder="Password"
                    value={fields.password}
                    onChangeText={(v) => handleFieldChange('password', v)}
                    secureTextEntry={!showPw}
                    error={errors.password}
                    rightElement={
                      <TouchableOpacity onPress={() => setShowPw((p) => !p)} style={styles.eyeBtn}>
                        <Text style={styles.eyeIcon}>{showPw ? '🙈' : '👁️'}</Text>
                      </TouchableOpacity>
                    }
                  />

                  {/* Password strength bar */}
                  {fields.password.length > 0 && (
                    <View style={styles.strengthRow}>
                      <View style={styles.strengthTrack}>
                        <View style={[styles.strengthFill, { width: pwStrength.width, backgroundColor: pwStrength.color }]} />
                      </View>
                      <Text style={[styles.strengthLabel, { color: pwStrength.color }]}>{pwStrength.label}</Text>
                    </View>
                  )}

                  <View style={styles.sectionLabel}><Text style={styles.sectionLabelText}>Verification</Text></View>

                  <UploadBox file={uploadedFile} onPress={handleUpload} />

                  <Text style={styles.disclaimer}>
                    By registering, you agree to the society's terms of use and privacy policy.
                  </Text>

                  {/* Submit */}
                  <TouchableOpacity
                    style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                    onPress={handleSubmit}
                    activeOpacity={0.85}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={C.white} size="small" />
                    ) : (
                      <Text style={styles.submitText}>Send For Approval</Text>
                    )}
                  </TouchableOpacity>

                  <View style={{ height: 32 }} />
                </ScrollView>
              )}
            </KeyboardAvoidingView>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1A0A02' },

  bg: { flex: 1, width: '100%', height: '100%' },

  bgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: C.overlay,
  },

  logoContainer: {
    position: 'absolute',
    top: 56,
    left: 22,
    zIndex: 10,
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoEmoji: { fontSize: 26 },

  // ── Landing ──
  landingCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: Platform.OS === 'ios' ? 48 : 36,
    backgroundColor: 'transparent',
  },
  landingTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: C.accent,
    textAlign: 'left',
    letterSpacing: 0.2,
    marginBottom: 10,
  },
  landingSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 32,
  },
  getStartedBtn: {
    backgroundColor: C.accent,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  getStartedText: {
    color: C.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.5,
  },


  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  signupRowText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: '700',
    color: C.accent,
  },

  // ── Backdrop ──
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,5,0,0.5)',
  },

  // ── Signup Card ──
  signupCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_HEIGHT,
    backgroundColor: C.offWhite,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: C.cardShadow,
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 24,
    overflow: 'hidden',
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
    marginTop: 12,
    marginBottom: 4,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backArrow: { fontSize: 18, color: C.primary, marginRight: 4 },
  backLabel: { fontSize: 15, color: C.primary, fontWeight: '600' },

  formScroll: {
    paddingHorizontal: 24,
    paddingTop: 6,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13.5,
    color: C.textMuted,
    marginBottom: 22,
    lineHeight: 19,
  },

  sectionLabel: {
    borderLeftWidth: 3,
    borderLeftColor: C.primaryLight,
    paddingLeft: 10,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Input ──
  inputWrapper: { marginBottom: 12 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.inputBg,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
  },
  inputMultiline: { alignItems: 'flex-start', paddingTop: 14 },
  inputError: { borderColor: C.errorRed },
  inputIcon: { fontSize: 16, marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 15,
    color: C.text,
    fontWeight: '500',
  },
  inputMultilineText: { minHeight: 56, textAlignVertical: 'top' },
  errorText: { fontSize: 12, color: C.errorRed, marginTop: 4, marginLeft: 4 },
  eyeBtn: { paddingLeft: 8 },
  eyeIcon: { fontSize: 16 },

  // ── Password Strength ──
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -6,
    marginBottom: 10,
  },
  strengthTrack: {
    flex: 1,
    height: 4,
    backgroundColor: C.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 10,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontSize: 11,
    fontWeight: '700',
    minWidth: 42,
    textAlign: 'right',
  },

  // ── Remember & Forgot ──
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberText: {
    fontSize: 13,
    color: C.textMuted,
  },
  forgotLink: {
    fontSize: 13,
    fontWeight: '600',
    color: C.primary,
  },

  // ── Social Login ──
  socialRow: {
    alignItems: 'center',
    marginVertical: 20,
  },
  socialText: {
    fontSize: 13,
    color: C.textMuted,
    fontWeight: '500',
  },
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialBtn: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: C.inputBg,
    borderWidth: 1.5,
    borderColor: C.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    fontSize: 20,
    fontWeight: '600',
    color: C.primary,
  },

  // ── Login Row ──
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  loginRowText: {
    fontSize: 14,
    color: C.textMuted,
  },

  // ── Upload ──
  uploadBox: {
    borderWidth: 1.5,
    borderColor: C.border,
    borderStyle: 'dashed',
    borderRadius: 14,
    backgroundColor: C.inputBg,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 14,
  },
  uploadBoxActive: {
    borderColor: C.primary,
    backgroundColor: 'rgba(181,84,26,0.05)',
    borderStyle: 'solid',
  },
  uploadIcon: { fontSize: 26, marginBottom: 6 },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: C.textMuted,
    textAlign: 'center',
    marginBottom: 4,
  },
  uploadSub: { fontSize: 11, color: C.textMuted, textAlign: 'center' },

  disclaimer: {
    fontSize: 11.5,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 20,
    paddingHorizontal: 8,
  },

  // ── Submit ──
  submitBtn: {
    backgroundColor: C.primary,
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: C.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
    minHeight: 54,
  },
  submitBtnDisabled: { opacity: 0.75 },
  submitText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  // ── Success ──
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(181,84,26,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: C.primary,
  },
  successEmoji: { fontSize: 44 },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: C.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  successSub: {
    fontSize: 14,
    color: C.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },
});
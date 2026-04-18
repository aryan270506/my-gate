import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const alertOptions = [
  { label: 'Fire', icon: 'flame-outline' },
  { label: 'Stuck In\nLift', icon: 'expand-outline' },
  { label: 'Animal\nThreat', icon: 'bonfire-outline' },
  { label: 'Visitor\nThreat', icon: 'accessibility-outline' },
];

export function RaiseAlertModal({ visible, onClose, onRaiseAlert }) {
  const [selectedAlert, setSelectedAlert] = useState('');
  const [notifySocietySecurity, setNotifySocietySecurity] = useState(true);
  const [showIssueInput, setShowIssueInput] = useState(false);
  const [customIssue, setCustomIssue] = useState('');

  const selectedAlertLabel = selectedAlert === 'ANY_OTHER_ISSUE'
    ? customIssue.trim() || 'Any Other Issue'
    : selectedAlert;

  const isRaiseEnabled =
    selectedAlert.length > 0 &&
    (selectedAlert !== 'ANY_OTHER_ISSUE' || customIssue.trim().length > 0);

  const handleSelectPresetAlert = (label) => {
    setSelectedAlert(label);
    setShowIssueInput(false);
  };

  const handleSelectAnyOtherIssue = () => {
    setSelectedAlert('ANY_OTHER_ISSUE');
    setShowIssueInput(true);
  };

  const handleAddToAlertList = () => {
    Alert.alert('Alert List', 'Add contacts feature can be integrated here.');
  };

  const handleRaiseAlarm = () => {
    if (!isRaiseEnabled) return;

    const payload = {
      alertType: selectedAlertLabel,
      notifySocietySecurity,
      timestamp: new Date().toISOString(),
    };

    if (onRaiseAlert) {
      onRaiseAlert(payload);
    }

    Alert.alert('Alert Raised', `${selectedAlertLabel} alert has been raised.`);
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.closeOverlayButton}
          onPress={onClose}
        >
          <Ionicons name="close" size={40} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.sheet}>
          <View style={styles.iconBubble}>
            <Ionicons name="radio-outline" size={52} color="#173A42" />
          </View>

          <View style={styles.optionsRow}>
            {alertOptions.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.optionItem}
                activeOpacity={0.8}
                onPress={() => handleSelectPresetAlert(item.label)}
              >
                <View
                  style={[
                    styles.optionIconCircle,
                    selectedAlert === item.label && styles.optionIconCircleActive,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={36}
                    color={selectedAlert === item.label ? '#173A42' : '#8A8A8A'}
                  />
                </View>
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.issueRow,
              selectedAlert === 'ANY_OTHER_ISSUE' && styles.issueRowActive,
            ]}
            activeOpacity={0.85}
            onPress={handleSelectAnyOtherIssue}
          >
            <Text style={styles.issueText}>Any Other Issue</Text>
          </TouchableOpacity>

          {showIssueInput && (
            <View style={styles.issueInputWrap}>
              <TextInput
                placeholder="Describe issue"
                placeholderTextColor="#8A8A8A"
                style={styles.issueInput}
                value={customIssue}
                onChangeText={setCustomIssue}
              />
            </View>
          )}

          <View style={styles.notifyHeader}>
            <Text style={styles.notifyTitle}>Notify my alert list</Text>
            <TouchableOpacity style={styles.addRow} activeOpacity={0.85} onPress={handleAddToAlertList}>
              <Text style={styles.addText}>+Add</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.listRow}
            activeOpacity={0.85}
            onPress={() => setNotifySocietySecurity((prev) => !prev)}
          >
            <Ionicons
              name={notifySocietySecurity ? 'checkbox' : 'square-outline'}
              size={34}
              color={notifySocietySecurity ? '#A6A6A6' : '#C9C9C9'}
            />
            <Text style={styles.listText}>Society Security</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={isRaiseEnabled ? styles.bottomButtonActive : styles.bottomButtonDisabled}
            activeOpacity={isRaiseEnabled ? 0.85 : 1}
            onPress={handleRaiseAlarm}
            disabled={!isRaiseEnabled}
          >
            <Ionicons
              name="radio-outline"
              size={30}
              color={isRaiseEnabled ? '#FFFFFF' : '#E6E6E6'}
            />
            <Text style={isRaiseEnabled ? styles.bottomButtonTextActive : styles.bottomButtonText}>
              Raise Alarm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.62)',
    justifyContent: 'flex-end',
  },
  closeOverlayButton: {
    position: 'absolute',
    top: 320,
    left: 20,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  sheet: {
    marginHorizontal: 18,
    marginBottom: 26,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    overflow: 'visible',
    paddingTop: 64,
  },
  iconBubble: {
    position: 'absolute',
    top: -56,
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 56,
    backgroundColor: '#F9DF07',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingBottom: 14,
  },
  optionItem: {
    width: '24%',
    alignItems: 'center',
  },
  optionIconCircle: {
    width: 75,
    height: 75,
    borderRadius: 41,
    borderWidth: 2,
    borderColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionIconCircleActive: {
    borderColor: '#173A42',
    backgroundColor: '#FFF8D5',
  },
  optionText: {
    fontSize: 11,
    lineHeight: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    fontWeight: '500',
  },
  issueRow: {
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    paddingVertical: 18,
    paddingHorizontal: 22,
  },
  issueRowActive: {
    backgroundColor: '#FFF8D5',
  },
  issueInputWrap: {
    paddingHorizontal: 22,
    paddingBottom: 12,
  },
  issueInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    paddingHorizontal: 12,
    color: '#1F1F1F',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  issueText: {
    fontSize: 20,
    color: '#173A42',
    fontWeight: '700',
  },
  notifyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  notifyTitle: {
    fontSize: 18,
    color: '#232323',
    fontWeight: '500',
  },
  addRow: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  addText: {
    fontSize: 18,
    color: '#173A42',
    fontWeight: '700',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingBottom: 18,
  },
  listText: {
    marginLeft: 14,
    fontSize: 18,
    color: '#3A3A3A',
  },
  bottomButtonDisabled: {
    height: 68,
    backgroundColor: '#CFCFCF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonActive: {
    height: 68,
    backgroundColor: '#dc3944',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonText: {
    marginLeft: 10,
    fontSize: 21,
    color: '#F1F1F1',
    fontWeight: '500',
  },
  bottomButtonTextActive: {
    marginLeft: 10,
    fontSize: 21,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

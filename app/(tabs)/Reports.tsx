// screens/ReportsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const { width } = Dimensions.get('window');

const ReportsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newReportTitle, setNewReportTitle] = useState('');

  const filters = ['All', 'Monthly', 'Weekly', 'Session', 'Assessment'];

  const reports = [
    {
      id: 1,
      title: 'Monthly Progress Report - October 2024',
      date: 'Oct 31, 2024',
      type: 'Monthly',
      therapist: 'Dr. Sarah Chen',
      duration: 'Full Month',
      status: 'completed',
      fileSize: '2.4 MB',
      summary: 'Excellent progress in knee mobility. Continue with current exercises.',
      color: '#44B8F3',
      metrics: {
        recovery: 85,
        adherence: 92,
        painLevel: 15,
      },
    },
    {
      id: 2,
      title: 'Weekly Assessment Report',
      date: 'Oct 28, 2024',
      type: 'Weekly',
      therapist: 'Dr. Michael Rodriguez',
      duration: 'Week 4',
      status: 'completed',
      fileSize: '1.8 MB',
      summary: 'Strength improved by 25%. Consider increasing resistance.',
      color: '#38B000',
      metrics: {
        recovery: 75,
        adherence: 88,
        painLevel: 25,
      },
    },
    {
      id: 3,
      title: 'Session Summary - Morning Therapy',
      date: 'Oct 25, 2024',
      type: 'Session',
      therapist: 'Dr. Sarah Chen',
      duration: '45 mins',
      status: 'completed',
      fileSize: '1.2 MB',
      summary: 'Good range of motion achieved. Minor discomfort reported.',
      color: '#FF6B6B',
      metrics: {
        recovery: 70,
        adherence: 95,
        painLevel: 30,
      },
    },
    {
      id: 4,
      title: 'Initial Assessment Report',
      date: 'Oct 15, 2024',
      type: 'Assessment',
      therapist: 'Dr. James Wilson',
      duration: '2 hours',
      status: 'completed',
      fileSize: '3.1 MB',
      summary: 'Baseline assessment complete. Treatment plan established.',
      color: '#FFD93D',
      metrics: {
        recovery: 50,
        adherence: 85,
        painLevel: 45,
      },
    },
    {
      id: 5,
      title: 'Progress Tracking Report',
      date: 'Oct 10, 2024',
      type: 'Monthly',
      therapist: 'Dr. Sarah Chen',
      duration: 'Month 1',
      status: 'completed',
      fileSize: '2.1 MB',
      summary: 'Steady improvement observed. Maintain current regimen.',
      color: '#3BA8E0',
      metrics: {
        recovery: 60,
        adherence: 90,
        painLevel: 35,
      },
    },
  ];

  const stats = {
    totalReports: 12,
    monthlyAvg: '4 reports',
    complianceRate: '94%',
    lastReport: '2 days ago',
  };

  const filteredReports = selectedFilter === 'All' 
    ? reports 
    : reports.filter(report => report.type === selectedFilter);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowReportModal(false);
      setNewReportTitle('');
      // Show success message
    }, 2000);
  };

  const viewReportDetails = (report) => {
    setSelectedReport(report);
    // Navigate to report details or show modal
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#38B000';
      case 'pending': return '#FFD93D';
      case 'failed': return '#FF6B6B';
      default: return '#44B8F3';
    }
  };

  const getStatusBgColor = (status) => {
    switch(status) {
      case 'completed': return 'rgba(56, 176, 0, 0.1)';
      case 'pending': return 'rgba(255, 217, 61, 0.1)';
      case 'failed': return 'rgba(255, 107, 107, 0.1)';
      default: return 'rgba(68, 184, 243, 0.1)';
    }
  };

  return (
    <LinearGradient
      colors={['#44B8F3', '#2A9FD9', '#44B8F3']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Reports</Text>
            <Text style={styles.subtitle}>Track your recovery progress</Text>
          </View>
          <TouchableOpacity 
            style={styles.analyticsButton}
            onPress={() => navigation.navigate('Analytics')}
          >
            <Ionicons name="analytics" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {[
            { label: 'Total Reports', value: stats.totalReports, icon: 'document-text', color: '#44B8F3' },
            { label: 'Monthly Avg', value: stats.monthlyAvg, icon: 'calendar', color: '#38B000' },
            { label: 'Compliance', value: stats.complianceRate, icon: 'checkmark-circle', color: '#FFD93D' },
            { label: 'Last Report', value: stats.lastReport, icon: 'time', color: '#FF6B6B' },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Filter Buttons */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Report Types</Text>
            <TouchableOpacity 
              style={styles.generateButton}
              onPress={() => setShowReportModal(true)}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.generateButtonText}>New Report</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
                {selectedFilter === filter && (
                  <View style={styles.filterDot} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reports List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedFilter === 'All' ? 'All Reports' : selectedFilter + ' Reports'}
            </Text>
            <Text style={styles.sectionCount}>{filteredReports.length} reports</Text>
          </View>

          {filteredReports.map((report) => (
            <TouchableOpacity 
              key={report.id}
              style={styles.reportCard}
              activeOpacity={0.9}
              onPress={() => viewReportDetails(report)}
            >
              <View style={styles.reportHeader}>
                <View style={[styles.reportType, { backgroundColor: report.color + '20' }]}>
                  <Text style={[styles.reportTypeText, { color: report.color }]}>
                    {report.type}
                  </Text>
                </View>
                
                <View style={styles.reportActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="share" size={18} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="download" size={18} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.reportTitle}>{report.title}</Text>
              
              <View style={styles.reportMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar" size={14} color="#666" />
                  <Text style={styles.metaText}>{report.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="person" size={14} color="#666" />
                  <Text style={styles.metaText}>{report.therapist}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time" size={14} color="#666" />
                  <Text style={styles.metaText}>{report.duration}</Text>
                </View>
              </View>

              <Text style={styles.reportSummary}>{report.summary}</Text>

              <View style={styles.reportMetrics}>
                <View style={styles.metricContainer}>
                  <Text style={styles.metricLabelSmall}>Recovery</Text>
                  <View style={styles.metricBar}>
                    <View 
                      style={[
                        styles.metricFill,
                        { 
                          width: `${report.metrics.recovery}%`,
                          backgroundColor: report.color
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricValueSmall}>{report.metrics.recovery}%</Text>
                </View>

                <View style={styles.metricContainer}>
                  <Text style={styles.metricLabelSmall}>Adherence</Text>
                  <View style={styles.metricBar}>
                    <View 
                      style={[
                        styles.metricFill,
                        { 
                          width: `${report.metrics.adherence}%`,
                          backgroundColor: report.color
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricValueSmall}>{report.metrics.adherence}%</Text>
                </View>

                <View style={styles.metricContainer}>
                  <Text style={styles.metricLabelSmall}>Pain Level</Text>
                  <View style={styles.metricBar}>
                    <View 
                      style={[
                        styles.metricFill,
                        { 
                          width: `${report.metrics.painLevel}%`,
                          backgroundColor: '#FF6B6B'
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.metricValueSmall}>{report.metrics.painLevel}%</Text>
                </View>
              </View>

              <View style={styles.reportFooter}>
                <View style={styles.fileInfo}>
                  <Ionicons name="document" size={16} color="#666" />
                  <Text style={styles.fileSize}>{report.fileSize}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(report.status) }]}>
                  <Ionicons 
                    name={report.status === 'completed' ? 'checkmark-circle' : 'time'} 
                    size={14} 
                    color={getStatusColor(report.status)} 
                  />
                  <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* Generate Report Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#44B8F3', '#2A9FD9']}
              style={styles.modalHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.modalTitle}>Generate New Report</Text>
              <TouchableOpacity 
                style={styles.modalClose}
                onPress={() => setShowReportModal(false)}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.modalContent}>
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionTitle}>Report Details</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="Report Title"
                  placeholderTextColor="#999"
                  value={newReportTitle}
                  onChangeText={setNewReportTitle}
                />

                <Text style={styles.modalLabel}>Report Type</Text>
                <View style={styles.typeOptions}>
                  {['Progress Report', 'Session Summary', 'Assessment', 'Custom'].map((type) => (
                    <TouchableOpacity key={type} style={styles.typeOption}>
                      <Text style={styles.typeOptionText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.modalLabel}>Time Period</Text>
                <View style={styles.periodOptions}>
                  {['Last Week', 'Last Month', 'Last Quarter', 'Custom Range'].map((period) => (
                    <TouchableOpacity key={period} style={styles.periodOption}>
                      <Text style={styles.periodOptionText}>{period}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {isGenerating ? (
                  <View style={styles.generatingContainer}>
                    <Progress.Circle 
                      size={60} 
                      indeterminate={true} 
                      color="#44B8F3" 
                    />
                    <Text style={styles.generatingText}>Generating Report...</Text>
                  </View>
                ) : (
                  <TouchableOpacity 
                    style={styles.generateModalButton}
                    onPress={handleGenerateReport}
                  >
                    <LinearGradient
                      colors={['#44B8F3', '#2A9FD9']}
                      style={styles.generateModalGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="document-text" size={24} color="#fff" />
                      <Text style={styles.generateModalText}>Generate Report</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  analyticsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
  sectionSubtitle: {
    fontSize: 14,
    color: '#44B8F3',
    fontWeight: '600',
  },
  sectionCount: {
    fontSize: 14,
    color: '#666',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#44B8F3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 5,
  },
  progressCard: {
    borderRadius: 20,
    padding: 25,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  progressPercent: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  progressBar: {
    marginBottom: 25,
  },
  progressMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  filtersScroll: {
    marginHorizontal: -5,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#44B8F3',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  reportType: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  reportTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reportActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  reportMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  reportSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  reportMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  metricContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  metricLabelSmall: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  metricBar: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  metricFill: {
    height: '100%',
    borderRadius: 4,
  },
  metricValueSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileSize: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  templatesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  templateCard: {
    width: (width - 80) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  templateIcon: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#44B8F3',
    fontWeight: '600',
  },
  exportOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exportButton: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  exportText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 25,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  typeOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  typeOptionText: {
    fontSize: 14,
    color: '#333',
  },
  periodOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  periodOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  periodOptionText: {
    fontSize: 14,
    color: '#333',
  },
  generatingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  generatingText: {
    fontSize: 16,
    color: '#44B8F3',
    marginTop: 20,
    fontWeight: '600',
  },
  generateModalButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
  },
  generateModalGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
  },
  generateModalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ReportsScreen;
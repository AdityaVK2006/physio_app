// screens/ReportsScreen.js
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ReportsScreen = ({ navigation }: any) => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newReportTitle, setNewReportTitle] = useState("");

  const filters = ["All", "AI Generated", "Doctor Sent"];

  const aiGeneratedReports = [
    {
      id: 1,
      title: "Weekly Progress Analysis - Week 4",
      date: "Nov 5, 2024",
      type: "AI Generated",
      duration: "Oct 29 - Nov 4",
      status: "completed",
      fileSize: "1.8 MB",
      summary:
        "AI analysis shows 30% improvement in range of motion compared to last week.",
      color: "#44B8F3",
      metrics: {
        recovery: 85,
        adherence: 92,
        painLevel: 15,
      },
      generatedBy: "AI System",
      aiInsights: [
        "Range of motion improved by 12%",
        "Exercise consistency at 94%",
        "Recommended: Increase resistance by 10%",
      ],
    },
    {
      id: 2,
      title: "Pain Pattern Analysis Report",
      date: "Nov 3, 2024",
      type: "AI Generated",
      duration: "Last 30 days",
      status: "completed",
      fileSize: "2.1 MB",
      summary:
        "AI detected pain patterns decreasing by 40% during morning sessions.",
      color: "#3BA8E0",
      metrics: {
        recovery: 78,
        adherence: 88,
        painLevel: 22,
      },
      generatedBy: "AI Pain Analyzer",
      aiInsights: [
        "Morning pain levels decreased by 40%",
        "Optimal exercise time: 9-11 AM",
        "Suggestion: Add 5-minute warm-up",
      ],
    },
    {
      id: 3,
      title: "Monthly Performance Overview",
      date: "Nov 1, 2024",
      type: "AI Generated",
      duration: "October 2024",
      status: "completed",
      fileSize: "2.5 MB",
      summary:
        "AI-generated comprehensive monthly performance review with personalized recommendations.",
      color: "#2A9FD9",
      metrics: {
        recovery: 90,
        adherence: 95,
        painLevel: 10,
      },
      generatedBy: "AI Analytics Engine",
      aiInsights: [
        "Overall recovery: 90% target achieved",
        "Exercise adherence: 95% (Excellent)",
        "Recommendation: Progress to intermediate level",
      ],
    },
  ];

  const doctorSentReports = [
    {
      id: 4,
      title: "Physiotherapy Assessment Report",
      date: "Oct 28, 2024",
      type: "Doctor Sent",
      doctor: "Dr. Sarah Chen",
      specialty: "Orthopedic Physiotherapist",
      duration: "45 mins assessment",
      status: "reviewed",
      fileSize: "3.2 MB",
      summary:
        "Professional assessment showing good progress in knee rehabilitation. Recommended exercises attached.",
      color: "#38B000",
      metrics: {
        recovery: 75,
        adherence: 85,
        painLevel: 25,
      },
      nextAppointment: "Nov 15, 2024",
      doctorNotes: [
        "Excellent patient compliance",
        "Range of motion improved significantly",
        "Continue current regimen for 2 more weeks",
      ],
    },
    {
      id: 5,
      title: "Progress Review & Treatment Plan",
      date: "Oct 20, 2024",
      type: "Doctor Sent",
      doctor: "Dr. Michael Rodriguez",
      specialty: "Sports Medicine",
      duration: "30 mins consultation",
      status: "pending review",
      fileSize: "2.8 MB",
      summary:
        "Updated treatment plan based on recent progress. New exercises added to regimen.",
      color: "#2E7D32",
      metrics: {
        recovery: 70,
        adherence: 80,
        painLevel: 30,
      },
      nextAppointment: "Follow-up in 4 weeks",
      doctorNotes: [
        "Strength improvement noted",
        "Consider adding resistance training",
        "Monitor pain levels closely",
      ],
    },
    {
      id: 6,
      title: "Initial Consultation Report",
      date: "Oct 10, 2024",
      type: "Doctor Sent",
      doctor: "Dr. James Wilson",
      specialty: "Rehabilitation Specialist",
      duration: "1 hour initial assessment",
      status: "reviewed",
      fileSize: "4.1 MB",
      summary:
        "Complete baseline assessment with detailed treatment roadmap for knee rehabilitation.",
      color: "#1B5E20",
      metrics: {
        recovery: 50,
        adherence: 75,
        painLevel: 45,
      },
      nextAppointment: "Oct 24, 2024",
      doctorNotes: [
        "Good candidate for physiotherapy",
        "Start with basic mobility exercises",
        "Follow-up in 2 weeks",
      ],
    },
  ];

  const stats = {
    totalReports: 12,
    aiReports: 8,
    doctorReports: 4,
    lastReport: "2 days ago",
  };

  const filteredReports =
    selectedFilter === "All"
      ? [...aiGeneratedReports, ...doctorSentReports]
      : selectedFilter === "AI Generated"
        ? aiGeneratedReports
        : doctorSentReports;

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowReportModal(false);
      setNewReportTitle("");
      // Show success message
    }, 2000);
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case "completed":
        return "#38B000";
      case "reviewed":
        return "#38B000";
      case "pending review":
        return "#FFD93D";
      case "failed":
        return "#FF6B6B";
      default:
        return "#44B8F3";
    }
  };

  const getStatusBgColor = (status: any) => {
    switch (status) {
      case "completed":
        return "rgba(56, 176, 0, 0.1)";
      case "reviewed":
        return "rgba(56, 176, 0, 0.1)";
      case "pending review":
        return "rgba(255, 217, 61, 0.1)";
      case "failed":
        return "rgba(255, 107, 107, 0.1)";
      default:
        return "rgba(68, 184, 243, 0.1)";
    }
  };

  const renderReportCard = (report: any) => {
    const isAIGenerated = report.type === "AI Generated";

    return (
      <TouchableOpacity
        key={report.id}
        style={styles.reportCard}
        activeOpacity={0.9}
        onPress={() => setSelectedReport(report)}
      >
        <View style={styles.reportHeader}>
          <View
            style={[
              styles.reportType,
              { backgroundColor: report.color + "20" },
            ]}
          >
            <Ionicons
              name={isAIGenerated ? "analytics" : "medical"}
              size={14}
              color={report.color}
              style={{ marginRight: 5 }}
            />
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
          {isAIGenerated ? (
            <View style={styles.metaItem}>
              <Ionicons name={"robot" as any} size={14} color="#666" />
              <Text style={styles.metaText}>{report.generatedBy}</Text>
            </View>
          ) : (
            <View style={styles.metaItem}>
              <Ionicons name="person" size={14} color="#666" />
              <Text style={styles.metaText}>{report.doctor}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <Ionicons name="time" size={14} color="#666" />
            <Text style={styles.metaText}>{report.duration}</Text>
          </View>
        </View>

        <Text style={styles.reportSummary}>{report.summary}</Text>

        {/* AI Insights or Doctor Notes */}
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>
            {isAIGenerated ? "AI Insights:" : "Doctor Notes:"}
          </Text>
          {(isAIGenerated ? report.aiInsights : report.doctorNotes)
            .slice(0, 2)
            .map((insight: any, index: any) => (
              <View key={index} style={styles.insightItem}>
                <Ionicons
                  name={isAIGenerated ? "bulb" : "medical"}
                  size={12}
                  color={report.color}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.insightText}>{insight}</Text>
              </View>
            ))}
        </View>

        <View style={styles.reportFooter}>
          <View style={styles.fileInfo}>
            <Ionicons name="document" size={16} color="#666" />
            <Text style={styles.fileSize}>{report.fileSize}</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusBgColor(report.status) },
            ]}
          >
            <Ionicons
              name={
                report.status.includes("completed") ||
                report.status.includes("reviewed")
                  ? "checkmark-circle"
                  : "time"
              }
              size={14}
              color={getStatusColor(report.status)}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(report.status) },
              ]}
            >
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={["#44B8F3", "#2A9FD9", "#44B8F3"]}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Reports</Text>
            <Text style={styles.subtitle}>Track your recovery progress</Text>
          </View>
          <TouchableOpacity
            style={styles.analyticsButton}
            onPress={() => navigation.navigate("Analytics")}
          >
            <Ionicons name="analytics" size={24} color="#fff" />
          </TouchableOpacity>
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
                  selectedFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Ionicons
                  name={
                    filter === "AI Generated"
                      ? "robot"
                      : filter === "Doctor Sent"
                        ? "medical"
                        : "apps"
                  }
                  size={16}
                  color={selectedFilter === filter ? "#fff" : "#666"}
                  style={{ marginRight: 5 }}
                />
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter}
                </Text>
                {selectedFilter === filter && <View style={styles.filterDot} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Reports List */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedFilter === "All"
                ? "All Reports"
                : selectedFilter === "AI Generated"
                  ? "AI Generated Reports"
                  : "Doctor Sent Reports"}
            </Text>
            <Text style={styles.sectionCount}>
              {filteredReports.length} reports
            </Text>
          </View>

          {filteredReports.map(renderReportCard)}
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {[
            {
              label: "Total Reports",
              value: stats.totalReports,
              icon: "document-text",
              color: "#44B8F3",
            },
            {
              label: "AI Generated",
              value: stats.aiReports,
              icon: "robot",
              color: "#3BA8E0",
            },
            {
              label: "Doctor Sent",
              value: stats.doctorReports,
              icon: "medical",
              color: "#38B000",
            },
            {
              label: "Last Report",
              value: stats.lastReport,
              icon: "time",
              color: "#FFD93D",
            },
          ].map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: stat.color + "20" },
                ]}
              >
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
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
              colors={["#44B8F3", "#2A9FD9"]}
              style={styles.modalHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.modalTitle}>Generate AI Report</Text>
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
                  {[
                    "Progress Analysis",
                    "Pain Pattern",
                    "Performance Overview",
                  ].map((type) => (
                    <TouchableOpacity key={type} style={styles.typeOption}>
                      <Ionicons
                        name="robot"
                        size={16}
                        color="#44B8F3"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.typeOptionText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.modalLabel}>Analysis Period</Text>
                <View style={styles.periodOptions}>
                  {[
                    "Last Week",
                    "Last 2 Weeks",
                    "Last Month",
                    "Custom Range",
                  ].map((period) => (
                    <TouchableOpacity key={period} style={styles.periodOption}>
                      <Text style={styles.periodOptionText}>{period}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {isGenerating ? (
                  <View style={styles.generatingContainer}>
                    <View style={styles.loadingSpinner}>
                      <Ionicons
                        name="sync"
                        size={40}
                        color="#44B8F3"
                        style={styles.spinnerIcon}
                      />
                    </View>
                    <Text style={styles.generatingText}>
                      AI Generating Report...
                    </Text>
                    <Text style={styles.generatingSubtext}>
                      Analyzing your progress data
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.generateModalButton}
                    onPress={handleGenerateReport}
                  >
                    <LinearGradient
                      colors={["#44B8F3", "#2A9FD9"]}
                      style={styles.generateModalGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Ionicons name="analytics" size={24} color="#fff" />
                      <Text style={styles.generateModalText}>
                        Generate AI Report
                      </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  analyticsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  sectionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 25,
    marginHorizontal: 25,
    marginBottom: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  sectionCount: {
    fontSize: 14,
    color: "#666",
  },
  generateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#44B8F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 5,
  },
  filtersScroll: {
    marginHorizontal: -5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    marginHorizontal: 5,
  },
  filterButtonActive: {
    backgroundColor: "#44B8F3",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
  filterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginLeft: 8,
  },
  reportCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  reportType: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  reportTypeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  reportActions: {
    flexDirection: "row",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    lineHeight: 24,
  },
  reportMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  reportSummary: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 15,
  },
  insightsContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  insightItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  insightText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
    flex: 1,
  },
  reportFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 15,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  modalClose: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 25,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  typeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  typeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  typeOptionText: {
    fontSize: 14,
    color: "#333",
  },
  periodOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
  },
  periodOption: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  periodOptionText: {
    fontSize: 14,
    color: "#333",
  },
  generatingContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingSpinner: {
    marginBottom: 20,
  },
  spinnerIcon: {
    transform: [{ rotate: "0deg" }],
  },
  generatingText: {
    fontSize: 18,
    color: "#44B8F3",
    fontWeight: "600",
    marginBottom: 5,
  },
  generatingSubtext: {
    fontSize: 14,
    color: "#666",
  },
  generateModalButton: {
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
  },
  generateModalGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
  },
  generateModalText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default ReportsScreen;

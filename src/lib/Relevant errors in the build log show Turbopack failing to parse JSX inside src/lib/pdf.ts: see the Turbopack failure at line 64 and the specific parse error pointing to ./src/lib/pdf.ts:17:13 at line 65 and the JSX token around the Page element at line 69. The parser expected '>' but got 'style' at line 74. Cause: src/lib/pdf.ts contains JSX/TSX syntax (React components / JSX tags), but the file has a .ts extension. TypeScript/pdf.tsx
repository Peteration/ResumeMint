import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import { Resume } from "@/types/resume";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  text: { marginBottom: 2 },
});

export function ResumePDF({ resume }: { resume: Resume }) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>{resume.fullName}</Text>
        <Text style={styles.text}>{resume.role}</Text>
        <Text style={styles.text}>{resume.email} · {resume.phone} · {resume.location}</Text>

        <Text style={styles.subHeader}>Summary</Text>
        <Text>{resume.summary}</Text>

        <Text style={styles.subHeader}>Skills</Text>
        <Text>{resume.skills.join(", ")}</Text>

        <Text style={styles.subHeader}>Experience</Text>
        {resume.experience.map((exp, i) => (
          <View key={i} style={styles.section}>
            <Text style={{ fontWeight: "bold" }}>{exp.title} — {exp.company}</Text>
            <Text style={styles.text}>{exp.start} - {exp.end}</Text>
            <Text>{exp.description}</Text>
          </View>
        ))}

        <Text style={styles.subHeader}>Education</Text>
        {resume.education.map((edu, i) => (
          <View key={i} style={styles.section}>
            <Text style={{ fontWeight: "bold" }}>{edu.degree} — {edu.school}</Text>
            <Text style={styles.text}>{edu.start} - {edu.end}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

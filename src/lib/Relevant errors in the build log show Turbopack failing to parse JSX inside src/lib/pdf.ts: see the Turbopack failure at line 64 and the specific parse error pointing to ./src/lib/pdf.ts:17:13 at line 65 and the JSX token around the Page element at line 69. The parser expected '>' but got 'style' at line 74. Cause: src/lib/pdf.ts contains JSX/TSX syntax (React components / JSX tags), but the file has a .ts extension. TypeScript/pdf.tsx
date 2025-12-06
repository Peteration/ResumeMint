"use server";

import React from "react";
import { Resume } from "@/types/resume";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 12 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  subHeader: { fontSize: 16, fontWeight: "bold", marginTop: 12, marginBottom: 6 },
  text: { marginBottom: 2 },
});

export function ResumePDF({ resume }: { resume: Resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.header}>{resume.fullName}</Text>
        <Text style={styles.text}>{resume.title}</Text>
        <Text style={styles.text}>
          {resume.email} · {resume.phone} · {resume.location}
        </Text>

        {/* Summary */}
        {resume.summary && (
          <>
            <Text style={styles.subHeader}>Summary</Text>
            <Text>{resume.summary}</Text>
          </>
        )}

        {/* Sections */}
        {resume.sections?.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.subHeader}>{section.title}</Text>

            {section.items?.map((item) => (
              <View key={item.id} style={{ marginBottom: 6 }}>
                {item.title && (
                  <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                )}

                {item.subtitle && (
                  <Text style={{ fontStyle: "italic" }}>{item.subtitle}</Text>
                )}

                {item.date && <Text>{item.date}</Text>}

                {item.description && <Text>{item.description}</Text>}

                {item.bullets && item.bullets.length > 0 && (
                  <View style={{ marginTop: 4 }}>
                    {item.bullets.map((b, i) => (
                      <Text key={i}>• {b}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}

/**
 * Generates a PDF Buffer (Uint8Array) for API route streaming
 */
export async function generateResumePDF(resume: Resume) {
  const blob = await pdf(<ResumePDF resume={resume} />).toBlob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

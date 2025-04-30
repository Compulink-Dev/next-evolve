// components/emails/InvoiceTemplate.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

interface InvoiceItem {
  description: string;
  amount: number;
}

interface InvoiceTemplateProps {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: InvoiceItem[];
  total: number;
}

export default function InvoiceTemplate({
  invoiceNumber,
  date,
  customerName,
  customerEmail,
  items,
  total,
}: InvoiceTemplateProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={title}>INVOICE</Text>
            <Row>
              <Column style={halfWidth}>
                <Text style={label}>Invoice #</Text>
                <Text style={value}>{invoiceNumber}</Text>
              </Column>
              <Column style={halfWidth}>
                <Text style={label}>Date</Text>
                <Text style={value}>{date}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={customerSection}>
            <Text style={sectionTitle}>Bill To</Text>
            <Text>{customerName}</Text>
            <Text style={customerDetail}>{customerEmail}</Text>
          </Section>

          <Section style={itemsSection}>
            <Row style={tableHeader}>
              <Column style={descriptionColumn}>
                <Text style={tableHeaderText}>Description</Text>
              </Column>
              <Column style={amountColumn}>
                <Text style={tableHeaderText}>Amount</Text>
              </Column>
            </Row>

            {items.map((item, index) => (
              <Row key={index} style={tableRow}>
                <Column style={descriptionColumn}>
                  <Text style={itemText}>{item.description}</Text>
                </Column>
                <Column style={amountColumn}>
                  <Text style={itemText}>${item.amount.toFixed(2)}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Section style={totalSection}>
            <Row>
              <Column style={totalLabelColumn}>
                <Text style={totalLabel}>TOTAL</Text>
              </Column>
              <Column style={totalAmountColumn}>
                <Text style={totalAmount}>${total.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          <Section style={footerSection}>
            <Text>Thank you for your business!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ... (add the same style objects as in PurchaseConfirmation with additional invoice-specific styles)
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "20px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#555555",
  marginBottom: "15px",
};

const footer = {
  marginTop: "30px",
  fontSize: "14px",
  color: "#888888",
};

const header = {
  backgroundColor: "#f8f8f8",
  padding: "20px",
  borderRadius: "5px",
};
const title = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "10px",
};
const halfWidth = {
  width: "50%",
  padding: "10px",
};
const label = {
  fontSize: "14px",
  color: "#888888",
  marginBottom: "5px",
};

const value = {
  fontSize: "16px",
  color: "#333333",
};

const customerSection = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
};

const sectionTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333333",
  marginBottom: "10px",
};

const customerName = {
  fontSize: "16px",
  color: "#333333",
};

const customerDetail = {
  fontSize: "14px",
  color: "#888888",
};

const itemsSection = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
};

const tableHeader = {
  display: "flex",
  backgroundColor: "#e0e0e0",
  padding: "10px",
  borderRadius: "5px",
};

const descriptionColumn = {
  width: "70%",
  padding: "10px",
};

const amountColumn = {
  width: "30%",
  padding: "10px",
};

const tableHeaderText = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333333",
};

const tableRow = {
  display: "flex",
  padding: "10px",
  borderBottom: "1px solid #e0e0e0",
};

const itemText = {
  fontSize: "16px",
  color: "#333333",
};

const totalSection = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
};

const totalLabelColumn = {
  width: "70%",
  padding: "10px",
};

const totalAmountColumn = {
  width: "30%",
  padding: "10px",
};

const totalLabel = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
};

const totalAmount = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#333333",
};

const footerSection = {
  marginTop: "20px",
  padding: "10px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
};

const footerText = {
  fontSize: "16px",
  color: "#888888",
  textAlign: "center",
};

const link = {
  color: "#1a73e8",
  textDecoration: "none",
};
const linkHover = {
  textDecoration: "underline",
};

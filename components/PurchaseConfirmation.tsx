// components/emails/PurchaseConfirmation.tsx
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
} from "@react-email/components";

interface PurchaseConfirmationProps {
  name: string;
  invoiceNumber: string;
  amount: number;
}

export default function PurchaseConfirmation({
  name,
  invoiceNumber,
  amount,
}: PurchaseConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Your purchase confirmation</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>Purchase Confirmation</Text>
            <Text style={paragraph}>Dear {name},</Text>
            <Text style={paragraph}>
              Thank you for your purchase! Your transaction has been completed
              successfully.
            </Text>
            <Text style={paragraph}>
              Invoice Number: <strong>{invoiceNumber}</strong>
            </Text>
            <Text style={paragraph}>
              Amount Paid: <strong>${amount.toFixed(2)}</strong>
            </Text>
            <Text style={paragraph}>
              Your invoice is attached to this email. Please keep it for your
              records.
            </Text>
            <Text style={paragraph}>
              If you have any questions, please contact our support team.
            </Text>
            <Text style={footer}>
              Best regards,
              <br />
              The Event Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

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
const link = {
  color: "#1a73e8",
  textDecoration: "none",
};
const linkHover = {
  textDecoration: "underline",
};

import { useState } from 'react';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Box, Collapse, Typography, IconButton } from '@mui/material';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQComponent({faqs }: FAQProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box
      sx={{
        pt: '2.5rem',
        width: '90%',
        mb: '5rem',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Sinerva',
          fontSize: '1.8rem',
          color: 'primary.main',
          textAlign: 'center',
          mb: '1.8rem',
        }}
      >
        FAQs
      </Typography>

      {faqs.map((faq, index) => (
        <Box key={index} sx={{ borderRadius: '12px', mb: '0.625rem', pt: 1.5,pb: 1.5, pl: 1.875,background:'white' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              color: expandedIndex === index ? 'primary.main' : 'black',
            }}
            onClick={() => handleToggle(index)}
          >
            <Typography
              sx={{
                ...TYPOGRAPHY.body1,
                fontWeight: 700,
                flexGrow: 1,
              }}
            >
              {faq.question}
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: 'primary.main',
              }}
              onClick={() => handleToggle(index)}
            >
              {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>

          <Collapse in={expandedIndex === index}>
            <Typography
              sx={{
                ...TYPOGRAPHY.body1,
              }}
            >
              {faq.answer}
            </Typography>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}

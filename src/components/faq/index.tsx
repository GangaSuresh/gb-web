import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
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
        mt:'1.5rem',
        pt: '1.5rem',
        width:'100%',
        background: 'linear-gradient(180deg,  rgba(65, 34, 137, 0.9), rgba(0, 44, 151, 0.8))',
        color: 'white',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        borderTopLeftRadius:'40px',
        borderTopRightRadius:'40px'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Sinerva',
          fontSize: '1.8rem',
          textAlign: 'center',
          mb: '1.8rem',
        }}
      >
        FAQs
      </Typography>

      {faqs.map((faq, index) => (
        <Box key={index} sx={{ 
          mb: '0.625rem', 
          p: '0 1rem 1rem 1rem',
          
          width: { xs: '95%', sm: '100%',md:'1140px' },
          borderBottom: index < faqs.length - 1 ? '0.5px solid #FFFFFF66' : 'none'
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
            }}
            onClick={() => handleToggle(index)}
          >
            <Typography
              sx={{
                ...TYPOGRAPHY.body1,
                flexGrow: 1,
                color: 'white',
              }}
            >
              {faq.question}
            </Typography>
            <IconButton
              size="small"
              sx={{
                color: 'white',
              }}
              onClick={() => handleToggle(index)}
            >
              <Iconify icon={expandedIndex === index ? 'ic:outline-minus' : 'material-symbols:add-rounded'} />
            </IconButton>
          </Box>

          <Collapse in={expandedIndex === index}>
            <Typography
              sx={{
                ...TYPOGRAPHY.body2,
                fontWeight: 300,
                color: 'white',
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

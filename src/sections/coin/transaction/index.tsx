interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
    return (
        <p>transaction - Mobile: {isMobile ? 'Yes' : 'No'}, Tablet: {isTablet ? 'Yes' : 'No'}</p>
    );
}
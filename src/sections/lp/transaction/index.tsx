interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
    return (
        <p>LP Transaction - Mobile: {isMobile ? 'Yes' : 'No'}, Tablet: {isTablet ? 'Yes' : 'No'}</p>
    );
}

export const camelToTitle = (text: string): string => 
    text
     .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
     .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
     .replace(/^./, (str) => str.toUpperCase())
 ;
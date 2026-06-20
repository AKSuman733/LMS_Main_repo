export const validateEmail = (email) => {
  if (!email) return { isValid: false, message: 'Email cannot be empty.' };
  if (email.includes(' ')) return { isValid: false, message: 'No spaces are allowed.' };
  
  const parts = email.split('@');
  if (parts.length !== 2) return { isValid: false, message: 'Must contain exactly one @ symbol.' };
  
  const [local, domain] = parts;
  
  if (!local) return { isValid: false, message: 'The local part (before @) cannot be empty.' };
  if (!domain) return { isValid: false, message: 'The domain part (after @) cannot be empty.' };
  
  if (email.startsWith('@') || email.endsWith('@')) return { isValid: false, message: 'Email cannot start or end with @.' };
  if (email.startsWith('.') || email.endsWith('.')) return { isValid: false, message: 'Email cannot start or end with a dot (.).' };
  
  if (email.includes('..')) return { isValid: false, message: 'Consecutive dots (..) are not allowed.' };
  
  // Local part characters check
  const localRegex = /^[a-zA-Z0-9._\-+]+$/;
  if (!localRegex.test(local)) return { isValid: false, message: 'Invalid characters in local part. Allowed: letters, digits, ., _, -, +' };
  
  // Domain part checks
  if (!domain.includes('.')) return { isValid: false, message: 'Domain must contain at least one . (dot).' };
  if (domain.startsWith('.') || domain.endsWith('.')) return { isValid: false, message: 'The dot (.) cannot be the first or last character of the domain.' };
  
  const domainRegex = /^[a-zA-Z0-9.\-]+$/;
  if (!domainRegex.test(domain)) return { isValid: false, message: 'Domain name should contain only letters, digits, hyphens (-), and dots (.).' };
  
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return { isValid: false, message: 'Top-level domain (TLD) should have at least 2 characters.' };
  
  return { isValid: true, message: '' };
};

export const validatePhone = (phone) => {
  if (!phone) return { isValid: false, message: 'Phone number cannot be empty.' };
  
  const cleanPhone = phone.replace(/[\s-]/g, '');
  const phoneRegex = /^(?:\+91|91)?([6789]\d{9})$/;
  const match = cleanPhone.match(phoneRegex);
  
  if (!match) {
    return { isValid: false, message: 'Indian mobile numbers must be 10 digits (starting with 6-9). Country code +91/91 is optional.' };
  }
  
  const tenDigits = match[1];
  
  if (/^(\d)\1{9}$/.test(tenDigits)) {
    return { isValid: false, message: 'Please provide a real phone number (not all same digits).' };
  }
  
  return { isValid: true, message: '' };
};

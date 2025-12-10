// src/utils/emailValidator.ts

interface EmailValidationResponse {
  email: string;
  autocorrect: string;
  deliverability: string; // "DELIVERABLE", "UNDELIVERABLE", "UNKNOWN"
  quality_score: number; // 0.01 - 0.99
  is_valid_format: {
    value: boolean;
    text: string;
  };
  is_free_email: {
    value: boolean;
    text: string;
  };
  is_disposable_email: {
    value: boolean;
    text: string;
  };
  is_role_email: {
    value: boolean;
    text: string;
  };
  is_catchall_email: {
    value: boolean;
    text: string;
  };
  is_mx_found: {
    value: boolean;
    text: string;
  };
  is_smtp_valid: {
    value: boolean;
    text: string;
  };
}

export async function validateEmail(email: string): Promise<{
  isValid: boolean;
  message: string;
  suggestion?: string;
}> {
  const API_KEY = import.meta.env.VITE_ABSTRACT_API_KEY;
  
  // Validazione formato base prima di chiamare l'API
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Invalid email format'
    };
  }

  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`
    );

    if (!response.ok) {
      // Se l'API fallisce, accetta comunque l'email (fallback)
      console.warn('Email validation API failed, accepting email');
      return { isValid: true, message: 'Email accepted (validation unavailable)' };
    }

    const data: EmailValidationResponse = await response.json();

    // Email temporanea/usa-e-getta
    if (data.is_disposable_email.value) {
      return {
        isValid: false,
        message: 'Temporary/disposable emails are not allowed'
      };
    }

    // Formato non valido
    if (!data.is_valid_format.value) {
      return {
        isValid: false,
        message: 'Invalid email format'
      };
    }

    // Dominio MX non trovato (il dominio non esiste)
    if (!data.is_mx_found.value) {
      return {
        isValid: false,
        message: 'Email domain does not exist',
        suggestion: data.autocorrect !== email ? data.autocorrect : undefined
      };
    }

    // SMTP non valido (il server email non accetta messaggi)
    if (!data.is_smtp_valid.value) {
      return {
        isValid: false,
        message: 'Email server does not accept messages'
      };
    }

    // Quality score basso (probabile spam)
    if (data.quality_score < 0.7) {
      return {
        isValid: false,
        message: 'Email quality is too low (possible spam address)'
      };
    }

    // Tutto OK!
    return {
      isValid: true,
      message: 'Email is valid',
      suggestion: data.autocorrect !== email ? data.autocorrect : undefined
    };

  } catch (error) {
    // Se l'API fallisce, accetta comunque l'email (fallback graceful)
    console.error('Email validation error:', error);
    return {
      isValid: true,
      message: 'Email accepted (validation unavailable)'
    };
  }
}

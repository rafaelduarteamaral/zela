// Setup para testes
// Mock de variáveis de ambiente
process.env.JWT_SECRET = 'test-secret-key-for-testing-only';
process.env.ZAPI_INSTANCE_ID = 'test-instance-id';
process.env.ZAPI_TOKEN = 'test-token';
process.env.ZAPI_CLIENT_TOKEN = 'test-client-token';
process.env.GROQ_API_KEY = 'test-groq-key';
process.env.GEMINI_API_KEY = 'test-gemini-key';
process.env.TWILIO_ACCOUNT_SID = 'ACtest000000000000000000000000000';
process.env.TWILIO_AUTH_TOKEN = 'test-auth-token-000000000000000';
process.env.TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886';
process.env.NODE_ENV = 'test';

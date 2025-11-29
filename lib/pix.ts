/**
 * PIX BR Code Generator
 * Implementação baseada no padrão EMVCo MPM e BACEN
 * Referência: PDF Seção 3 - Engenharia Financeira
 */

// CRC-16/CCITT-FALSE Implementation
// Polynomial: 0x1021 | Initial Value: 0xFFFF
export const calculateCRC16 = (payload: string): string => {
  const polynomial = 0x1021
  let crc = 0xFFFF

  for (let i = 0; i < payload.length; i++) {
    let c = payload.charCodeAt(i)
    crc ^= (c << 8)

    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial
      } else {
        crc = crc << 1
      }
    }
  }

  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0')
}

// Helper function para formatar campos TLV (Type-Length-Value)
const formatField = (id: string, value: string): string => {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

// Remove acentos e caracteres especiais
const normalizeString = (str: string): string => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
}

export interface PixParams {
  key: string       // Chave PIX (email, cpf, telefone ou aleatória)
  name: string      // Nome do beneficiário (máx 25 caracteres)
  city: string      // Cidade do beneficiário (máx 15 caracteres)
  amount: number    // Valor da transação
  txid?: string     // Identificador da transação
  message?: string  // Mensagem adicional opcional
}

/**
 * Gera o payload completo do PIX seguindo o padrão BR Code
 * @param params Parâmetros para geração do PIX
 * @returns String do payload pronta para gerar QR Code ou copiar
 */
export const generatePixPayload = ({
  key,
  name,
  city,
  amount,
  txid = '***',
  message = ''
}: PixParams): string => {
  // Normaliza e trunca strings conforme especificação
  const normName = normalizeString(name).substring(0, 25)
  const normCity = normalizeString(city).substring(0, 15)
  const amountStr = amount.toFixed(2)

  // Campo 26: Merchant Account Information
  // Deve conter GUI (Globally Unique Identifier) e Chave PIX
  const gui = formatField('00', 'br.gov.bcb.pix')
  const keyField = formatField('01', key)
  const merchantAccount = formatField('26', gui + keyField)

  // Campo 62: Additional Data Field (para TXID e mensagem)
  let additionalData = formatField('05', txid)
  if (message) {
    additionalData += formatField('50', normalizeString(message).substring(0, 30))
  }
  const additionalDataField = formatField('62', additionalData)

  // Constrói o payload completo
  let payload = [
    formatField('00', '01'),           // Payload Format Indicator (versão)
    formatField('01', '12'),           // Point of Initiation (12 = uso único)
    merchantAccount,                   // Informações da conta
    formatField('52', '0000'),         // Merchant Category Code
    formatField('53', '986'),          // Transaction Currency (986 = BRL)
    formatField('54', amountStr),      // Transaction Amount
    formatField('58', 'BR'),           // Country Code
    formatField('59', normName),       // Merchant Name
    formatField('60', normCity),       // Merchant City
    additionalDataField,               // Additional Data
    '6304'                            // CRC placeholder
  ].join('')

  // Calcula e adiciona o CRC16
  const crc = calculateCRC16(payload)
  return payload + crc
}

/**
 * Valida se um payload PIX está correto
 * @param payload String do payload PIX
 * @returns true se válido, false caso contrário
 */
export const validatePixPayload = (payload: string): boolean => {
  if (payload.length < 4) return false

  const payloadWithoutCrc = payload.slice(0, -4)
  const expectedCrc = payload.slice(-4)
  const calculatedCrc = calculateCRC16(payloadWithoutCrc + '6304')

  return calculatedCrc === expectedCrc.toUpperCase()
}

/**
 * Extrai informações de um payload PIX
 * @param payload String do payload PIX
 * @returns Objeto com informações extraídas ou null se inválido
 */
export const parsePixPayload = (payload: string): any => {
  if (!validatePixPayload(payload)) {
    return null
  }

  const extractField = (id: string, data: string): string | null => {
    const regex = new RegExp(`${id}(\\d{2})(.*)`)
    const match = data.match(regex)
    if (match) {
      const length = parseInt(match[1])
      return match[2].substring(0, length)
    }
    return null
  }

  try {
    return {
      amount: extractField('54', payload),
      name: extractField('59', payload),
      city: extractField('60', payload),
      valid: true
    }
  } catch {
    return null
  }
}
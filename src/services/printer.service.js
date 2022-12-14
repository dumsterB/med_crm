import { ApiService } from '@/services/api.service';

export class PrinterService {
  /**
   * @param {number|string} patientId
   * @return {Promise<any>}
   */
  static async printBraceletByPatientId(patientId) {
    const { data } = await ApiService.post('printer/printBracelet', { patient_id: patientId });
    const { printer_address, task } = data;

    return this.print({ printerAddress: printer_address, task: task });
  }

  /**
   * @param {number|string} invoiceId
   * @return {Promise<any>}
   */
  static async printInvoiceById(invoiceId) {
    const { data } = await ApiService.post('printer/printInvoice', { invoice_id: invoiceId });
    const { printer_address, task } = data;

    return this.print({ printerAddress: printer_address, task: task });
  }

  /**
   * @param {object} payload
   * @param {string} payload.printerAddress
   * @param {string} payload.task
   * @return {Promise<any>}
   */
  static async print(payload) {
    const response = await fetch(import.meta.env.VITE_PRINTER_PROXY, {
      method: 'POST',
      body: JSON.stringify({
        printer_address: payload.printerAddress,
        message: payload.task,
      }),
    });
    return response.json();
  }
}

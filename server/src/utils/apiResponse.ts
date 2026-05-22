// Format de réponse API standard
export const apiResponse = {
  success: (data: any, message: string = 'Opération réussie', meta: any = null) => ({
    success: true,
    data,
    message,
    meta,
  }),
  error: (message: string = 'Une erreur est survenue', errors: any[] = []) => ({
    success: false,
    data: null,
    message,
    errors,
  }),
};

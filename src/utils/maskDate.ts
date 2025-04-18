export const maskDate = (text: string) => {
  // Remove tudo que não for número
  const numbersOnly = text.replace(/\D/g, "");

  // Adiciona a máscara
  if (numbersOnly.length <= 2) {
    // Adiciona a máscara de dd
    return numbersOnly.replace(/(\d{2})/, "$1");
  } else if (numbersOnly.length <= 4) {
    // Adiciona a máscara de dd/mm
    return numbersOnly.replace(/(\d{2})(\d{2})/, "$1/$2");
  } else {
    // Adiciona a máscara de dd/mm/aaaa
    return numbersOnly.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  }
};

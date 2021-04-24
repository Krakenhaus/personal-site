export const getDisplayText = (condition) => {
  switch (condition) {
    case "near_mint":
      return "NM";
    case "lightly_played":
      return "LP";
    case "moderately_played":
      return "MP";
    case "heavily_played":
      return "HP";
    case "damaged":
      return "D";
  }
};

export const getColorRepresentation = (condition) => {
  switch (condition) {
    case "near_mint":
      return "#77ad02";
    case "lightly_played":
      return "#a4ad02";
    case "moderately_played":
      return "#f79d1e";
    case "heavily_played":
      return "#f75b1e";
    case "damaged":
      return "#f7331e";
  }
};

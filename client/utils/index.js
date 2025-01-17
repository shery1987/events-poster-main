import { FORM_VALIDATION_PATTERNS } from "@/utils/constants";

export function sortByDate(events) {
  return events
    .filter(event => event.eventDate) 
    .sort((a, b) => {
      const dateA = new Date(a.eventDate.split("/").reverse().join("-"));
      const dateB = new Date(b.eventDate.split("/").reverse().join("-"));
      return dateA - dateB;
    });
}

// Form fields validator function. Used inside computed property
export function validateFormField(fieldData, validator) {
  const data = fieldData;
  const regExp = FORM_VALIDATION_PATTERNS[validator]; 

  return data !== "" && regExp.test(data); 
}

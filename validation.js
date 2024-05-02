
const validator =require('validator');

const validateData =async (validationRules,data)=>{
    const errors = {};
    for (const field in validationRules) {
        const rules = validationRules[field];

        // Check if field is required
        if (rules.required && !data[field]) {
            errors[field] = `${field} is required.`;
            continue;
        }
        // Check other rules
        for (const rule in rules) {
            if (rule === 'required') continue; // Skip 'required' rule since it's already checked above
            const value = data[field];

            // Handle different validation rules
            if (rule === 'min' && !validator.isLength(value, { min: rules[rule] })) {
                errors[field] = `${field} must have a minimum length of ${rules[rule]}.`;
            }
            // Add more rule checks as needed
        }
    }

    return errors;
};


module.exports = {
    validateData,
    
};

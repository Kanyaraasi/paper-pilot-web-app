// Validation utility functions for the teacher form

export const validateTeacherForm = (teacher, isEditing) => {
    const errors = {};
    
    // Validate name
    if (!teacher.name.trim()) {
      errors.name = 'Name is required';
    } else if (teacher.name.trim().length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    
    // Validate email
    if (!teacher.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(teacher.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate phone (if provided)
    if (teacher.phone && !isValidPhone(teacher.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // Validate password (required for new teachers, optional for editing)
    if (!isEditing && !teacher.password) {
      errors.password = 'Password is required';
    } else if (teacher.password && teacher.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Validate assignments
    let hasEmptyAssignment = false;
    let hasIncompleteAssignment = false;
    
    teacher.assignments.forEach(assignment => {
      if (!assignment.standard && !assignment.subject) {
        hasEmptyAssignment = true;
      } else if (!assignment.standard || !assignment.subject) {
        hasIncompleteAssignment = true;
      }
    });
    
    if (teacher.assignments.length === 0) {
      errors.assignments = 'At least one subject assignment is required';
    } else if (hasEmptyAssignment) {
      errors.assignments = 'Please remove empty assignments';
    } else if (hasIncompleteAssignment) {
      errors.assignments = 'Please complete all assignment fields';
    }
    
    return errors;
  };
  
  // Helper functions
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPhone = (phone) => {
    // Basic phone validation (this can be customized based on region/format requirements)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };
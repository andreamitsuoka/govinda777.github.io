function corresponding_bracket_index(source_code, caret_index) {
  // Write a function that takes a string that represents source code and an int that represents a 
  // caret index in the source code. If the caret index is pointed at a bracket, curly brace, or 
  // parenthesis, return the index of the corresponding brace.

  // Throw error if caret_index is not pointing to a bracket
  if (!'(){}[]'.includes(source_code[caret_index])) {
    throw new Error('Invalid caret index. Caret must point to a bracket.');
  }

  // Store the indexes of opening brackets that have not been closed
  let active_opening_brackets = [];
  let corresponding_index;

  for (let current_index = 0; current_index < source_code.length; current_index++) {
    let character = source_code.charAt(current_index);
    if (character === '[' || character === '(' || character === '{') {
      active_opening_brackets.push({index: current_index, type: character});
    } else if (character === ']' || character === ')' || character === '}') {
      let last_active_opening_bracket = active_opening_brackets.pop();

      // Throw an error if closing brackets are not properly nested within opening ones
      // Or if a closing bracket does not have a corresponding opening one.
      if (!last_active_opening_bracket||
          character === ']' && last_active_opening_bracket.type != '[' ||
          character === ')' && last_active_opening_bracket.type != '(' ||
          character === '}' && last_active_opening_bracket.type != '{')  {
            throw new Error('Invalid brackets in source code.');
          }

      if (last_active_opening_bracket.index === caret_index) {
        // If you reach a closing bracket and the last active opening bracket is at the caret,
        // Then the closing bracket you have reached is the corresponding closing bracket
        corresponding_index = current_index;
      } else if (current_index === caret_index) {
        // If the closing bracket is at the caret, 
        // then the corresponding opening one is the last active opening bracket
        corresponding_index = last_active_opening_bracket.index;
      }
      // If neither conditional is met, deactivate the last active opening bracket by removing
      // it from the stack of active opening brackets. Continue to iterate through the source code.
    }
  }

  // Throw error if any brackets are unclosed
  if (!active_opening_brackets.isEmpty()) {
    throw new Error('Unclosed brackets in source code.');
  } else {
    return corresponding_index;
  }
}

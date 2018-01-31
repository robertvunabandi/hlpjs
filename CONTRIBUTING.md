# CONTRIBUTING

Contributions are highly appreciated. In reality, I created this class to abstract away these helper functions from my main projects. If you want to do the same, just make a pull request with the method you would like to add. Below are notes to follow:

## Bug Reports

If a function does not work as expected, create an issue so it can be resolved. 

## Coding Style Notes

This code *softly* follows the standard set by [node-style-guide](https://github.com/felixge/node-style-guide). Unless specified here, all rules must follow the style set out by that guide:
- We're soft on the 80 characters per line. The hard limit is 100, so try to remain below that unless really necessary. **Never exceed 120 characters.**
- Each function methods have a maximum of 4 parameters.
- Naming conventions:
    - Use under\_scores for naming variables
    - Use cameCase for naming methods/functions
    - Make the first letter Uppercase in case it's a class declaration (constructor). An example is `hlp.Primitive`.
    - Use UPPERCASE for constants.
- Use single quotes unless using \`\` to insert a `String` within the text.
- Unless it makes it clearer, there's no need for [multi-line ternary operators](https://github.com/felixge/node-style-guide#use-multi-line-ternary-operator).
- No need for [descriptive conditions](https://github.com/felixge/node-style-guide#use-descriptive-conditions) unless it makes the line exceed 80 character as long as it's clear enough what it's doing.
- Ideally, have a maximum of 10-15 lines per functions. **No more than 30 lines!** 
- Avoid deep nesting. Maximum depth size is 3 unless it's justifiably necessary.
- No need for [method-chaining](https://github.com/felixge/node-style-guide#method-chaining) unless it adds to the clarity or comprehension. 
- Follow the same guide as done previously for JSDocs. **All methods need to have JSDoc provided**. Add a `@tested` at the start of the JSDoc after you have implemented the tests. If not, add  `TODO: add tests` at the start of the JSDoc.

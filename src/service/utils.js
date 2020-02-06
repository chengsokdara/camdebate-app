export const formatString = str =>
  str.replace(/(?:\r\n|\r|\n|\\n|\\n\\n)/g, '\n')

module.exports = {
  "extends": ["next/core-web-vitals", "next", "prettier"],
  "plugins": ["unicorn"],
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "error",
    "unicorn/filename-case": [
      "error",
      {
        "case": "kebabCase"
      }
    ]
  }
}
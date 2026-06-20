const fs = require('fs');

const files = [
  'AdminLogin.jsx',
  'InstructorLogin.jsx',
  'Login.jsx',
  'StudentLogin.jsx',
  'Register.jsx'
];

files.forEach(file => {
  const path = `/Users/rajthakur/Desktop/UptoProject/frontend/src/pages/Auth/${file}`;
  let content = fs.readFileSync(path, 'utf8');

  // Import validateEmail
  if (!content.includes("from '../../utils/validation'")) {
    content = content.replace("import axios from 'axios';", "import axios from 'axios';\nimport { validateEmail } from '../../utils/validation';");
  }

  // Replace validateEmail definition with state
  content = content.replace(
    /const validateEmail = \(email\) => \{\s+const re = \/\^\[a-zA-Z0-9\._%\+-\]\+@\[a-zA-Z0-9\.-\]\+\\.\[a-zA-Z\]\{2,\}\$\/;\s+return re\.test\(email\);\s+\};/g,
    "const [emailErrorMsg, setEmailErrorMsg] = useState('');"
  );

  // Update handleEmailChange
  content = content.replace(
    /const handleEmailChange = \(e\) => \{\s+const val = e\.target\.value;\s+setEmail\(val\);\s+if \(val\.length > 0\) \{\s+setEmailValid\(validateEmail\(val\)\);\s+\} else \{\s+setEmailValid\(null\);\s+\}\s+\};/g,
    `const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length > 0) {
      const res = validateEmail(val);
      setEmailValid(res.isValid);
      setEmailErrorMsg(res.message);
    } else {
      setEmailValid(null);
      setEmailErrorMsg('');
    }
  };`
  );

  // Update handleSubmit validation
  content = content.replace(
    /if \(emailValid === false\) \{\s+toast\.error\('Please enter a valid email address'\);\s+return;\s+\}/g,
    `const valRes = validateEmail(email);
    if (!valRes.isValid) {
      toast.error(valRes.message);
      return;
    }`
  );

  // Update handleSendOTP validation
  content = content.replace(
    /if \(emailValid === false \|\| !email\) \{\s+setError\('Please enter a valid email first'\);\s+toast\.error\('Please enter a valid email first'\);\s+return;\s+\}/g,
    `const valRes = validateEmail(email);
    if (!valRes.isValid) {
      setError(valRes.message);
      toast.error(valRes.message);
      return;
    }`
  );

  // Replace UI error message
  content = content.replace(
    /\{emailValid === false && <span (.*?)className="field-error-text">Please enter a valid email<\/span>\}/g,
    `{emailValid === false && <span $1className="field-error-text">{emailErrorMsg}</span>}`
  );

  fs.writeFileSync(path, content);
  console.log(`Processed ${file}`);
});

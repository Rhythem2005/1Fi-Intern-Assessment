const fs = require('fs');
let content = fs.readFileSync('server/seed.js', 'utf8');

const mfTypes = [
  { name: 'HDFC Liquid Fund', type: 'Debt' },
  { name: 'SBI Magnum Gilt Fund', type: 'Debt' },
  { name: 'ICICI Prudential Liquid Fund', type: 'Debt' },
  { name: 'Axis Liquid Fund', type: 'Debt' }
];

let i = 0;
// We need to match: mutualFund: { name: ${mf.name}, type: ${mf.type} } }
content = content.replace(/mutualFund: \{ name: \$\{mf\.name\}, type: \$\{mf\.type\} \}/g, (match) => {
  const mf = mfTypes[i % mfTypes.length];
  i++;
  return "mutualFund: { name: '" + mf.name + "', type: '" + mf.type + "' }";
});

fs.writeFileSync('server/seed.js', content);
console.log('Fixed');

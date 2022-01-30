
const validationTypes = {
  BASE: 'BASE',
  SCHEMA: 'SCHEMA'
};

const createXmlFromJson = (json) =>
  `<description>${json.description}</description>
${json.rules ? `<rules>${json.rules}</rules>` : ''}
<details><json>${JSON.stringify(json.details)}</json></details>`;

const createValidationMetadata = (validationType, originalError) => {
  const json = {
    description: 'Request is invalid',
    details: originalError
  };
  const xml = createXmlFromJson(json);

  return {
    validationType,
    originalError,
    xml,
    json
  };
};

module.exports = {
  createValidationMetadata,
  validationTypes
};

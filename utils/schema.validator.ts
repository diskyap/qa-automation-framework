import Ajv from 'ajv'

const ajv = new Ajv({
    allErrors: true,
    strict: false
})

export default ajv

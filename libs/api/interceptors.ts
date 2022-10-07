import { serialize } from 'object-to-formdata'

const dataToFormData = (object: any) => {
  const options = {
    indices: false,
    nullsAsUndefineds: false,
    booleansAsIntegers: false,
    allowEmptyArrays: true,
  }
  return serialize(object, options)
}

const setFormData = (config: any, formdata: any) => {
  config.formData = formdata
  return config
}

export const beforeRequestStoreFormData = (api: any, config: any) => {
  if (config.data) {
    if (config.data.formData) {
      config = setFormData(config, config.data.formData)
      delete config.data.formData
    }
  }
  return config
}

export const uploadRequest = (api: any, config: any) => {
  if (config.formData === true) {
    config.headers['Content-Type'] = 'multipart/form-data'
    let formdata = config.data
    formdata = dataToFormData(formdata)
    config.data = formdata
  }
  return config
}

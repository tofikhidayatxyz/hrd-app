import { useRef, useEffect } from 'react'
import { Formik, Form as FormStart } from 'formik'
import { NODE_ENV } from '@env'

interface FormInterface {
  children?: any
  initialValues?: any
  validation?: any
  onSubmit: any
  enableReinitialize?: boolean
  debug?: boolean
}

export default function ({
  children,
  initialValues,
  validation,
  onSubmit,
  enableReinitialize,
  debug,
}: FormInterface) {
  const ChildContent = children
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      enableReinitialize={enableReinitialize}
      onSubmit={onSubmit}
    >
      {(forms) => {
        // just for debug dude
        if (NODE_ENV === 'development' && debug) {
          if (Object.entries(forms?.errors || {})?.length) {
            console.log(
              '%cFORMIK INVALID VALUE',
              'color: red; font-size: 24px; font-weight:bold;'
            )
            console.table(forms.errors)
          }
        }
        return <ChildContent {...forms} />
      }}
    </Formik>
  )
}
